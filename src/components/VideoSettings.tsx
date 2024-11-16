import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Clock,
  GalleryHorizontalEndIcon,
  ProportionsIcon,
  ScanIcon,
} from "lucide-react";
import { useState } from "react";

export default function VideoSettings() {
  const [videoType, setVideoType] = useState("video-ad");
  const [creators, setCreators] = useState([3]);
  const [duration, setDuration] = useState("30s");
  const [aspectRatio, setAspectRatio] = useState("portrait");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-4">
          Select the type of video you want
        </h2>
        <RadioGroup
          value={videoType}
          onValueChange={setVideoType}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col items-center">
            <Card
              className={`relative p-4 cursor-pointer border-2 ${
                videoType === "video-ad"
                  ? "border-purple-500"
                  : "border-transparent hover:border-purple-500"
              }`}
              onClick={() => setVideoType("video-ad")}
            >
              <RadioGroupItem
                value="video-ad"
                id="video-ad"
                className="sr-only"
              />
              <div className="mb-4">
                <img
                  src="https://placehold.co/600x400"
                  alt="Video ad illustration"
                />
              </div>
              <h3 className="font-medium">Video ad</h3>
            </Card>
            <p className="text-sm text-muted-foreground mt-2">
              Perfect for your social media campaigns
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Card
              className={`relative p-4 cursor-pointer border-2 ${
                videoType === "honest-review"
                  ? "border-purple-500"
                  : "border-transparent hover:border-purple-500"
              }`}
              onClick={() => setVideoType("honest-review")}
            >
              <RadioGroupItem
                value="honest-review"
                id="honest-review"
                className="sr-only"
              />
              <div className="mb-4">
                <img
                  src="https://placehold.co/600x400"
                  alt="Honest review illustration"
                />
              </div>
              <h3 className="font-medium">Honest review</h3>
            </Card>
            <p className="text-sm text-muted-foreground mt-2">
              Authentic experiences with your products
            </p>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">
          Number of creators <span className="text-purple-500">*</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          How much creators can participate?
        </p>
        <div className="pt-4">
          <Slider
            value={creators}
            onValueChange={setCreators}
            max={10}
            min={1}
            step={1}
          />
          <div className="mt-2 text-center font-medium">{creators}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">
          Video duration <span className="text-purple-500">*</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          How long should the video be?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            { duration: "30s", price: "$49" },
            { duration: "45s", price: "$99" },
            { duration: "60s", price: "$149" },
          ].map((option) => (
            <Card
              key={option.duration}
              className={`p-4 cursor-pointer border-2 ${
                duration === option.duration
                  ? "border-purple-500"
                  : "border-transparent hover:border-purple-500"
              }`}
              onClick={() => setDuration(option.duration)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{option.duration}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {option.price}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">
          Aspect ratio <span className="text-purple-500">*</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Select how the video should be recorded
        </p>
        <RadioGroup
          value={aspectRatio}
          onValueChange={setAspectRatio}
          className="grid grid-cols-3 gap-4 pt-2"
        >
          {[
            {
              value: "any",
              label: "Any",
              icon: <ScanIcon />,
            },
            {
              value: "landscape",
              label: "Landscape",
              icon: <ProportionsIcon />,
            },
            {
              value: "portrait",
              label: "Portrait",
              icon: <GalleryHorizontalEndIcon />,
            },
          ].map((option) => (
            <Card
              key={option.value}
              className={`p-4 cursor-pointer border-2 ${
                aspectRatio === option.value
                  ? "border-purple-500"
                  : "border-transparent hover:border-purple-500"
              }`}
              onClick={() => setAspectRatio(option.value)}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="sr-only"
              />
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </Card>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
