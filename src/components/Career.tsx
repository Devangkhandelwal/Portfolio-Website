import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IBM Virtual Internship</h4>
                <h5>FinTech Risk Engine Project</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built LoanDefault, a full-stack FinTech risk-prediction platform (React, FastAPI, XGBoost) as capstone deliverable. Simplified agent workflow from 25+ manual fields to 5 inputs using dynamic backend calculation engines and integrated SHAP explainability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>UPES, Dehradun</h5>
              </div>
              <h3>2023 – 2027</h3>
            </div>
            <p>
              Pursuing Computer Science & Engineering (CGPA: 8.24/10). Deep focus on data structures, backend system engineering, database management, and applied machine learning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons & LeetCode</h4>
                <h5>Smart India Hackathon & Algorithmic Problem Solving</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Competed in SIH 2025 (Internal Round UPES) for ML crop yield prediction. Solved 200+ LeetCode problems with 349 submissions in the past year, 85 active days, and an 80-day max streak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
