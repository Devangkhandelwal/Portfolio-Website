export type QualityTier = "high" | "low";

const STORAGE_KEY = "portfolio:quality";

/** Below roughly 38fps sustained, the WebGL scenes cost more than they add. */
const SLOW_FRAME_MS = 26;
const SAMPLE_TARGET = 45;
const MIN_SAMPLES = 20;
/** Chrome throttles rAF to ~1fps when its window is occluded or backgrounded.
 *  Frames longer than this are treated as throttling, not as slowness. */
const THROTTLE_FRAME_MS = 200;

function readStored(): QualityTier | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "high" || value === "low" ? value : null;
  } catch {
    return null;
  }
}

function store(tier: QualityTier) {
  try {
    localStorage.setItem(STORAGE_KEY, tier);
  } catch {
    /* private mode, blocked storage - the heuristics still apply */
  }
}

function overrideFromUrl(): QualityTier | null {
  try {
    const value = new URLSearchParams(window.location.search).get("quality");
    return value === "high" || value === "low" ? value : null;
  } catch {
    return null;
  }
}

/** Integrated and software renderers cannot drive two full-viewport WebGL
 *  canvases at 1.5x pixel ratio. CPU cores and RAM say nothing useful here --
 *  the machines that struggle have plenty of both. */
function gpuLooksWeak(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    if (!renderer) return false;

    return /SwiftShader|llvmpipe|Software|Microsoft Basic Render|Intel.*(HD|UHD|Iris)|AMD Radeon\(TM\) Graphics|Vega \d+ Graphics|Mali|Adreno|PowerVR/i.test(
      renderer
    );
  } catch {
    return false;
  }
}

export function getInitialTier(): QualityTier {
  const override = overrideFromUrl();
  if (override) {
    store(override);
    return override;
  }

  const stored = readStored();
  if (stored) return stored;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "low";
    }
  } catch {
    /* ignore */
  }

  return gpuLooksWeak() ? "low" : "high";
}

/**
 * Samples real frame times and remembers the verdict for the next visit.
 * Deliberately conservative: it only ever downgrades, and only with enough
 * clean samples, so an occluded window never demotes a capable machine.
 */
export function measureTier(onDowngrade?: () => void): () => void {
  if (overrideFromUrl()) return () => {};

  const samples: number[] = [];
  const startedAt = performance.now();
  let last = startedAt;
  let frame = requestAnimationFrame(tick);

  function tick() {
    const now = performance.now();
    const delta = now - last;
    last = now;

    const measurable =
      document.visibilityState === "visible" &&
      document.hasFocus() &&
      delta < THROTTLE_FRAME_MS;
    if (measurable) samples.push(delta);

    if (samples.length >= SAMPLE_TARGET || now - startedAt > 8000) {
      finish();
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function finish() {
    if (samples.length < MIN_SAMPLES) return; // not enough clean data to judge
    samples.sort((a, b) => a - b);
    const median = samples[Math.floor(samples.length / 2)];
    if (median > SLOW_FRAME_MS) {
      store("low");
      onDowngrade?.();
    } else {
      store("high");
    }
  }

  return () => cancelAnimationFrame(frame);
}
