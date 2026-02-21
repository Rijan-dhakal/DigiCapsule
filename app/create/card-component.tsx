import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardComponentProps{
    children: React.ReactNode,
    count: number
    title: string
}

const CardComponent = ({children, count, title}:CardComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-3xl font-semibold">
              {count}
            </div>
            <span className="text-2xl">{title}</span>
          </div>
        </CardTitle>

        <CardDescription className="border-t mt-4 mb-2" />
      </CardHeader>

      <CardContent className="flex flex-col space-y-2">
        {children}
      </CardContent>
    </Card>
  );
};
export default CardComponent;
