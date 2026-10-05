'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, Users, LogIn, LogOut, Sparkles, UserCircle } from 'lucide-react';
import Wrapper from './Wrapper';

/**
 * Header Component
 * 
 * Reusable top navigation bar displaying branding, navigation links,
 * and dynamic authentication status using AuthContext.
 */
export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Products', href: '/products', icon: ShoppingBag },
    { label: 'Users & Profiles', href: '/profile', icon: Users },
  ];

  return (
    <header className="app-header">
      <Wrapper size="lg" className="header-wrapper">
        <Link href="/" className="header-brand">
          <div className="brand-logo-icon">
            <Sparkles size={22} className="logo-sparkle" />
          </div>
          <div className="brand-text">
            <span className="brand-title">NextAcademy</span>
            <span className="brand-badge">DummyJSON</span>
          </div>
        </Link>

        <nav className="header-nav">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          {isAuthenticated && user ? (
            <div className="auth-profile-badge">
              <Link href="/profile" className="user-pill" title="View Profile">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.firstName || 'User'}
                    className="avatar-small"
                  />
                ) : (
                  <UserCircle size={24} />
                )}
                <span className="user-name-label">
                  {user.firstName ? `${user.firstName}` : user.username}
                </span>
              </Link>
              <button
                onClick={logout}
                className="btn-icon-logout"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`btn-header-login ${pathname === '/login' ? 'active' : ''}`}
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </Wrapper>
    </header>
  );
}
