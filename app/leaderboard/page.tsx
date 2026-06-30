'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { mockUsers, mockIssues, mockMetrics } from '@/lib/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Award, TrendingUp, Users, Target, Zap } from 'lucide-react';

export default function LeaderboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sort users by trust score
  const sortedByTrust = !isClient ? [] : [...mockUsers].sort((a, b) => b.trustScore - a.trustScore);
  const sortedByReports = !isClient ? [] : [...mockUsers].sort((a, b) => b.issuesReported - a.issuesReported);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col">
      <Navigation />
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Trophy className="w-8 h-8 text-secondary" />
            Community Leaderboard
          </h1>
          <p className="text-muted-foreground">See who&apos;s making the biggest impact on our city</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Engagement Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contributors</p>
                <p className="text-3xl font-bold text-foreground">{mockUsers.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-3xl font-bold text-foreground">{mockIssues.length}</p>
              </div>
              <Target className="w-8 h-8 text-accent opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Trust Score</p>
                <p className="text-3xl font-bold text-foreground">
                  {(mockUsers.reduce((sum, u) => sum + u.trustScore, 0) / mockUsers.length).toFixed(0)}
                </p>
              </div>
              <Award className="w-8 h-8 text-secondary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-3xl font-bold text-foreground">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </div>
        </div>

        {/* Engagement Trend Chart */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Community Engagement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMetrics.communityEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="var(--color-accent)" name="Active Contributors" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="var(--color-primary)" name="Target" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top by Trust Score */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Top by Trust Score
              </h2>
            </div>

            <div className="divide-y divide-border">
              {sortedByTrust.slice(0, 8).map((user, index) => (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.issuesReported} reports</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary">{user.trustScore}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: `${(user.trustScore / 100) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top by Reports */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Top by Reports Submitted
              </h2>
            </div>

            <div className="divide-y divide-border">
              {sortedByReports.slice(0, 8).map((user, index) => (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">Trust: {user.trustScore}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.issuesReported}</p>
                      <p className="text-xs text-muted-foreground">reports</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(user.issuesReported / 71) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Community Badges</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-semibold text-foreground mb-2">Rising Reporter</h3>
              <p className="text-sm text-muted-foreground">5+ reports submitted</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.issuesReported >= 5).length} members</p>
            </div>

            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold text-foreground mb-2">Civic Champion</h3>
              <p className="text-sm text-muted-foreground">20+ reports submitted</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.issuesReported >= 20).length} members</p>
            </div>

            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="font-semibold text-foreground mb-2">Community Leader</h3>
              <p className="text-sm text-muted-foreground">90+ trust score</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.trustScore >= 90).length} members</p>
            </div>

            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-foreground mb-2">Impact Maker</h3>
              <p className="text-sm text-muted-foreground">Issues marked resolved</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.issuesReported >= 30).length} members</p>
            </div>

            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-foreground mb-2">Rapid Responder</h3>
              <p className="text-sm text-muted-foreground">50% accuracy rate</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.trustScore >= 80).length} members</p>
            </div>

            <div className="border border-border rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-semibold text-foreground mb-2">Verified Expert</h3>
              <p className="text-sm text-muted-foreground">95+ trust score</p>
              <p className="text-xs text-accent mt-2">Awarded to {mockUsers.filter((u) => u.trustScore >= 95).length} members</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}
