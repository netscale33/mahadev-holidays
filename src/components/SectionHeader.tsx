interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}>
      {tag && (
        <span
          className={`inline-block px-4 py-1.5 border rounded-full text-xs tracking-[0.2em] uppercase mb-4 font-bold ${
            light
              ? "border-accent/40 text-accent drop-shadow-sm"
              : "border-accent/40 text-accent"
          }`}
        >
          {tag}
        </span>
      )}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight tracking-tight ${
          light
            ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent py-1"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            light ? "text-white/90" : "text-primary/90"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 w-16 h-[2px] ${centered ? "mx-auto" : ""} ${
          light ? "bg-accent" : "bg-accent"
        }`}
      />
    </div>
  );
}
