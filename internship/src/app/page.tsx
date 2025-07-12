"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [fullText, setFullText] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate scraping, summarizing, and translating
  const handleSummarise = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate scraping
    const fakeText =
      "This is the full text of the blog post scraped from the provided URL. It contains multiple sentences and details about the topic.";
    setFullText(fakeText);
    // Simulate AI summary
    const fakeSummary =
      "This is a simulated summary of the blog post. It condenses the main points into a few sentences.";
    setSummary(fakeSummary);
    // Simulate Urdu translation (static dictionary)
    const urduDict: Record<string, string> = {
      "This is a simulated summary of the blog post. It condenses the main points into a few sentences.":
        "یہ بلاگ پوسٹ کا خلاصہ ہے۔ یہ اہم نکات کو چند جملوں میں بیان کرتا ہے۔",
    };
    setUrdu(urduDict[fakeSummary] || "اردو ترجمہ دستیاب نہیں۔");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-8 bg-background">
      <h1 className="text-3xl font-bold mb-4">Blog Summariser</h1>
      <Card className="w-full max-w-xl p-6">
        <form onSubmit={handleSummarise} className="flex flex-col gap-4">
          <Input
            type="url"
            placeholder="Enter blog URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Summarising..." : "Summarise"}
          </Button>
        </form>
      </Card>
      {summary && (
        <Card className="w-full max-w-xl p-6 mt-4">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="mb-4">{summary}</p>
          <h3 className="text-lg font-semibold mb-1">Urdu Translation</h3>
          <p className="mb-4">{urdu}</p>
          <details>
            <summary className="cursor-pointer font-medium">Show Full Text</summary>
            <p className="mt-2 text-sm text-muted-foreground">{fullText}</p>
          </details>
        </Card>
      )}
    </div>
  );
}
