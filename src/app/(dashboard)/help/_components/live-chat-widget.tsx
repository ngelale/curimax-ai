"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { MessageSquare, Minus, X, Send, Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition flex items-center gap-2 animate-pulse"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-sm font-medium">Chat with us!</span>
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    );
  }

  if (showRating) {
    return (
      <Card className="fixed bottom-6 right-6 w-96 shadow-2xl z-50">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <p className="font-semibold">Rate Your Experience</p>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">How satisfied are you with this chat?</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className="p-2 hover:scale-110 transition"
              >
                <Star
                  className={`h-6 w-6 ${
                    rating && rating >= num
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Button
            onClick={() => {
              setIsOpen(false);
              setShowRating(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Done
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 flex flex-col shadow-2xl border-0 z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <div>
          <p className="font-semibold">Curimax Support</p>
          <p className="text-xs text-blue-100">We typically reply in minutes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white hover:bg-blue-500 p-1 rounded transition"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-500 p-1 rounded transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 space-y-4">
        <div className="flex items-start gap-2">
          <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
            S
          </div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-[75%]">
            <p className="text-sm text-gray-800">Hi there! 👋 I'm Sarah from the Curimax team.</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
            S
          </div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-[75%]">
            <p className="text-sm text-gray-800">How can I help you today?</p>
          </div>
        </div>

        <div className="flex items-start gap-2 justify-end">
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[75%]">
            <p className="text-sm">I need help with my project</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
            S
          </div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-[75%]">
            <p className="text-sm text-gray-800">I'd be happy to help! What's the issue?</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
            S
          </div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-[75%]">
            <p className="text-sm text-gray-600 animate-pulse">Typing...</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t bg-white flex flex-col gap-3">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1 text-sm"
            autoComplete="off"
          />
          <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <span>File attachments & screenshots supported</span>
          <button
            onClick={() => setShowRating(true)}
            className="text-blue-600 hover:underline font-medium"
          >
            End chat
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};