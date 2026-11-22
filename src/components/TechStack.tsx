import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { QualityTier } from "../utils/quality";

// The physics canvas pulls in rapier, drei and postprocessing (~2.4MB), so it
// is only fetched once the section is close to the viewport. The section has a
// fixed height and an absolutely positioned heading, so mounting the canvas
// later shifts nothing.
const TechStackCanvas = lazy(() => import("./TechStackCanvas"));

const stack = [
  "Python",
  "C++",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "FastAPI",
  "MongoDB",
  "MySQL",
  "Machine Learning",
];

// The sphere textures are wrap maps with each logo repeated across the
// width, so they cannot be cropped to a single clean mark. Type reads better
// than a broken logo.
const TechStackGrid = () => (
  <ul className="tech-grid">
    {stack.map((tech) => (
      <li className="tech-chip" key={tech}>
        {tech}
      </li>
    ))}
  </ul>
);

type Props = {
  quality: QualityTier;
};

const TechStack = ({ quality }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [hasApproached, setHasApproached] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const use3D = quality === "high";

  useEffect(() => {
    if (!use3D) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    // Starts the simulation (and the download) before the section is reached,
    // so the spheres have converged by the time they are on screen.
    const approachObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting) setHasApproached(true);
      },
      { threshold: 0, rootMargin: "800px 0px" }
    );

    const container = containerRef.current;
    if (container) {
      visibilityObserver.observe(container);
      approachObserver.observe(container);
    }

    return () => {
      visibilityObserver.disconnect();
      approachObserver.disconnect();
    };
  }, [use3D]);

  return (
    <div className="techstack" ref={containerRef}>
      <h2> My Techstack</h2>
      {use3D ? (
        hasApproached && (
          <Suspense fallback={null}>
            <TechStackCanvas
              isActive={isActive}
              isCanvasVisible={isCanvasVisible}
            />
          </Suspense>
        )
      ) : (
        <TechStackGrid />
      )}
    </div>
  );
};

export default TechStack;
