"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserPreferences } from "@/store/userPreferences";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, BookOpen, ArrowLeft } from "lucide-react";

const nativeLanguages = [
  { code: "ar", name: "Arabic", flag: "🇲🇦" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
];

const targetLanguages = [{ code: "en", name: "English", flag: "🇬🇧" }];

export function Onboarding() {
  const [step, setStep] = useState(1);
  const { setPreferences } = useUserPreferences();
  const [formData, setFormData] = useState({
    name: "",
    nativeLanguage: "",
    targetLanguage: "",
  });

  const handleNext = () => {
    if (step === 3) {
      setPreferences({
        ...formData,
        hasCompletedOnboarding: true,
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[90%] max-w-[500px] bg-white text-teal-800 shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-teal-800 text-2xl font-bold">
            Welcome to AI Voice Tutor
          </CardTitle>
          <CardDescription className="text-teal-700">
            Let's personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-800">
                What's your name?
              </h3>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formData.name) {
                    handleNext();
                  }
                }}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-teal-800">
                <Globe className="mr-2 text-yellow-500" /> What's your native
                language?
              </h3>
              <Select
                value={formData.nativeLanguage}
                onValueChange={(value: string) =>
                  updateForm("nativeLanguage", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your native language" />
                </SelectTrigger>
                <SelectContent>
                  {nativeLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-teal-800">
                <BookOpen className="mr-2 text-green-500" /> What language do
                you want to learn?
              </h3>
              <Select
                value={formData.targetLanguage}
                onValueChange={(value: string) =>
                  updateForm("targetLanguage", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language to learn" />
                </SelectTrigger>
                <SelectContent>
                  {targetLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="text-teal-800 border-teal-800"
              >
                <ArrowLeft className="mr-2" /> Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.name) ||
                (step === 2 && !formData.nativeLanguage) ||
                (step === 3 && !formData.targetLanguage)
              }
              className="bg-teal-800 text-white hover:bg-teal-900"
            >
              {step === 3 ? "Get Started" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
