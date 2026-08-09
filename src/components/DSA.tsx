import "./styles/DSA.css";
import LeetCodeStats from "./LeetCodeStats";

const DSA = () => {
  return (
    <div className="dsa-section section-container" id="dsa">
      <h2>
        DSA <span>&</span> Algorithmic Thinking
      </h2>
      <div className="dsa-container">
        <div className="dsa-quote-box">
          <p className="dsa-quote-text">
            "Somewhere between my 50th and 200th LeetCode problem, I stopped seeing &quot;Word Search&quot; and &quot;Rat in a Maze&quot; as different problems — and started seeing DFS with backtracking. That shift is what 200+ solved problems across arrays, trees, graphs, DP, and greedy algorithms has taught me: not just how to solve a problem, but how to recognize which problem it secretly is."
          </p>
        </div>

        <LeetCodeStats username="Devang_Khandewal" />
      </div>
    </div>
  );
};

export default DSA;
