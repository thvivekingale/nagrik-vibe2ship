'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, Home, Map, FileText, BarChart3, Users } from 'lucide-react';
import Image from 'next/image';

interface NavTab {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const tabs: NavTab[] = [
    { name: 'Map', href: '/map', icon: <Map className="w-4 h-4" /> },
    { name: 'Report', href: '/report', icon: <FileText className="w-4 h-4" /> },
    { name: 'Dashboard', href: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Community', href: '/leaderboard', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
      {/* Top bar with logo and navigation buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Nagrik Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-foreground">Nagrik</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-all"
              title="Go to home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
        </div>
      </div>

      {/* Section tabs */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-foreground hover:text-primary hover:bg-muted/50'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
