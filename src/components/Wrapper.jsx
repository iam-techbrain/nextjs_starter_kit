import React from 'react';

/**
 * Generic Wrapper Component
 * 
 * Demonstrates the composition pattern in React using the `children` prop.
 * Used to wrap page contents in a consistent max-width container with responsive padding.
 * 
 * @param {React.ReactNode} children - Nested JSX elements passed to this container
 * @param {string} size - Container max-width variant ('sm' | 'md' | 'lg' | 'full')
 * @param {string} className - Optional additional CSS class names
 */
export default function Wrapper({
  children,
  size = 'lg',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'wrapper-sm',
    md: 'wrapper-md',
    lg: 'wrapper-lg',
    full: 'wrapper-full',
  };

  return (
    <div
      className={`app-wrapper ${sizeClasses[size] || 'wrapper-lg'} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
