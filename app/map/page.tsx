'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { mockIssues, categoryIcons, categoryLabels, IssueCategory, IssueStatus } from '@/lib/mockData';
import { X, Filter, AlertCircle, CheckCircle, Clock, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { ssr: false });

type FilterKeys = 'category' | 'status' | 'severity';

export default function MapPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<FilterKeys, string[]>>({
    category: [],
    status: [],
    severity: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredIssues = useMemo(() => {
    return mockIssues.filter((issue) => {
      if (filters.category.length > 0 && !filters.category.includes(issue.category)) return false;
      if (filters.status.length > 0 && !filters.status.includes(issue.status)) return false;
      if (filters.severity.length > 0 && !filters.severity.includes(issue.severity)) return false;
      return true;
    });
  }, [filters]);

  const selectedIssueData = selectedIssue ? mockIssues.find((i) => i.id === selectedIssue) : null;

  const toggleFilter = (key: FilterKeys, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Header with Filters - Fixed at top */}
      <div className="bg-card border-b border-border flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Civic Issues Map</h1>
            <p className="text-xs text-muted-foreground">{filteredIssues.length} issues reported</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="border-t border-border/50 px-4 sm:px-6 lg:px-8 py-3 bg-muted/30 space-y-2 max-h-40 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-foreground text-xs mb-2">Category</h3>
              <div className="flex flex-wrap gap-1">
                {['pothole', 'streetlight', 'garbage', 'water', 'sidewalk', 'vegetation', 'other'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter('category', cat)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        filters.category.includes(cat)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border hover:border-primary'
                      }`}
                    >
                      {categoryLabels[cat as IssueCategory]}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-xs mb-2">Status</h3>
              <div className="flex flex-wrap gap-1">
                {['reported', 'acknowledged', 'in-progress', 'resolved'].map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleFilter('status', status)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      filters.status.includes(status)
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border hover:border-accent'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-xs mb-2">Severity</h3>
              <div className="flex flex-wrap gap-1">
                {['low', 'medium', 'high', 'critical'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => toggleFilter('severity', sev)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      filters.severity.includes(sev)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-card border border-border hover:border-secondary'
                    }`}
                  >
                    {sev.charAt(0).toUpperCase() + sev.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Map Container - Takes full remaining height */}
      <div className="flex-1 flex overflow-hidden gap-0">
        {/* Map area - Full height, scrollable */}
        <div className="flex-1 relative bg-background overflow-auto">
          {isClient && <MapComponent issues={filteredIssues} selectedIssue={selectedIssue} onSelectIssue={setSelectedIssue} />}
          
          {/* Footer visible on scroll - Inside scrollable container */}
          <Footer />
        </div>

        {/* Side Info Panel - Fixed height, scrollable content */}
        <div className="hidden lg:flex w-96 bg-card border-l border-border flex-col flex-shrink-0">
          {selectedIssueData ? (
            <div className="flex flex-col h-full">
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0">
                <h2 className="font-semibold text-foreground text-sm">Issue Details</h2>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                  title="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {selectedIssueData.imageUrl && (
                  <img
                    src={selectedIssueData.imageUrl}
                    alt="Issue"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="text-base font-bold text-foreground">{selectedIssueData.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{selectedIssueData.description}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Category</p>
                    <p className="font-semibold text-foreground text-xs mt-1">
                      {categoryLabels[selectedIssueData.category]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Status</p>
                    <p className="font-semibold text-foreground text-xs mt-1 capitalize">{selectedIssueData.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Severity</p>
                    <p className="font-semibold text-foreground text-xs mt-1 capitalize">{selectedIssueData.severity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Verifications</p>
                    <p className="font-semibold text-foreground text-xs mt-1">{selectedIssueData.verifications}</p>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="space-y-1 p-2 bg-primary/10 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground">Reported by</p>
                  <p className="font-semibold text-foreground text-sm">{selectedIssueData.reportedBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedIssueData.reportedAt.toLocaleDateString()}
                  </p>
                </div>

                {/* Assignment Info */}
                {selectedIssueData.assignedTo ? (
                  <div className="space-y-1 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-xs font-medium text-muted-foreground">Assigned to</p>
                    <p className="font-semibold text-foreground text-sm">{selectedIssueData.assignedTo}</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-xs font-medium text-muted-foreground">Status</p>
                    <p className="font-semibold text-foreground text-sm">Awaiting assignment</p>
                  </div>
                )}

                {/* Resolution Date */}
                {selectedIssueData.resolutionDate && (
                  <div className="space-y-1 p-2 bg-accent/10 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground">Resolved on</p>
                    <p className="font-semibold text-foreground text-sm">
                      {selectedIssueData.resolutionDate.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 text-center">
              <div>
                <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-40" />
                <p className="text-muted-foreground font-medium text-sm">Click a marker</p>
                <p className="text-xs text-muted-foreground mt-1">to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
