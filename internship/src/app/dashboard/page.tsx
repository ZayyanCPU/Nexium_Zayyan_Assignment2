"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface MongoDocument {
  _id: string;
  url: string;
  fullText: string;
  textLength: number;
  timestamp: string;
  userAgent: string;
  extractedAt: string;
}

interface SupabaseDocument {
  id: number;
  url: string;
  summary: string;
  time: string;
}

export default function Dashboard() {
  const [mongoData, setMongoData] = useState<MongoDocument[]>([]);
  const [supabaseData, setSupabaseData] = useState<SupabaseDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mongoResponse, supabaseResponse] = await Promise.all([
        fetch('/api/dashboard/mongodb'),
        fetch('/api/dashboard/supabase')
      ]);

      if (mongoResponse.ok) {
        const mongoData = await mongoResponse.json();
        setMongoData(mongoData);
      }

      if (supabaseResponse.ok) {
        const supabaseData = await supabaseResponse.json();
        setSupabaseData(supabaseData);
      }
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Database Dashboard</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end pt-2 pr-2 mb-4">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            ← Back
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Database Dashboard</h1>
        
        {error && (
          <Card className="p-4 mb-6 bg-red-500/20 border-red-500/50">
            <p className="text-red-200">{error}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">MongoDB - Full Text Storage</h2>
            <div className="space-y-4">
              {mongoData.map((doc) => (
                <Card key={doc._id} className="p-4 bg-white/10 border-white/20">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-blue-300">{doc.url}</h3>
                      <span className="text-xs text-gray-400">{doc.timestamp ? new Date(doc.timestamp).toLocaleString() : 'N/A'}</span>
                    </div>
                    <p className="text-xs text-gray-300">Text Length: {(doc.textLength || doc.fullText?.length || 0).toLocaleString()} characters</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-purple-300 hover:text-purple-200">
                        View Full Text
                      </summary>
                      <div
                        className="mt-2 p-3 rounded bg-white/80 text-black text-xs max-h-64 overflow-auto border border-white/30 shadow-inner"
                        style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                      >
                        {doc.fullText || ''}
                      </div>
                    </details>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Supabase - Summaries</h2>
            <div className="space-y-4">
              {supabaseData.map((doc) => (
                <Card key={doc.id} className="p-4 bg-white/10 border-white/20">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-green-300">{doc.url}</h3>
                      <span className="text-xs text-gray-400">{doc.time ? new Date(doc.time).toLocaleString() : 'N/A'}</span>
                    </div>
                    <p className="text-sm text-gray-200">{doc.summary}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-2">Database Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">MongoDB Documents</p>
              <p className="text-2xl font-bold text-blue-400">{mongoData.length}</p>
            </div>
            <div>
              <p className="text-gray-400">Supabase Records</p>
              <p className="text-2xl font-bold text-green-400">{supabaseData.length}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Characters</p>
              <p className="text-2xl font-bold text-purple-400">
                {mongoData.reduce((sum, doc) => sum + (doc.textLength || doc.fullText?.length || 0), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Latest Activity</p>
              <p className="text-sm text-gray-300">
                {mongoData.length > 0 && mongoData[0].timestamp ? new Date(mongoData[0].timestamp).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center space-y-4">
          <div className="text-xs text-gray-300 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            Made by <span className="font-semibold text-purple-400">Zayyan</span>
          </div>
        </footer>
      </div>
    </div>
  );
} 