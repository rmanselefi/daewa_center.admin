import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your platform settings and preferences</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Platform Settings</CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure general platform settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform-name" className="text-foreground">Platform Name</Label>
            <Input
              id="platform-name"
              defaultValue="Daewa Zone"
              className="bg-background border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform-description" className="text-foreground">Description</Label>
            <Input
              id="platform-description"
              defaultValue="Your gateway to authentic Islamic knowledge"
              className="bg-background border-border"
            />
          </div>

          <Separator className="bg-border" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-foreground">User Registration</Label>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-foreground">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email notifications to users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-foreground">Content Moderation</Label>
              <p className="text-sm text-muted-foreground">Require approval before publishing</p>
            </div>
            <Switch />
          </div>

          <Separator className="bg-border" />

          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Changes
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danger Zone</CardTitle>
          <CardDescription className="text-muted-foreground">
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div>
              <p className="font-medium text-foreground">Clear All Analytics Data</p>
              <p className="text-sm text-muted-foreground">This will permanently delete all analytics</p>
            </div>
            <Button variant="destructive" size="sm">
              Clear Data
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div>
              <p className="font-medium text-foreground">Reset Platform</p>
              <p className="text-sm text-muted-foreground">Reset all settings to default values</p>
            </div>
            <Button variant="destructive" size="sm">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
