// api/leetcode-stats.ts
//
// This file is a small "helper program" that runs on Vercel's servers,
// NOT inside your React app. Its only job: ask LeetCode for your stats
// (which your browser isn't allowed to do directly) and hand back clean
// JSON that your React component can use.
//
// WHERE THIS FILE GOES: in a folder called "api" at the ROOT of your
// project (same level as your "src" folder, "package.json", etc.) --
// NOT inside src/. Vercel automatically turns any file in a root-level
// "api" folder into a live backend endpoint, with zero extra setup.
//
// Once deployed, this becomes reachable at:  https://yoursite.com/api/leetcode-stats

import type { VercelRequest, VercelResponse } from "@vercel/node";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const QUERY = `
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
`;

function computeMaxStreak(submissionCalendar: Record<string, number>): number {
  const daySeconds = 24 * 60 * 60;
  const activeDayTimestamps = Object.keys(submissionCalendar)
    .filter((ts) => submissionCalendar[ts] > 0)
    .map((ts) => parseInt(ts, 10))
    .sort((a, b) => a - b);

  if (activeDayTimestamps.length === 0) return 0;

  let maxStreak = 1;
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

  return maxStreak;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = req.query.username as string | undefined;

  if (!username) {
    return res.status(400).json({ error: "Missing 'username' query parameter" });
  }

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        Origin: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio-stats-widget)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: "LeetCode API request failed" });
    }

    const json = await response.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      return res.status(404).json({ error: "LeetCode username not found" });
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
    const maxStreak = computeMaxStreak(submissionCalendar);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      username: user.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalSubmissionsPastYear,
      totalActiveDays,
      maxStreak,
      submissionCalendar,
    });
  } catch (err) {
    console.error("LeetCode stats proxy error:", err);
    return res.status(500).json({ error: "Internal error fetching LeetCode stats" });
  }
}
