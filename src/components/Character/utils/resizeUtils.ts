import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

let wasDesktop = window.innerWidth > 1024;

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D | null
) {
  if (!canvasDiv.current) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  if (width === 0 || height === 0) return;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // The scroll timelines branch on the 1024px breakpoint, so they only need
  // rebuilding when the layout actually crosses it. Every other resize is
  // handled by ScrollTrigger.refresh(), because the timelines are created with
  // invalidateOnRefresh and re-read their start values themselves.
  const isDesktop = window.innerWidth > 1024;
  if (isDesktop !== wasDesktop && character) {
    wasDesktop = isDesktop;
    setCharTimeline(character, camera);
    setAllTimeline();
  }

  ScrollTrigger.refresh();
}
