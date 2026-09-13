import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import FormField from '../../components/ui/FormField.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { loginAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', adminCode: '' });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginAdmin(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      eyebrow="Ledger · Administration"
      title="Administrative sign-in"
      subtitle="Restricted to finance administrators with an active access code."
      footer={
        <Link to="/login" className="font-medium text-graphite-500 hover:text-graphite-700 dark:hover:text-graphite-300">
          Back to standard sign-in
        </Link>
      }
    >
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-graphite-900/5 px-4 py-3 dark:bg-white/5">
        <ShieldCheck className="h-5 w-5 shrink-0 text-ember-500" strokeWidth={1.75} />
        <p className="text-xs text-graphite-500 dark:text-graphite-400">
          This sign-in is isolated from department accounts and grants approval-level access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Admin username or email"
          type="text"
          required
          autoComplete="username"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="finance_admin"
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
        <FormField
          label="Access code"
          required
          value={form.adminCode}
          onChange={handleChange('adminCode')}
          placeholder="6-digit code"
        />

        {error && <p className="text-sm text-negative">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-graphite-900 px-5 py-3 text-sm font-medium text-white transition-colors
                     hover:bg-graphite-800 disabled:cursor-not-allowed disabled:opacity-60
                     dark:bg-ember-500 dark:hover:bg-ember-600"
        >
          {loading ? 'Verifying…' : 'Sign in as administrator'}
        </button>
      </form>
    </AuthLayout>
  );
}
