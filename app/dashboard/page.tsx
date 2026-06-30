'use client';

import { useEffect, useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { mockIssues, mockMetrics, categoryIcons, categoryLabels, statusLabels } from '@/lib/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, reported: 0, inProgress: 0, resolved: 0, criticalCount: 0 });
  const [categoryDistribution, setCategoryDistribution] = useState<Array<{ name: string; value: number }>>([]);

  useEffect(() => {
    // Compute stats only on client after hydration
    const total = mockIssues.length;
    const reported = mockIssues.filter((i) => i.status === 'reported').length;
    const inProgress = mockIssues.filter((i) => i.status === 'in-progress').length;
    const resolved = mockIssues.filter((i) => i.status === 'resolved').length;
    const criticalCount = mockIssues.filter((i) => i.severity === 'critical').length;
    
    setStats({ total, reported, inProgress, resolved, criticalCount });

    // Compute category distribution
    const dist: Record<string, number> = {};
    mockIssues.forEach((issue) => {
      dist[categoryLabels[issue.category]] = (dist[categoryLabels[issue.category]] || 0) + 1;
    });
    setCategoryDistribution(Object.entries(dist).map(([name, value]) => ({ name, value })));

    setIsClient(true);
  }, []);

  const filteredIssues = !isClient ? [] : (selectedStatus ? mockIssues.filter((i) => i.status === selectedStatus) : mockIssues);

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f43f5e'];

  if (!isClient) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col">
      <Navigation />
      <div className="bg-card border-b border-border sticky top-10 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Authority Dashboard</h1>
            <p className="text-muted-foreground">Loading metrics...</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded mb-2 w-20"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col">
      <Navigation />
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Authority Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all reported civic issues</p>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Zap className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reported</p>
                <p className="text-3xl font-bold text-foreground">{stats.reported}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-secondary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-foreground">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-accent opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-3xl font-bold text-destructive">{stats.criticalCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </div>
        </div>

        {/* Charts Grid - Stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resolution Time Trend */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Avg Resolution Time (Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMetrics.averageResolutionTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--color-primary)" name="Actual" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="var(--color-accent)" name="Target" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Issues by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Resolution Rate Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockMetrics.resolutionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
              <Legend />
              <Bar dataKey="value" fill="var(--color-secondary)" name="Resolution Rate %" />
              <Bar dataKey="target" fill="var(--color-accent)" name="Target %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Issues List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Active Issues</h2>
              <div className="flex gap-2">
                {['reported', 'acknowledged', 'in-progress'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedStatus === status
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-border text-foreground'
                    }`}
                  >
                    {statusLabels[status as keyof typeof statusLabels]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Issue</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Severity</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Verifications</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.slice(0, 15).map((issue) => (
                  <tr key={issue.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-foreground font-medium">{issue.title}</td>
                    <td className="px-6 py-3 text-muted-foreground">
                      {categoryIcons[issue.category]} {categoryLabels[issue.category]}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${
                        issue.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
                        issue.severity === 'high' ? 'bg-secondary/20 text-secondary' :
                        issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{statusLabels[issue.status]}</td>
                    <td className="px-6 py-3 text-foreground font-medium">{issue.verifications}</td>
                    <td className="px-6 py-3 text-muted-foreground">{issue.assignedTo || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
