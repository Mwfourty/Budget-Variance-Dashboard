import { createContext, useContext, useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

function loadStoredUser() {
  try {
    const raw = window.localStorage.getItem('ledger-user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const persistSession = (token, userData) => {
    window.localStorage.setItem('ledger-token', token);
    window.localStorage.setItem('ledger-user', JSON.stringify(userData));
    setUser(userData);
  };

  // Standard departmental finance user login.
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      persistSession(data.token, { ...data.user, role: data.user?.role || 'USER' });
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Isolated administrative login — hits a separate endpoint so the
  // elevated-privilege path is never mixed with the standard user flow.
  const loginAdmin = useCallback(async ({ email, password, adminCode }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosClient.post('/auth/admin/login', {
        email,
        password,
        adminCode
      });
      persistSession(data.token, { ...data.user, role: 'ADMIN' });
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Admin sign-in failed.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, password, department }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosClient.post('/auth/register', {
        name,
        email,
        password,
        department
      });
      persistSession(data.token, { ...data.user, role: data.user?.role || 'USER' });
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Could not create your account.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem('ledger-token');
    window.localStorage.removeItem('ledger-user');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'ADMIN',
    loading,
    error,
    login,
    loginAdmin,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
