import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Devang, a Computer Science undergraduate at UPES Dehradun, and I build LLM and machine learning systems end-to-end rather than leaving them in a notebook — agentic RAG pipelines in LangGraph, retrieval over Qdrant and FAISS, classical models with XGBoost and Transformers, shipped behind FastAPI and React. What I care about most is whether a model can be trusted: measuring it against real baselines, making it explain itself through SHAP or attention maps, and letting it say nothing when the evidence isn't there. Recently I built LoanDefault for IBM's capstone programme on 1.2M+ lending records, and co-authored a research paper on real-time face anti-spoofing.
        </p>
      </div>
    </div>
  );
};

export default About;
