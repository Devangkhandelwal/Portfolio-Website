import "./styles/Work.css";
import WorkImage from "./WorkImage";

type Project = {
  num: string;
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link?: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "LoanDefault Risk Engine",
    category: "FinTech & Machine Learning",
    tools: "React, FastAPI, XGBoost, SHAP, Python",
    description:
      "Full-stack FinTech platform predicting loan default risk with XGBoost, featuring a 5-input workflow and SHAP explainability breakdown.",
    image: "/images/loandefault.png",
  },
  {
    num: "02",
    title: "Self-Healing Data Pipeline Agent",
    category: "AI Agents & Autonomous Systems",
    tools: "Python, Scikit-learn, XGBoost, Flask, React, Pydantic",
    description:
      "3-layer data pipeline resilience system (ML anomaly detection, LLM diagnosis, auto-patching parser fixes) with 98.4% F1-score.",
    image: "/images/smartticket.png",
  },
  {
    num: "03",
    title: "Face Anti-Spoofing Research",
    category: "Computer Vision & Deep Learning",
    tools: "TensorFlow, EfficientNet-B0, CBAM, MediaPipe, Python",
    description:
      "Co-authored research on an EfficientNet-B0 + CBAM model for real-time liveness detection — 90% accuracy at 14.8 FPS.",
    image: "/images/face_antispoofing.png",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                description={project.description}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
