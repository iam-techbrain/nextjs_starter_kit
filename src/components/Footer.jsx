import React from 'react';
import Link from 'next/link';
import Wrapper from './Wrapper';
import { Sparkles, ExternalLink, Code2, Layers, Cpu } from 'lucide-react';

/**
 * Footer Component
 * 
 * Reusable footer displaying learning architecture badges, API credits,
 * and quick navigation links.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <Wrapper size="lg">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo-inline">
              <Sparkles size={20} className="logo-sparkle" />
              <span className="brand-title">NextAcademy</span>
            </div>
            <p className="footer-desc">
              A clean, modular Next.js application demonstrating production-ready
              component architecture, parent-to-child prop drilling, and asynchronous
              data fetching with DummyJSON public APIs.
            </p>
            <div className="tech-pills">
              <span className="tech-pill"><Code2 size={12} /> React 19</span>
              <span className="tech-pill"><Layers size={12} /> Next.js App Router</span>
              <span className="tech-pill"><Cpu size={12} /> Async / Await</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Pages & Views</h4>
            <ul className="footer-links">
              <li><Link href="/">Home & Overview</Link></li>
              <li><Link href="/login">Page 1: Auth Login</Link></li>
              <li><Link href="/products">Page 2: Products Dashboard</Link></li>
              <li><Link href="/profile">Page 3: User Profiles</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Learning Concepts</h4>
            <ul className="footer-links">
              <li><span>• Modular Components</span></li>
              <li><span>• Generic Children Wrapper</span></li>
              <li><span>• Parent-Child Prop Passing</span></li>
              <li><span>• Async useEffect Fetching</span></li>
              <li><span>• LocalStorage State Sync</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">External APIs</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://dummyjson.com/docs/auth"
                  target="_blank"
                  rel="noreferrer"
                  className="external-link"
                >
                  POST /auth/login <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://dummyjson.com/docs/products"
                  target="_blank"
                  rel="noreferrer"
                  className="external-link"
                >
                  GET /products <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://dummyjson.com/docs/users"
                  target="_blank"
                  rel="noreferrer"
                  className="external-link"
                >
                  GET /users <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NextAcademy. Clean Modular Next.js Starter Kit.</p>
          <p className="footer-status-pill">
            <span className="status-dot"></span> Live Public DummyJSON Integration
          </p>
        </div>
      </Wrapper>
    </footer>
  );
}
