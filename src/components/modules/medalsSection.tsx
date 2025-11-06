import { Award, Trophy, Star, Medal, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MedalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const MedalCard = ({ icon, title, description, color }: MedalProps) => (
  <Card className="group gap-0 p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 bg-gradient-to-br from-card to-card/50">
    <div className={`mb-4 w-12 p-3 rounded-xl shadow-elevated group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${color}`}>
      {icon}
    </div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

export const MedalsSection = () => {
  const medals = [
    {
      icon: <Trophy className="h-6 w-6 text-amber-100" />,
      title: "Campeão",
      description: "Ganhou o primeiro lugar nas olimpíadas de qualidade",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <Star className="h-6 w-6 text-blue-100" />,
      title: "Estrela do Mês",
      description: "Melhor desempenho do mês de Maio",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Award className="h-6 w-6 text-purple-100" />,
      title: "Expecialista",
      description: "Concluiu 10 cursos avançados",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Medal className="h-6 w-6 text-green-100" />,
      title: "Colecionador",
      description: "Mais de 10 tramas de elegios",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Target className="h-6 w-6 text-red-100" />,
      title: "Focado",
      description: "3 meses seguidos com CSAT acima de 95%",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-100" />,
      title: "Velocista",
      description: "Menor TMA do trimestre",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Medalhas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medals.map((medal, index) => (
          <MedalCard key={index} {...medal} />
        ))}
      </div>
    </div>
  );
};
