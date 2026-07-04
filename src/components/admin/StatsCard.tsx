import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-cream-dark/20 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
          <Icon size={22} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trendUp
                ? "text-green-700 bg-green-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {trendUp ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {trend}
          </div>
        )}
      </div>
      <p className="text-sm text-navy-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-navy-900 font-serif">{value}</p>
    </div>
  );
}
