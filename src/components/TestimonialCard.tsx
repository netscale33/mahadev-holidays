import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating: number;
  avatar?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialCard({
  quote,
  author,
  location,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-500 border border-cream/50">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/10" />

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-accent text-accent"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      <blockquote className="text-primary/80 text-base md:text-lg leading-relaxed mb-6 font-alt italic">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img
              src={avatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">
              {getInitials(author)}
            </span>
          </div>
        )}
        <div>
          <p className="font-heading font-semibold text-primary text-base">
            {author}
          </p>
          {location && (
            <p className="text-primary/75 text-sm font-semibold">{location}</p>
          )}
        </div>
      </div>
    </div>
  );
}
