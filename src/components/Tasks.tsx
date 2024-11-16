import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";

const taskSchema = z.object({
  taskName: z.string().min(1, { message: "Task name is required" }),
  gender: z
    .object({
      male: z.boolean(),
      female: z.boolean(),
    })
    .refine((gender) => gender.male || gender.female, {
      message: "At least one gender must be selected",
    }),
  ageRange: z
    .object({
      age18_29: z.boolean(),
      age30_45: z.boolean(),
      age45Plus: z.boolean(),
    })
    .refine((ageRange) => Object.values(ageRange).some(Boolean), {
      message: "At least one age range must be selected",
    }),
  categories: z
    .object({
      beauty: z.boolean(),
      tech: z.boolean(),
      food: z.boolean(),
      sports: z.boolean(),
      travel: z.boolean(),
      other: z.boolean(),
    })
    .refine((categories) => Object.values(categories).some(Boolean), {
      message: "At least one category must be selected",
    }),
});

export default function TaskDetails() {
  const [taskName, setTaskName] = useState(() => {
    const savedTaskName = localStorage.getItem("taskName");
    return savedTaskName || "";
  });

  const [gender, setGender] = useState<{ male: boolean; female: boolean }>(
    () => {
      const savedGender = localStorage.getItem("gender");
      return savedGender
        ? JSON.parse(savedGender)
        : { male: false, female: false };
    }
  );

  const [ageRange, setAgeRange] = useState<{
    age18_29: boolean;
    age30_45: boolean;
    age45Plus: boolean;
  }>(() => {
    const savedAgeRange = localStorage.getItem("ageRange");
    return savedAgeRange
      ? JSON.parse(savedAgeRange)
      : { age18_29: false, age30_45: false, age45Plus: false };
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : {
          beauty: false,
          tech: false,
          food: false,
          sports: false,
          travel: false,
          other: false,
        };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const result = taskSchema.safeParse({
      taskName,
      gender,
      ageRange,
      categories,
    });

    if (!result.success) {
      // Se a validação falhar, exibe os erros
      alert(
        result.error.format().taskName?._errors.join(", ") ||
          "Validation failed. Please fill all fields."
      );
      return;
    }

    const data = { gender, ageRange, categories, taskName };
    console.log("Form data:", data);

    localStorage.setItem("taskName", taskName);
    localStorage.setItem("gender", JSON.stringify(gender));
    localStorage.setItem("ageRange", JSON.stringify(ageRange));
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-8 p-4">
      <div className="space-y-2">
        <label htmlFor="taskName" className="text-base">
          Task name <span className="text-red-500">*</span>
        </label>
        <Input
          id="taskName"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Provide an attractive name for your task
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-medium">Creators</h2>

        <div className="space-y-2">
          <label className="text-base">
            Gender <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-muted-foreground">
            Select your preferred gender
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="male"
              checked={gender.male}
              onCheckedChange={() =>
                setGender((prev) => ({ ...prev, male: !prev.male }))
              }
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="female"
              checked={gender.female}
              onCheckedChange={() =>
                setGender((prev) => ({ ...prev, female: !prev.female }))
              }
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-base">
            Age <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-muted-foreground">
            How old should the creator be?
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="age18-29"
              checked={ageRange.age18_29}
              onCheckedChange={() =>
                setAgeRange((prev) => ({
                  ...prev,
                  age18_29: !prev.age18_29,
                }))
              }
            />
            <label htmlFor="age18-29">Between 18 and 29</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="age30-45"
              checked={ageRange.age30_45}
              onCheckedChange={() =>
                setAgeRange((prev) => ({
                  ...prev,
                  age30_45: !prev.age30_45,
                }))
              }
            />
            <label htmlFor="age30-45">Between 30 and 45</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="age45+"
              checked={ageRange.age45Plus}
              onCheckedChange={() =>
                setAgeRange((prev) => ({
                  ...prev,
                  age45Plus: !prev.age45Plus,
                }))
              }
            />
            <label htmlFor="age45+">More than 45 years old</label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Segment</h2>

        <div className="space-y-2">
          <label className="text-base">
            Categories <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-muted-foreground">
            How creator can find for your task?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["beauty", "tech", "food", "sports", "travel", "other"].map(
              (category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={categories[category as keyof typeof categories]}
                    onCheckedChange={() =>
                      setCategories((prev: any) => ({
                        ...prev,
                        [category]: !prev[category as keyof typeof categories],
                      }))
                    }
                    className="focus:ring-purple-500 text-purple-600"
                  />
                  <label htmlFor={category}>
                    {category.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Button type="submit">Alterar</Button>
    </form>
  );
}
