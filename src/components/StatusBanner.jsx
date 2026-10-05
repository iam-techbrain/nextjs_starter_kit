'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Loader2, Info } from 'lucide-react';

/**
 * StatusBanner Component
 * 
 * Reusable banner for async operations:
 * - Loading state (with animation)
 * - Error state (with retry action callback)
 * - Empty state (when data collection is zero)
 * 
 * @param {'loading' | 'error' | 'empty' | 'info'} type - Banner style type
 * @param {string} message - Message text
 * @param {function} onRetry - Optional retry callback function
 */
export default function StatusBanner({
  type = 'info',
  title,
  message,
  onRetry,
}) {
  if (type === 'loading') {
    return (
      <div className="status-banner loading">
        <Loader2 size={24} className="spinner-icon" />
        <div className="status-text-block">
          <p className="status-title">{title || 'Loading data asynchronously...'}</p>
          {message && <p className="status-desc">{message}</p>}
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="status-banner error">
        <AlertCircle size={24} className="status-icon-error" />
        <div className="status-text-block">
          <p className="status-title">{title || 'Something went wrong'}</p>
          <p className="status-desc">{message || 'Unable to fetch data from DummyJSON.'}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry} className="btn-retry">
            <RefreshCw size={14} /> Retry
          </button>
        )}
      </div>
    );
  }

  if (type === 'empty') {
    return (
      <div className="status-banner empty">
        <Info size={24} className="status-icon-info" />
        <div className="status-text-block">
          <p className="status-title">{title || 'No results found'}</p>
          <p className="status-desc">{message || 'Try adjusting your filters or search terms.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-banner info">
      <Info size={20} />
      <div className="status-text-block">
        {title && <p className="status-title">{title}</p>}
        <p className="status-desc">{message}</p>
      </div>
    </div>
  );
}
