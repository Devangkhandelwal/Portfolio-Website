import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Devang, a CS undergraduate at UPES Dehradun who likes building things end-to-end rather than stopping at a notebook or a mockup. I work across the stack — Python/Django/FastAPI on the backend, React on the front, and machine learning when a problem calls for it — and I care as much about the algorithm behind a feature as I do about whether it actually ships. Outside of coursework, I spend time solving DSA problems (200+ on LeetCode) and recently co-authored a research paper on real-time face anti-spoofing using attention-based deep learning.
        </p>
      </div>
    </div>
  );
};

export default About;
