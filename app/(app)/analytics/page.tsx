import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Video, Clock } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights and performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Watch Time
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24 min</div>
            <p className="text-xs text-primary mt-1">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">68%</div>
            <p className="text-xs text-primary mt-1">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+1,234</div>
            <p className="text-xs text-primary mt-1">+18% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Published
            </CardTitle>
            <Video className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
            <p className="text-xs text-primary mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "The Virtues of Ramadan", views: "18.5K", engagement: "72%" },
                { title: "The Importance of Patience", views: "15.2K", engagement: "68%" },
                { title: "Understanding Tawheed", views: "12.8K", engagement: "65%" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.views} views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{item.engagement}</p>
                    <p className="text-xs text-muted-foreground">engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { age: "18-24", percentage: "28%", color: "bg-primary" },
                { age: "25-34", percentage: "42%", color: "bg-primary/80" },
                { age: "35-44", percentage: "20%", color: "bg-primary/60" },
                { age: "45+", percentage: "10%", color: "bg-primary/40" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.age} years</span>
                    <span className="font-medium text-foreground">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
