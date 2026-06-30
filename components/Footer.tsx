'use client';

import Link from 'next/link';
import { Mail, Share2, Code2, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About Nagrik</h3>
            <p className="text-sm text-muted-foreground">
              Empowering communities through civic participation and transparent infrastructure reporting. Built to make cities better, one report at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Authority Dashboard
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <Link
                href="mailto:thevivekingale@gmail.com"
                title="Email"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/vivekingale01"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              >
                <Share2 className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/thvivekingale"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              >
                <Code2 className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/thVivekingale"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              >
                <MessageSquare className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Instagram: @vivekingale01
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {currentYear} Nagrik. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Created by Vivek Ingle</p>
            <p>Email: <a href="mailto:thevivekingale@gmail.com" className="hover:text-primary transition-colors">thevivekingale@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/vivekingale01" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">linkedin.com/in/vivekingale01</a></p>
            <p>GitHub: <a href="https://github.com/thvivekingale" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github.com/thvivekingale</a></p>
            <p>X (Twitter): <a href="https://twitter.com/thVivekingale" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@thVivekingale</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
