'use client';

import Link from 'next/link';
import { BarChart3, Users, Zap, Lightbulb } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-balance">
            Empower Your City
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Report civic infrastructure issues instantly. Watch your city transform through collective action and transparent governance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 mb-16">
          <Link
            href="/map"
            className="group relative bg-card border border-border rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 16.382V5.618a1 1 0 00-1.553-.894L15 7m0 13V7m0 13L9 10" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Explore reported issues on a live map. Filter by category, severity, and status to find what matters most.
            </p>
            <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
              View Map →
            </div>
          </Link>

          <Link
            href="/report"
            className="group relative bg-card border border-border rounded-xl p-8 hover:border-accent hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Report Issue</h3>
            <p className="text-muted-foreground mb-4">
              Snap a photo, describe the issue, and let our AI automatically categorize and submit it. Instant verification voting.
            </p>
            <div className="inline-flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
              Start Reporting →
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="group relative bg-card border border-border rounded-xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Authority Dashboard</h3>
            <p className="text-muted-foreground mb-4">
              Manage reports, assign teams, track progress, and measure impact with real-time metrics and analytics.
            </p>
            <div className="inline-flex items-center text-secondary font-medium group-hover:translate-x-2 transition-transform">
              Open Dashboard →
            </div>
          </Link>

          <Link
            href="/leaderboard"
            className="group relative bg-card border border-border rounded-xl p-8 hover:border-destructive hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1m1.364 6.364l-.707.707M12 21v1m-6.364-1.636l.707.707M3 12h1m-1.364-6.364l.707-.707M12 7a5 5 0 110 10 5 5 0 010-10z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Community Leaderboard</h3>
            <p className="text-muted-foreground mb-4">
              Earn badges for contributions. See top reporters and authorities. Build civic pride in your community.
            </p>
            <div className="inline-flex items-center text-destructive font-medium group-hover:translate-x-2 transition-transform">
              View Leaderboard →
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-card border border-border rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Why Nagrik?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">AI-Powered</h4>
              <p className="text-sm text-muted-foreground">
                Instant categorization with vision AI. Your photos become data.
              </p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 16.382V5.618a1 1 0 00-1.553-.894L15 7m0 13V7m0 13L9 10" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Location Smart</h4>
              <p className="text-sm text-muted-foreground">
                Real-time mapping. Avoid duplicates. Geo-targeted reporting.
              </p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Community Driven</h4>
              <p className="text-sm text-muted-foreground">
                Verify reports together. Gamified engagement. Trust-based system.
              </p>
            </div>
            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Data Driven</h4>
              <p className="text-sm text-muted-foreground">
                10 impact metrics. Authority accountability. Real impact tracking.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your City?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start reporting infrastructure issues now. Every report brings us closer to a better civic infrastructure.
          </p>
          <Link
            href="/report"
            className="inline-block bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
          >
            Report Your First Issue
          </Link>
        </div>
      </section>

      <div className="flex-1" />
      <Footer />
    </div>
  );
}
