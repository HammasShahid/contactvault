import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card';

export default function ActivityCard() {
  return (
    <Card className="rounded-[2rem] border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-black tracking-tight">
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {[
          'Added new contact Babar Azam',
          'Updated Sarah Khan contact details',
          'Deleted contact John Doe',
        ].map((activity) => (
          <div
            key={activity}
            className="flex items-start gap-4 rounded-2xl border border-border bg-muted/30 p-4"
          >
            <div className="mt-1 h-3 w-3 rounded-full bg-primary" />

            <div>
              <p className="font-medium">{activity}</p>
              <p className="mt-1 text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
