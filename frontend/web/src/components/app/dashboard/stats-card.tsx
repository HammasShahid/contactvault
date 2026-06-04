import { Card, CardContent } from '#/components/ui/card';

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <Card className="rounded-[2rem] border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="mt-3 text-4xl font-black tracking-tight">{value}</h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}
