import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(43 96% 56% / 0.3), transparent 50%), radial-gradient(circle at 80% 50%, hsl(152 72% 24% / 0.5), transparent 50%)"
        }} />
      </div>
      <div className="container relative text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">{subtitle}</p>}
        <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
      </div>
    </section>
  );
};
