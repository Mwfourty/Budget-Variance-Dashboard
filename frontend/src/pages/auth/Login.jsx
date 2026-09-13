import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import FormField from '../../components/ui/FormField.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/OC logo.png';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      logo={logo}
      title="Sign in to your department"
      subtitle="Access budgets, variance, and approvals for your team."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="font-medium text-ember-500 hover:text-ember-600">
            Create an account
          </Link>
          <span className="mx-2 text-graphite-300 dark:text-graphite-700">·</span>
          <Link to="/admin/login" className="font-medium text-graphite-500 hover:text-graphite-700 dark:hover:text-graphite-300">
            Admin sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Work email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="you@company.com"
        />
        <FormField
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={() => setNotice('Please contact your finance administrator to reset your password.')}
          className="self-end text-xs font-medium text-ember-500 hover:text-ember-600"
        >
          Forgot password?
        </button>

        {error && <p className="text-sm text-negative">{error}</p>}
        {notice && <p role="status" className="text-sm text-graphite-500 dark:text-graphite-400">{notice}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-ember-500 px-5 py-3 text-sm font-medium text-white transition-colors
                     hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
}
