import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * HeroSection Component
 * 
 * Reusable hero showcase component displaying titles, badges,
 * dynamic statistics, and customizable action triggers passed via props.
 * 
 * @param {string} badge - Eyebrow label text
 * @param {string} title - Main headline title
 * @param {string} highlight - Colored highlight text within the title
 * @param {string} description - Descriptive summary paragraph
 * @param {object} primaryCta - { label, href, icon }
 * @param {object} secondaryCta - { label, href, icon }
 * @param {Array} stats - Array of stat items: [{ label, value, icon }]
 */
export default function HeroSection({
  badge = 'Next.js 15 + DummyJSON',
  title = 'Modular Frontend',
  highlight = 'Architecture',
  description = 'Clean React application demonstrating real-world API integration, modular child components, prop data flow, and asynchronous state handling.',
  primaryCta = { label: 'Explore Products', href: '/products' },
  secondaryCta = { label: 'View Profiles', href: '/profile' },
  stats = [],
}) {
  return (
    <section className="hero-section">
      <div className="hero-glow-blob-1"></div>
      <div className="hero-glow-blob-2"></div>

      <div className="hero-content">
        {badge && (
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="hero-heading">
          {title} <span className="gradient-text">{highlight}</span>
        </h1>

        <p className="hero-description">{description}</p>

        <div className="hero-actions">
          {primaryCta && (
            <Link href={primaryCta.href} className="btn-primary">
              <span>{primaryCta.label}</span>
              {primaryCta.icon ? (
                <primaryCta.icon size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </Link>
          )}

          {secondaryCta && (
            <Link href={secondaryCta.href} className="btn-secondary">
              <span>{secondaryCta.label}</span>
              {secondaryCta.icon && <secondaryCta.icon size={18} />}
            </Link>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div className="hero-stats-row">
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
