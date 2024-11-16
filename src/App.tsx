import { useState } from "react";
import CardHeader from "./components/CardHeader";
import Products from "./components/Product";
import TaskDetails from "./components/Tasks";
import VideoSettings from "./components/VideoSettings";

const steps = [
  { title: "Video Settings", id: "video-settings" },
  { title: "Product", id: "product" },
  { title: "Task Details", id: "task-details" },
];

export default function App() {
  const [completedSteps, setCompletedSteps] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: true }));
  };

  const renderStepContent = (id: string) => {
    switch (id) {
      case "video-settings":
        return <VideoSettings />;
      case "product":
        return <Products />;
      case "task-details":
        return <TaskDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-1xl p-10">
        {steps.map((step) => (
          <CardHeader
            key={step.id}
            title={step.title}
            stepContent={renderStepContent(step.id)}
            isCompleted={!!completedSteps[step.id]}
            onComplete={() => handleComplete(step.id)}
          />
        ))}
        <div className="border rounded-lg p-4 mb-6 shadow-lg bg-white space-y-10">
          <div className="flex justify-between items-center">
            {isLoading ? (
              <span className="text-gray-500">Saving...</span>
            ) : (
              <span></span>
            )}

            <div className="flex space-x-4">
              <button
                className="border px-4 py-2 rounded text-slate-100"
                onClick={() => console.log("Cancel clicked")}
              >
                Cancel
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    console.log("Save completed");
                  }, 2000);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
