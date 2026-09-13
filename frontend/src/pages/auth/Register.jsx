import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import FormField from '../../components/ui/FormField.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/OC logo.png';

const DEPARTMENTS = [
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Operations',
  'Sales',
  'Customer Support',
  'Security'
];

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { label: 'One uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { label: 'One lowercase letter', test: (value) => /[a-z]/.test(value) },
  { label: 'One number', test: (value) => /\d/.test(value) },
  { label: 'One special character', test: (value) => /[^A-Za-z0-9]/.test(value) }
];

const PASSWORD_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}';

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', department: '', password: '' });
  const [error, setError] = useState('');
  const passwordIsValid = PASSWORD_RULES.every(({ test }) => test(form.password));

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!passwordIsValid) return;
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      logo={logo}
      title="Create your account"
      subtitle="Set up access for your department's budget tracking."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-ember-500 hover:text-ember-600">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Full name"
          required
          value={form.name}
          onChange={handleChange('name')}
          placeholder="Thandi Nkosi"
        />
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
          label="Department"
          required
          list="register-department-options"
          value={form.department}
          onChange={handleChange('department')}
          placeholder="Type or select a department"
        />
        <datalist id="register-department-options">
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department} />
          ))}
        </datalist>
        <FormField
          label="Password"
          type="password"
          required
          minLength={8}
          pattern={PASSWORD_PATTERN}
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="Create a strong password"
        />
        <ul className="-mt-2 grid gap-1 text-xs text-graphite-500 dark:text-graphite-400" aria-label="Password requirements">
          {PASSWORD_RULES.map(({ label, test }) => {
            const passes = test(form.password);
            return (
              <li key={label} className={passes ? 'text-positive' : ''}>
                <span aria-hidden="true" className="mr-2 inline-block w-3 text-center">
                  {passes ? '✓' : '•'}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        {error && <p className="text-sm text-negative">{error}</p>}

        <button
          type="submit"
          disabled={loading || !passwordIsValid}
          className="mt-2 rounded-full bg-ember-500 px-5 py-3 text-sm font-medium text-white transition-colors
                     hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}
