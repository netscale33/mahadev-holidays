import {
  BarChart3,
  TrendingUp,
  PieChart,
} from "lucide-react";

interface AnalyticsChartProps {
  type: "bar" | "line" | "pie";
  data?: Record<string, unknown>;
  title: string;
}

const chartIcons: Record<string, React.ElementType> = {
  bar: BarChart3,
  line: TrendingUp,
  pie: PieChart,
};

const chartDescriptions: Record<string, string> = {
  bar: "Vertical bar chart depicting categorical data with gold-themed bars",
  line: "Line chart showing trends over time with smooth interpolation",
  pie: "Pie chart with radial segments representing proportional data",
};

export default function AnalyticsChart({
  type,
  title,
}: AnalyticsChartProps) {
  const Icon = chartIcons[type];

  return (
    <div className="bg-white rounded-xl border border-cream-dark/20 p-5">
      <h3 className="text-base font-semibold text-navy-900 font-serif mb-4">
        {title}
      </h3>

      <div className="flex flex-col items-center justify-center py-10 text-navy-300">
        <div className="relative">
          <Icon size={56} className="text-gold/30 mb-4" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold animate-ping opacity-40" />
        </div>

        <div className="w-full max-w-xs mt-4">
          {type === "bar" && (
            <div className="flex items-end justify-center gap-3 h-32">
              {[35, 55, 70, 45, 85, 60, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-8 rounded-t-md bg-gold/40"
                  style={{ height: `${h}%` }}
                >
                  <div
                    className="w-full rounded-t-md bg-gold transition-all duration-500"
                    style={{ height: `${h * 0.7}%` }}
                  />
                </div>
              ))}
            </div>
          )}

          {type === "line" && (
            <svg
              viewBox="0 0 200 80"
              className="w-full h-24 text-gold"
              fill="none"
            >
              <polyline
                points="0,60 30,45 60,55 90,25 120,40 150,15 180,30 200,20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              />
              <polyline
                points="0,60 30,45 60,55 90,25 120,40 150,15 180,30 200,20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-90"
              />
            </svg>
          )}

          {type === "pie" && (
            <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e8e0d0"
                strokeWidth="20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="20"
                strokeDasharray="125 126"
                strokeDashoffset="0"
                strokeLinecap="butt"
                transform="rotate(-90 50 50)"
                className="opacity-80"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#8b7355"
                strokeWidth="20"
                strokeDasharray="75 176"
                strokeDashoffset="-125"
                strokeLinecap="butt"
                transform="rotate(-90 50 50)"
                className="opacity-60"
              />
            </svg>
          )}
        </div>

        <p className="text-sm text-navy-400 mt-4 italic">
          {chartDescriptions[type]}
        </p>
        <p className="text-xs text-navy-300 mt-1">
          Analytics visualization will render here with real data
        </p>
      </div>
    </div>
  );
}
