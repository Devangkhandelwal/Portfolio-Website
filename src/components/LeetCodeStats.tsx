// src/components/LeetCodeStats.tsx
//
// Drop this file into your project's "src/components" folder (next to
// your other components). Then use it inside any page like:
//
//   import LeetCodeStats from "./components/LeetCodeStats";
//   ...
//   <LeetCodeStats username="your_leetcode_username" />
//
// It calls YOUR OWN "/api/leetcode-stats" endpoint (the serverless
// function in api/leetcode-stats.ts) -- it never talks to LeetCode
// directly, since browsers aren't allowed to.

import { useEffect, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DAY_SECONDS = 24 * 60 * 60;
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const COLOR_SCALE = ["#2a2a2a", "#0e4429", "#146c36", "#22a352", "#3ddc7a", "#7cf5ab"];

interface LeetCodeStatsData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionsPastYear: number;
  totalActiveDays: number;
  maxStreak: number;
  submissionCalendar: Record<string, number>;
}

interface DayCell {
  date: Date;
  count: number;
}

function colorForCount(count: number, maxCount: number): string {
  if (!count) return COLOR_SCALE[0];
  if (maxCount <= 1) return COLOR_SCALE[2];
  const ratio = count / maxCount;
  if (ratio > 0.8) return COLOR_SCALE[5];
  if (ratio > 0.55) return COLOR_SCALE[4];
  if (ratio > 0.3) return COLOR_SCALE[3];
  return COLOR_SCALE[2];
}

function buildWeeks(submissionCalendar: Record<string, number>): DayCell[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const calendarEntries = Object.entries(submissionCalendar).map(([ts, count]) => ({
    ts: parseInt(ts, 10),
    count,
  }));

  const weeks: DayCell[][] = [];
  let cursor = new Date(startDate);
  let currentWeek: DayCell[] = [];

  while (cursor <= endDate) {
    const dayTimestampSec = Math.floor(cursor.getTime() / 1000);
    const match = calendarEntries.find(
      (item) => Math.abs(item.ts - dayTimestampSec) < DAY_SECONDS
    );
    const count = match ? match.count : 0;

    currentWeek.push({ date: new Date(cursor), count });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length) weeks.push(currentWeek);

  return weeks;
}

function getMonthLabels(weeks: DayCell[][]): { weekIndex: number; text: string }[] {
  const labels: { weekIndex: number; text: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const month = week[0].date.getMonth();
    if (month !== lastMonth) {
      labels.push({ weekIndex, text: MONTH_NAMES[month] });
      lastMonth = month;
    }
  });
  return labels;
}

interface LeetCodeStatsProps {
  username: string;
}

export default function LeetCodeStats({ username }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<LeetCodeStatsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    fetch(`/api/leetcode-stats?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load LeetCode stats");
        return res.json();
      })
      .then((data: LeetCodeStatsData) => {
        if (!cancelled) {
          setStats(data);
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const heatmapData = useMemo(() => {
    if (!stats) return null;
    const weeks = buildWeeks(stats.submissionCalendar);
    const maxCount = Math.max(1, ...weeks.flat().map((d) => d.count));
    const monthLabels = getMonthLabels(weeks);
    return { weeks, maxCount, monthLabels };
  }, [stats]);

  if (error) {
    return (
      <div style={styles.card}>
        <p style={{ color: "#999", fontSize: 14 }}>Couldn't load LeetCode stats right now.</p>
      </div>
    );
  }

  if (!stats || !heatmapData) {
    return (
      <div style={styles.card}>
        <div style={styles.skeletonHeatmap} />
      </div>
    );
  }

  const { weeks, maxCount, monthLabels } = heatmapData;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={styles.headerLeft}>
            <span style={styles.headerNumber}>{stats.totalSubmissionsPastYear}</span>
            <span style={styles.headerLabel}>&nbsp;submissions in the past one year</span>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.headerRightLabel}>
              Total active days:&nbsp;<b style={styles.headerRightValue}>{stats.totalActiveDays}</b>
            </span>
            <span style={styles.headerRightLabel}>
              Max streak:&nbsp;<b style={styles.headerRightValue}>{stats.maxStreak}</b>
            </span>
          </div>
        </div>

        <div style={styles.heatmapScroll}>
          <div style={styles.heatmapInner}>
            <div style={styles.weeksContainer}>
              {weeks.map((week, wi) => (
                <div key={wi} style={styles.weekColumn}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.date.toDateString()}: ${day.count} submission${day.count === 1 ? "" : "s"}`}
                      style={{ ...styles.daySquare, backgroundColor: colorForCount(day.count, maxCount) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div style={styles.monthRow}>
              {monthLabels.map((m, i) => (
                <span key={i} style={{ ...styles.monthLabel, left: m.weekIndex * 15 }}>
                  {m.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatCard value={`${stats.totalSolved}+`} label="LeetCode Problems Solved" />
        <StatCard value={stats.totalSubmissionsPastYear} label="Submissions (Past Year)" />
        <StatCard value={stats.totalActiveDays} label="Total Active Days" />
        <StatCard value={stats.maxStreak} label="Max Streak" />
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: "flex", flexDirection: "column", gap: 16, width: "100%" },
  card: { background: "#161616", borderRadius: 16, padding: "24px 28px", border: "1px solid #262626" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 },
  headerLeft: { display: "flex", alignItems: "baseline" },
  headerNumber: { color: "#fff", fontSize: 22, fontWeight: 700 },
  headerLabel: { color: "#8a8a8a", fontSize: 15 },
  headerRight: { display: "flex", gap: 20 },
  headerRightLabel: { color: "#8a8a8a", fontSize: 13.5 },
  headerRightValue: { color: "#fff" },
  heatmapScroll: { overflowX: "auto", paddingBottom: 4 },
  heatmapInner: { display: "inline-block", minWidth: "100%" },
  weeksContainer: { display: "flex", gap: 3 },
  weekColumn: { display: "flex", flexDirection: "column", gap: 3 },
  daySquare: { width: 12, height: 12, borderRadius: 3 },
  monthRow: { position: "relative", height: 20, marginTop: 8 },
  monthLabel: { position: "absolute", top: 0, color: "#8a8a8a", fontSize: 13 },
  skeletonHeatmap: { height: 180, borderRadius: 10, background: "#1c1c1c" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 },
  statCard: { background: "#161616", borderRadius: 16, border: "1px solid #262626", padding: "24px 16px", textAlign: "center" },
  statValue: { color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 6 },
  statLabel: { color: "#8a8a8a", fontSize: 13.5 },
};
