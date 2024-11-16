import { Button } from "@/components/ui/button";
import { ChevronDownIcon, CircleCheckIcon, CircleIcon } from "lucide-react";
import { useState } from "react";

interface CardProps {
  title: string;
  stepContent: React.ReactNode;
  isCompleted: boolean;
  onComplete: () => void;
}

const CardHeader = ({
  title,
  stepContent,
  isCompleted,
  onComplete,
}: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 mb-6 shadow-lg bg-white">
      <div
        className="flex items-center justify-between cursor-pointer gap gap-5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="">
          {isCompleted ? (
            <CircleCheckIcon className="text-green-500" />
          ) : (
            <CircleIcon className="text-gray-500" />
          )}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <ChevronDownIcon
          className={`ml-2 transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>
      {isExpanded && (
        <div className="mt-4">
          {stepContent}
          {!isCompleted && (
            <Button
              className="mt-4 w-full"
              onClick={() => {
                onComplete();
                setIsExpanded(false);
              }}
            >
              Salvar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardHeader;
