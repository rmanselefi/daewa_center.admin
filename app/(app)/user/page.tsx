import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, UserCheck, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const usersData = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed.hassan@email.com", role: "Admin", status: "Active", joined: "2023-12-01" },
  { id: 2, name: "Fatima Ali", email: "fatima.ali@email.com", role: "User", status: "Active", joined: "2024-01-05" },
  { id: 3, name: "Omar Ibrahim", email: "omar.ibrahim@email.com", role: "Moderator", status: "Active", joined: "2024-01-10" },
  { id: 4, name: "Aisha Mohammed", email: "aisha.mohammed@email.com", role: "User", status: "Inactive", joined: "2024-01-12" },
  { id: 5, name: "Yusuf Abdullah", email: "yusuf.abdullah@email.com", role: "User", status: "Active", joined: "2024-01-15" },
];

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage platform users and their roles</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Joined</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-primary/20">
                        <AvatarFallback className="text-primary text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{user.email}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-foreground">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                        user.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <UserCheck className="h-3 w-3" />
                      ) : (
                        <UserX className="h-3 w-3" />
                      )}
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">{user.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
