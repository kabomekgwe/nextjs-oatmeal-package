import { Container, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Stat {
  number: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
  className?: string;
}

export function Stats({ stats, className }: StatsProps) {
  if (!stats || stats.length === 0) {
    return null;
  }
  return (
    <section className={cn("py-16 bg-[#84cc16]", className)}>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1c1917] mb-2">
                {stat.number}
              </div>
              <Text className="text-[#1c1917]/80 font-medium">{stat.label}</Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
