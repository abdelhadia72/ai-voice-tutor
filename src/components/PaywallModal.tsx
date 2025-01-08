"use client";
import { useProStore } from "@/store/proStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PaywallModalProps {
  onClose?: () => void;
}

export function PaywallModal({ onClose }: PaywallModalProps) {
  const handleUpgrade = () => {
    window.location.href = "https://google.com";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500" />
            <CardTitle>Upgrade to Pro</CardTitle>
          </div>
          <CardDescription>
            Get unlimited access to all premium features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold text-center">$40</div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Access to all conversation scenarios</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Real-time voice chat</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Advanced grammar correction</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Unlimited translations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Access to all premium images and content</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleUpgrade}>
            Upgrade Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
