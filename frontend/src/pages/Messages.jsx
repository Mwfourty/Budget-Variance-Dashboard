import { useEffect, useState } from 'react';
import { Check, MessageSquare, Send, X } from 'lucide-react';
import axiosClient from '../api/axiosClient.js';
import StatusPill from '../components/ui/StatusPill.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function MessageCard({ message, isAdmin, onDecide }) {
  const [reason, setReason] = useState('');
  const [decision, setDecision] = useState('');
  const [error, setError] = useState('');

  const handleDecision = async (status) => {
    if (!reason.trim()) {
      setError('Add a reason before responding.');
      return;
    }
    setError('');
    await onDecide(message.id, status, reason);
    setDecision('');
    setReason('');
  };

  return (
    <article className="border-b border-graphite-200 py-5 first:pt-0 last:border-b-0 dark:border-graphite-600">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold text-graphite-900 dark:text-white">
            {message.subject}
          </h2>
          <p className="mt-1 text-xs text-graphite-500 dark:text-graphite-300">
            {isAdmin ? `From ${message.sender} · ` : ''}{formatDate(message.createdAt)}
          </p>
        </div>
        <StatusPill status={message.status} />
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-graphite-700 dark:text-graphite-200">
        {message.content}
      </p>

      {message.adminReason && (
        <div className="mt-4 rounded-xl bg-graphite-100/80 px-4 py-3 dark:bg-graphite-800/90">
          <p className="text-xs font-medium uppercase tracking-wide text-graphite-500 dark:text-graphite-400">
            Admin response{message.reviewer ? ` · ${message.reviewer}` : ''}
          </p>
          <p className="mt-1 text-sm leading-6 text-graphite-700 dark:text-graphite-200">{message.adminReason}</p>
        </div>
      )}

      {isAdmin && message.status === 'open' && (
        <div className="mt-5 flex flex-col gap-3">
          <textarea
            value={decision === message.id ? reason : ''}
            onChange={(event) => {
              setDecision(message.id);
              setReason(event.target.value);
            }}
            placeholder="Explain the approval or rejection"
            rows={2}
            className="w-full resize-y rounded-xl border-0 bg-graphite-50 px-4 py-3 text-sm text-graphite-800 outline-none
                       ring-1 ring-graphite-200 placeholder:text-graphite-400 focus:ring-2 focus:ring-ember-400 dark:bg-graphite-900 dark:text-white dark:placeholder:text-graphite-400 dark:ring-graphite-600"
          />
          {error && <p className="text-sm text-negative">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleDecision('approved')}
              className="inline-flex items-center gap-2 rounded-full bg-positive px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <Check className="h-4 w-4" strokeWidth={1.75} />
              Approve request
            </button>
            <button
              type="button"
              onClick={() => handleDecision('rejected')}
              className="inline-flex items-center gap-2 rounded-full bg-negative px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
              Reject request
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Messages() {
  const { user, isAdmin } = useAuth();
  const username = user?.email;
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ subject: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchMessages() {
      try {
        const { data } = await axiosClient.get('/messages', {
          params: { username, admin: isAdmin }
        });
        if (!cancelled) {
          setMessages(data);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.response?.data?.message || 'Could not load messages.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMessages();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await axiosClient.post('/messages', {
        senderUsername: username,
        ...form
      });
      setMessages((previous) => [data, ...previous]);
      setForm({ subject: '', content: '' });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not send this request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecision = async (id, status, reason) => {
    try {
      const { data } = await axiosClient.patch(`/messages/${id}`, {
        reviewerUsername: username,
        status,
        reason
      });
      setMessages((previous) => previous.map((message) => (message.id === id ? data : message)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not respond to this request.');
      throw requestError;
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ember-500/15 text-ember-500">
          <MessageSquare className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ember-600 dark:text-ember-400">
            {isAdmin ? 'Review centre' : 'Finance desk'}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-graphite-900 dark:text-white">
            {isAdmin ? 'Approval requests' : 'Requests and responses'}
          </h1>
          <p className="mt-2 text-sm text-graphite-500 dark:text-graphite-400">
            {isAdmin ? 'Review requests and give a clear decision with context.' : 'Send a request to the finance administrator and track the response.'}
          </p>
        </div>
      </div>

      {!isAdmin && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-graphite-200/70 bg-graphite-100/80 p-5 dark:border-graphite-700 dark:bg-graphite-800/90">
          <h2 className="font-display text-base font-semibold text-graphite-900 dark:text-white">New request</h2>
          <div className="mt-4 flex flex-col gap-3">
            <input
              required
              value={form.subject}
              onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
              placeholder="Subject"
              className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-graphite-800 outline-none ring-1 ring-graphite-200 placeholder:text-graphite-400 focus:ring-2 focus:ring-ember-400 dark:bg-graphite-900 dark:text-white dark:placeholder:text-graphite-400 dark:ring-graphite-600"
            />
            <textarea
              required
              value={form.content}
              onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
              placeholder="Describe what you need reviewed"
              rows={4}
              className="resize-y rounded-xl border-0 bg-white px-4 py-3 text-sm text-graphite-800 outline-none ring-1 ring-graphite-200 placeholder:text-graphite-400 focus:ring-2 focus:ring-ember-400 dark:bg-graphite-900 dark:text-white dark:placeholder:text-graphite-400 dark:ring-graphite-600"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-graphite-400">Your request will be saved for review.</span>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-ember-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
                {submitting ? 'Sending...' : 'Send request'}
              </button>
            </div>
          </div>
        </form>
      )}

      {error && <p role="alert" className="mb-4 text-sm text-negative">{error}</p>}
      <div className="rounded-2xl border border-graphite-200 bg-white/70 p-5 dark:border-graphite-600 dark:bg-oled-panel/90">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-graphite-900 dark:text-white">
            {isAdmin ? 'Incoming requests' : 'Your requests'}
          </h2>
          <span className="text-xs text-graphite-500 dark:text-graphite-300">{messages.length} total</span>
        </div>
        {loading ? (
          <p className="py-8 text-center text-sm text-graphite-400">Loading requests...</p>
        ) : messages.length === 0 ? (
          <p className="py-8 text-center text-sm text-graphite-400">
            {isAdmin ? 'No requests are waiting for review.' : 'Your requests and admin responses will appear here.'}
          </p>
        ) : (
          messages.map((message) => (
            <MessageCard key={message.id} message={message} isAdmin={isAdmin} onDecide={handleDecision} />
          ))
        )}
      </div>
    </div>
  );
}
