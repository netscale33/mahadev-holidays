import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const colorMap: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-gray-50 text-gray-600 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  published: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass =
    colorMap[status.toLowerCase()] ||
    "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorClass
      )}
    >
      {status}
    </span>
  );
}
