"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ALLOWED_WEBSITES, URDU_TRANSLATIONS } from "@/lib/data";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [fullText, setFullText] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSummarise = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    setSummary("");
    setUrdu("");
    setFullText("");
    setTextLength(0);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError(`${data.error} ${data.allowedWebsites.join(', ')}`);
        } else {
          setError(data.error || 'An error occurred');
        }
        return;
      }

      setSummary(data.summary);
      const urduTranslation = URDU_TRANSLATIONS[url] || data.urduTranslation || "Translation not available";
      setUrdu(urduTranslation);
      setFullText(data.fullText);
      setTextLength(data.textLength || 0);
      setInfo(`✅ Full text (${data.textLength || 0} characters) successfully stored in MongoDB with ID: ${data.mongoId || 'N/A'}`);
    

    } catch {
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black font-sans text-white">
      <div className="flex justify-end pt-8 pr-8">
        <a
          href="/dashboard"
          className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-200"
          style={{ textDecoration: 'none' }}
        >
          📊 View Database Dashboard
        </a>
      </div>
      <div className="relative z-10 flex flex-col items-center p-4 gap-4 w-full">
        <div className="text-center max-w-2xl mx-auto w-full">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white leading-tight">
              Blog Summariser
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-4">
              Transform web content into concise summaries with AI-powered insights
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
            <div className="flex-1 min-w-0 bg-black/60 border border-white/10 shadow-xl rounded-2xl backdrop-blur p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-white mb-2">AI Summary & Translation</h3>
              <p className="text-sm text-gray-200">
                For ethical considerations, AI summaries and Urdu translations are static/predefined responses using JS dictionary.
              </p>
            </div>
            <div className="flex-1 min-w-0 bg-black/60 border border-white/10 shadow-xl rounded-2xl backdrop-blur p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-white mb-2">Web Scraping</h3>
              <p className="text-sm text-gray-200">
                Web scraping is dynamic and real-time. Only permitted websites can be scraped for ethical data collection.
              </p>
            </div>
            <div className="flex-1 min-w-0 bg-black/60 border border-white/10 shadow-xl rounded-2xl backdrop-blur p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-white mb-2">Data Storage</h3>
              <p className="text-sm text-gray-200">
                Timestamp, summary, and URL saved in Supabase. Full text stored in MongoDB.
              </p>
            </div>
          </div>

          <Card className="p-4 border-0 shadow-2xl bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Permitted Websites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {ALLOWED_WEBSITES.map((website, index) => (
                <div key={index} className="text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30 backdrop-blur-sm">
                  {website}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="w-full max-w-lg p-6 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <form onSubmit={handleSummarise} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Enter Website URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="h-10 text-sm border-2 border-white/20 bg-white/10 text-white placeholder-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="h-10 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "🚀 Scrape & Summarize"
              )}
            </Button>
          </form>
        </Card>

        {error && (
          <Card className="w-full max-w-lg p-4 border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-sm font-semibold">Error</h2>
            </div>
            <p className="text-xs text-red-100">{error}</p>
          </Card>
        )}

        {false && info && (
          <Card className="w-full max-w-lg p-4 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-sm font-semibold">Information</h2>
            </div>
            <p className="text-xs text-blue-100">{info}</p>
          </Card>
        )}

        {summary && (
          <Card className="w-full max-w-lg p-6 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ✨ Summary Generated
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4 rounded-lg border-l-4 border-blue-400 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-blue-200 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  AI Summary
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">{summary}</p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 p-4 rounded-lg border-l-4 border-emerald-400 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-emerald-200 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  Urdu Translation (JS Dictionary)
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed text-right" dir="rtl">{urdu}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border-l-4 border-purple-400 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-purple-200 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  MongoDB Storage Info
                </h3>
                <div className="text-xs text-purple-100 space-y-1">
                  <p>📊 Text Length: {textLength.toLocaleString()} characters</p>
                  <p>💾 Status: ✅ Successfully stored</p>
                </div>
              </div>
              
              <details className="group">
                <summary className="cursor-pointer text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2 transform group-open:rotate-90 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Show Full Scraped Text ({textLength.toLocaleString()} characters)
                </summary>
                <div className="mt-2 p-3 bg-white/5 rounded border border-white/10 backdrop-blur-sm">
                  <p className="text-xs text-gray-200 leading-relaxed">{fullText}</p>
                </div>
              </details>
            </div>
          </Card>
        )}

        <footer className="mt-8 text-center space-y-4">
          <div className="text-xs text-gray-300 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            Made by <span className="font-semibold text-purple-400">Zayyan</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
