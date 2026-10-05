'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/lib/api';
import Wrapper from '@/components/Wrapper';
import StatusBanner from '@/components/StatusBanner';
import { Lock, User, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Page 1: Login Page
 * 
 * Demonstrates:
 * 1. Asynchronous API call to POST https://dummyjson.com/auth/login using async/await
 * 2. Form state management with useState
 * 3. Saving auth token & user state in AuthContext & localStorage
 * 4. Error and loading states without freezing the UI
 * 5. Programmatic navigation to the Products Dashboard on success
 */
export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspassword');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle asynchronous login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // 1. Asynchronous call to DummyJSON auth API
      const authData = await loginUser(username, password);

      // 2. Save user and token into context (and localStorage)
      login(authData, authData.token || authData.accessToken);
      setSuccessMessage(`Welcome back, ${authData.firstName || authData.username}! Navigating to Products...`);

      // 3. Navigate to Page 2 (Products Dashboard) after brief feedback
      setTimeout(() => {
        router.push('/products');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to quickly fill working DummyJSON demo credentials
  const fillCredentials = (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <Wrapper size="sm" className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-circle">
            <LogIn size={28} />
          </div>
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">
            Authenticate against real DummyJSON Auth API endpoint
          </p>
        </div>

        {isAuthenticated && user && (
          <div style={{ marginBottom: '1.5rem' }}>
            <StatusBanner
              type="info"
              title={`Already Signed In as @${user.username}`}
              message="You can proceed directly to the Products Dashboard or sign in as a different user."
            />
          </div>
        )}

        {errorMessage && (
          <StatusBanner
            type="error"
            title="Authentication Error"
            message={errorMessage}
          />
        )}

        {successMessage && (
          <div className="status-banner info" style={{ borderColor: 'var(--accent-emerald)', color: '#a7f3d0' }}>
            <CheckCircle2 size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
            <div className="status-text-block">
              <p className="status-title">{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon-left" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter dummyjson username"
                required
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon-left" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-login-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In with DummyJSON</span>
              </>
            )}
          </button>
        </form>

        {/* Learning Quick-Fill Demo Box */}
        <div className="demo-credentials-box">
          <div className="demo-header">
            <span>✨ Test Credentials (DummyJSON)</span>
            <button
              type="button"
              onClick={() => fillCredentials('emilys', 'emilyspassword')}
              className="demo-btn-fill"
            >
              Fill Emily
            </button>
          </div>
          <div className="demo-fields">
            <p>Username: <code className="demo-code">emilys</code></p>
            <p>Password: <code className="demo-code">emilyspassword</code></p>
            <p style={{ marginTop: '0.4rem', fontSize: '0.75rem', opacity: 0.8 }}>
              Or use <code className="demo-code">kminchelle</code> / <code className="demo-code">0lelkeyw</code>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
