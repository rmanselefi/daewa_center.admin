import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Users, Eye, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Lectures",
    value: "248",
    change: "+12%",
    icon: Video,
  },
  {
    title: "Active Users",
    value: "12,458",
    change: "+18%",
    icon: Users,
  },
  {
    title: "Total Views",
    value: "1.2M",
    change: "+24%",
    icon: Eye,
  },
  {
    title: "Growth Rate",
    value: "32%",
    change: "+8%",
    icon: TrendingUp,
  },
];

const recentLectures = [
  {
    title: "The Importance of Patience",
    speaker: "Sheikh Ahmad Al-Khalil",
    views: "15.2K",
    status: "Published",
  },
  {
    title: "Understanding Tawheed",
    speaker: "Sheikh Muhammad Ibrahim",
    views: "12.8K",
    status: "Published",
  },
  {
    title: "The Virtues of Ramadan",
    speaker: "Sheikh Abdullah Hassan",
    views: "18.5K",
    status: "Published",
  },
  {
    title: "Quranic Reflections",
    speaker: "Sheikh Omar Suleiman",
    views: "9.3K",
    status: "Draft",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here`s an overview of your platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-primary mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLectures.map((lecture, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {lecture.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lecture.speaker}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {lecture.views}
                    </p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lecture.status === "Published"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {lecture.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
