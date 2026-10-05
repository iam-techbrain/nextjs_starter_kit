'use client';

import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import HeroSection from '@/components/HeroSection';
import UserCard from '@/components/UserCard';
import StatusBanner from '@/components/StatusBanner';
import { fetchUsers } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  UserCheck,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  ShieldCheck,
  KeyRound,
  LogOut,
  Users as UsersIcon,
} from 'lucide-react';

/**
 * Page 3: User Profile / Details Page
 * 
 * Demonstrates:
 * 1. Asynchronous GET fetch from https://dummyjson.com/users
 * 2. Combining AuthContext current user state with fetched user directory
 * 3. Parent-to-Child prop passing to <UserCard user={...} onSelect={...} />
 * 4. Interactive user selection updating detailed profile inspector
 */
export default function ProfilePage() {
  const { user: authUser, isAuthenticated, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch users asynchronously from DummyJSON
  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await fetchUsers(12);
      const userList = data.users || [];
      setUsers(userList);

      // Default the selected user to authUser or first fetched user
      if (authUser) {
        setSelectedUser(authUser);
      } else if (userList.length > 0) {
        setSelectedUser(userList[0]);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to fetch user profiles.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Update selected profile when authUser changes
  useEffect(() => {
    if (authUser) {
      setSelectedUser(authUser);
    }
  }, [authUser]);

  const activeUser = selectedUser || authUser || (users.length > 0 ? users[0] : null);

  return (
    <div>
      <HeroSection
        badge="Page 3 • Public DummyJSON Users API"
        title="User Profiles &"
        highlight="Directory"
        description="Fetch user entities asynchronously from https://dummyjson.com/users and pass detailed records down to reusable child cards via props."
        primaryCta={null}
        secondaryCta={null}
        stats={[
          { label: 'Directory Users', value: users.length },
          { label: 'Auth Status', value: isAuthenticated ? 'Signed In' : 'Guest' },
          { label: 'Inspecting User ID', value: activeUser ? `#${activeUser.id}` : 'None' },
        ]}
      />

      <Wrapper size="lg">
        {/* Loading State */}
        {isLoading && (
          <StatusBanner
            type="loading"
            title="Loading users from DummyJSON..."
            message="Executing async GET request to https://dummyjson.com/users."
          />
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <StatusBanner
            type="error"
            title="Error Fetching Users"
            message={errorMessage}
            onRetry={loadUsers}
          />
        )}

        {!isLoading && !errorMessage && (
          <div className="profile-layout">
            {/* Left Column: Active User Detail Card */}
            <aside>
              {activeUser ? (
                <div className="current-user-card">
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={activeUser.image || 'https://dummyjson.com/icon/default/128'}
                      alt={activeUser.firstName || 'Profile'}
                      className="profile-avatar-big"
                    />
                    <h2 className="profile-name-big">
                      {activeUser.firstName} {activeUser.lastName}
                    </h2>
                    <p className="profile-username-tag">@{activeUser.username}</p>
                    
                    {isAuthenticated && authUser && authUser.id === activeUser.id && (
                      <span
                        className="brand-badge"
                        style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.4)', marginTop: '0.5rem' }}
                      >
                        <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
                        Currently Logged In User
                      </span>
                    )}
                  </div>

                  <div className="profile-bio-box">
                    <p>
                      <strong>Bio / Role:</strong>{' '}
                      {activeUser.company?.title || activeUser.role || 'Member'} at{' '}
                      {activeUser.company?.name || 'DummyJSON Network'}
                    </p>
                  </div>

                  <div className="profile-spec-list">
                    <div className="spec-item">
                      <span className="spec-key"><Mail size={14} style={{ display: 'inline', marginRight: 6 }} />Email</span>
                      <span className="spec-val" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {activeUser.email}
                      </span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-key"><Phone size={14} style={{ display: 'inline', marginRight: 6 }} />Phone</span>
                      <span className="spec-val">{activeUser.phone || 'N/A'}</span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-key"><Calendar size={14} style={{ display: 'inline', marginRight: 6 }} />Age & Gender</span>
                      <span className="spec-val">{activeUser.age || 28} yrs • {activeUser.gender || 'N/A'}</span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-key"><Briefcase size={14} style={{ display: 'inline', marginRight: 6 }} />Department</span>
                      <span className="spec-val">{activeUser.company?.department || 'Engineering'}</span>
                    </div>

                    <div className="spec-item">
                      <span className="spec-key"><MapPin size={14} style={{ display: 'inline', marginRight: 6 }} />Location</span>
                      <span className="spec-val">
                        {activeUser.address?.city || 'New York'}, {activeUser.address?.country || 'USA'}
                      </span>
                    </div>
                  </div>

                  {isAuthenticated && authUser && authUser.id === activeUser.id && (
                    <button
                      onClick={logout}
                      className="btn-retry"
                      style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center', padding: '0.65rem' }}
                    >
                      <LogOut size={16} /> Sign Out Session
                    </button>
                  )}
                </div>
              ) : (
                <div className="current-user-card">
                  <p>No user selected.</p>
                </div>
              )}
            </aside>

            {/* Right Column: User Directory List via UserCard Child Components */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UsersIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  Directory Records ({users.length})
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Click any card to inspect props in action
                </span>
              </div>

              <div className="users-grid">
                {users.map((item) => (
                  <UserCard
                    key={item.id}
                    user={item}
                    isSelected={activeUser?.id === item.id}
                    onSelect={(clickedUser) => setSelectedUser(clickedUser)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
