'use client';

import React from 'react';
import Link from 'next/link';
import Wrapper from '@/components/Wrapper';
import HeroSection from '@/components/HeroSection';
import { useAuth } from '@/context/AuthContext';
import {
  LogIn,
  ShoppingBag,
  Users,
  Code2,
  Layers,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  Database,
} from 'lucide-react';

/**
 * Main Home Overview Page
 * 
 * Introduces the learning goals and architecture:
 * 1. Modular Components (Header, Footer, HeroSection, ProductCard, Wrapper)
 * 2. Parent-Child data flow with Props
 * 3. Asynchronous Operations (async/await + useEffect) with real DummyJSON APIs
 * 4. Direct navigation to Page 1 (Login), Page 2 (Products), Page 3 (Profile)
 */
export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  const learningPillars = [
    {
      title: 'Modular Components',
      desc: 'Header, Footer, HeroSection, ProductCard, and a generic Wrapper using children prop for reusable encapsulation.',
      icon: Layers,
      color: '#6366f1',
    },
    {
      title: 'Parent-Child Props Flow',
      desc: 'Passing typed product and user objects down to child components, with event callbacks flowing back up.',
      icon: Code2,
      color: '#06b6d4',
    },
    {
      title: 'Async/Await Operations',
      desc: 'Clean asynchronous useEffect data fetching against real public DummyJSON endpoints without UI freezing.',
      icon: Database,
      color: '#10b981',
    },
  ];

  const appPages = [
    {
      pageNumber: 'Page 1',
      title: 'Authentication & Login',
      desc: 'POST https://dummyjson.com/auth/login. Handles async form submission, stores tokens in context and localStorage, and redirects.',
      href: '/login',
      cta: 'Open Login Page',
      icon: LogIn,
      badge: 'POST API',
    },
    {
      pageNumber: 'Page 2',
      title: 'Products Dashboard',
      desc: 'GET https://dummyjson.com/products. Fetches catalog asynchronously, dynamic search & filtering, rendered using reusable ProductCard components.',
      href: '/products',
      cta: 'Explore Products',
      icon: ShoppingBag,
      badge: 'GET API',
    },
    {
      pageNumber: 'Page 3',
      title: 'User Profiles & Directory',
      desc: 'GET https://dummyjson.com/users. Displays authenticated session or selected user details alongside interactive UserCard items.',
      href: '/profile',
      cta: 'View Profiles',
      icon: Users,
      badge: 'GET API',
    },
  ];

  return (
    <div>
      {/* 1. Reusable HeroSection Component */}
      <HeroSection
        badge="Next.js • Modular Component Architecture"
        title="Frontend Learning"
        highlight="Application"
        description="A clean, modular 3-page web application built in Next.js using real public APIs from DummyJSON. Built with parent-to-child props, asynchronous data fetching, and reusable UI components."
        primaryCta={{ label: 'Explore Products (Page 2)', href: '/products', icon: ShoppingBag }}
        secondaryCta={{ label: 'Sign In (Page 1)', href: '/login', icon: LogIn }}
        stats={[
          { label: 'Modular Components', value: '7 Reusable' },
          { label: 'Public APIs', value: '3 Endpoints' },
          { label: 'Active Session', value: isAuthenticated ? `@${user?.username}` : 'Guest' },
        ]}
      />

      {/* 2. Generic Wrapper Container Component */}
      <Wrapper size="lg">
        {/* Core Learning Pillars */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="brand-badge">Architecture Blueprint</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
              Key Concepts Demonstrated
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Explore how modern React architecture organizes logic, manages state, and renders dynamic API feeds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {learningPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    backdropFilter: 'blur(12px)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: `${pillar.color}22`,
                      color: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      border: `1px solid ${pillar.color}44`,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3 Pages Grid */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="brand-badge">Application Pages</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
              3 Complete Functional Views
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Each page addresses the requirements with clean source code and live DummyJSON data.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {appPages.map((page, idx) => {
              const Icon = page.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#a5b4fc',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {page.pageNumber}
                      </span>
                      <span className="brand-badge">{page.badge}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div
                        style={{
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(99, 102, 241, 0.15)',
                          color: '#a5b4fc',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{page.title}</h3>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {page.desc}
                    </p>
                  </div>

                  <Link href={page.href} className="btn-primary" style={{ justifyContent: 'center' }}>
                    <span>{page.cta}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </Wrapper>
    </div>
  );
}
