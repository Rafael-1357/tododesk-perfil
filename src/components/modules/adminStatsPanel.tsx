import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, BarChart3, GitPullRequest, Target } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
  <Card className="bg-card/80 backdrop-blur-sm">
    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export function AdminStatsPanel() {

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed top-1/2 -translate-y-1/2 right-0 z-40 rounded-r-none bg-[#480e2a]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="w-[400px] h-full right-0 top-0 mt-0 rounded-none border-l">
        <div className="p-6 space-y-4 overflow-y-auto">
          <h3 className="text-xl font-semibold">Painel Admin</h3>
          <StatCard 
            title="Feedbacks" 
            value="12" 
            icon={BarChart3} 
          />
          <StatCard 
            title="Desvios" 
            value="3" 
            icon={GitPullRequest} 
          />
          <StatCard 
            title="Média de % das 3 ultimas ADs" 
            value="92.5%" 
            icon={Target} 
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}