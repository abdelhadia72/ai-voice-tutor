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

const languages = [
  { code: "ar", name: "Arabic", flag: "🇲🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
];

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
    <div className="fixed inset-0 bg-gray-700/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[90%] max-w-[500px] bg-white text-teal-700 shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-teal-700 text-2xl font-bold">
            Welcome to AI Voice Tutor
          </CardTitle>
          <CardDescription className="text-teal-600">
            Let's personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-700">
                What's your name?
              </h3>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center text-teal-700">
                <Globe className="mr-2 text-yellow-400" /> What's your native
                language?
              </h3>
              <Select
                value={formData.nativeLanguage}
                onValueChange={(value) => updateForm("nativeLanguage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your native language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
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
              <h3 className="text-xl font-semibold flex items-center text-teal-700">
                <BookOpen className="mr-2 text-green-400" /> What language do
                you want to learn?
              </h3>
              <Select
                value={formData.targetLanguage}
                onValueChange={(value) => updateForm("targetLanguage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language to learn" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
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
                className="text-teal-700 border-teal-700"
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
              className="bg-teal-700 text-white"
            >
              {step === 3 ? "Get Started" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
