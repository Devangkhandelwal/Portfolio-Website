import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

function leetcodeDevApiPlugin(): Plugin {
  return {
    name: "leetcode-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/leetcode-stats", async (req, res) => {
        const url = new URL(req.url || "", `http://${req.headers.host}`);
        const username = url.searchParams.get("username");

        if (!username) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing 'username' query parameter" }));
          return;
        }

        try {
          const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Referer: "https://leetcode.com",
              Origin: "https://leetcode.com",
              "User-Agent": "Mozilla/5.0 (portfolio-stats-widget)",
            },
            body: JSON.stringify({
              query: `
                query userStats($username: String!) {
                  matchedUser(username: $username) {
                    username
                    submitStatsGlobal {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                    userCalendar {
                      activeYears
                      totalActiveDays
                      submissionCalendar
                    }
                  }
                }
              `,
              variables: { username },
            }),
          });

          if (!response.ok) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "LeetCode API request failed" }));
            return;
          }

          const json: any = await response.json();
          const user = json?.data?.matchedUser;

          if (!user) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "LeetCode username not found" }));
            return;
          }

          const acNums = user.submitStatsGlobal.acSubmissionNum as { difficulty: string; count: number }[];
          const totalSolved = acNums.find((d) => d.difficulty === "All")?.count ?? 0;
          const easySolved = acNums.find((d) => d.difficulty === "Easy")?.count ?? 0;
          const mediumSolved = acNums.find((d) => d.difficulty === "Medium")?.count ?? 0;
          const hardSolved = acNums.find((d) => d.difficulty === "Hard")?.count ?? 0;

          const submissionCalendar: Record<string, number> = JSON.parse(
            user.userCalendar.submissionCalendar || "{}"
          );
          const totalSubmissionsPastYear = Object.values(submissionCalendar).reduce(
            (sum, count) => sum + count,
            0
          );

          const totalActiveDays = user.userCalendar.totalActiveDays;

          const daySeconds = 24 * 60 * 60;
          const activeDayTimestamps = Object.keys(submissionCalendar)
            .filter((ts) => submissionCalendar[ts] > 0)
            .map((ts) => parseInt(ts, 10))
            .sort((a, b) => a - b);

          let maxStreak = activeDayTimestamps.length > 0 ? 1 : 0;
          let currentStreak = 1;

          for (let i = 1; i < activeDayTimestamps.length; i++) {
            const gap = activeDayTimestamps[i] - activeDayTimestamps[i - 1];
            if (gap === daySeconds) {
              currentStreak += 1;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else if (gap > daySeconds) {
              currentStreak = 1;
            }
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
          res.end(
            JSON.stringify({
              username: user.username,
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              totalSubmissionsPastYear,
              totalActiveDays,
              maxStreak,
              submissionCalendar,
            })
          );
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err?.message || "Internal error" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), leetcodeDevApiPlugin()],
});
