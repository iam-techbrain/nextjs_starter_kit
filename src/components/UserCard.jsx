'use client';

import React from 'react';
import { Mail, Phone, MapPin, Briefcase, UserCheck } from 'lucide-react';

/**
 * UserCard Child Component
 * 
 * Demonstrates:
 * 1. Modular Child Component
 * 2. Receiving parent user object via props
 * 3. Structured display of asynchronous user API payload
 * 
 * @param {object} user - User data payload from DummyJSON
 * @param {boolean} isSelected - Whether this user is currently highlighted
 * @param {function} onSelect - Callback when clicked
 */
export default function UserCard({ user, isSelected = false, onSelect }) {
  if (!user) return null;

  const {
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    phone,
    username,
    image,
    company,
    address,
    role,
  } = user;

  const fullName = `${firstName} ${maidenName ? maidenName + ' ' : ''}${lastName}`;

  return (
    <div
      className={`user-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect && onSelect(user)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect && onSelect(user);
        }
      }}
    >
      <div className="user-card-header">
        <div className="user-avatar-wrapper">
          <img
            src={image || 'https://dummyjson.com/icon/default/128'}
            alt={fullName}
            className="user-avatar"
            loading="lazy"
          />
          <span className="user-id-badge">#{id}</span>
        </div>

        <div className="user-primary-info">
          <h3 className="user-fullname">{fullName}</h3>
          <p className="user-username">@{username}</p>
          <div className="user-tag-row">
            <span className="user-tag gender">{gender}</span>
            <span className="user-tag age">{age} yrs</span>
            {role && <span className="user-tag role">{role}</span>}
          </div>
        </div>
      </div>

      <div className="user-card-details">
        <div className="user-detail-item">
          <Mail size={14} className="detail-icon" />
          <span className="detail-text" title={email}>{email}</span>
        </div>

        <div className="user-detail-item">
          <Phone size={14} className="detail-icon" />
          <span className="detail-text">{phone}</span>
        </div>

        {company && company.name && (
          <div className="user-detail-item">
            <Briefcase size={14} className="detail-icon" />
            <span className="detail-text" title={`${company.title} at ${company.name}`}>
              {company.title} • {company.name}
            </span>
          </div>
        )}

        {address && address.city && (
          <div className="user-detail-item">
            <MapPin size={14} className="detail-icon" />
            <span className="detail-text">
              {address.city}, {address.state || address.country || 'USA'}
            </span>
          </div>
        )}
      </div>

      <div className="user-card-footer">
        <span className="user-select-hint">
          {isSelected ? (
            <>
              <UserCheck size={14} /> Selected Profile
            </>
          ) : (
            'Click to inspect full details'
          )}
        </span>
      </div>
    </div>
  );
}
