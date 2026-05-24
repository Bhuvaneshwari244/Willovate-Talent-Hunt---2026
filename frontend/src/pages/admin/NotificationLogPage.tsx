import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Mail, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface NotificationLog {
  id: number;
  bookingId: number;
  bookingReference: string;
  customerName: string;
  channel: string;
  recipient: string;
  subject: string;
  body: string;
  status: string;
  sentAt: string;
}

export default function NotificationLogPage() {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | 'Email' | 'SMS'>('All');

  useEffect(() => {
    api.get<NotificationLog[]>('/notifications')
      .then(r => setLogs(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? logs : logs.filter(l => l.channel === filter);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notification Log</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Mock email &amp; SMS confirmations sent to customers
          </p>
        </div>
        <div className="flex gap-2">
          {(['All', 'Email', 'SMS'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 card">
          <p className="text-gray-500">No notifications yet. They appear after customers book.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(log => (
            <div key={log.id} className="card p-0 overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {log.channel === 'Email'
                    ? <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"><Mail className="w-5 h-5 text-blue-600" /></div>
                    : <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg"><Smartphone className="w-5 h-5 text-green-600" /></div>}
                  <div>
                    <p className="font-semibold text-sm">{log.customerName}</p>
                    <p className="text-xs text-gray-500">{log.channel} → {log.recipient}</p>
                    <p className="text-xs text-gray-400 truncate max-w-sm mt-0.5">{log.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-mono text-primary-600">{log.bookingReference}</p>
                    <p className="text-xs text-gray-400">{format(new Date(log.sentAt), 'MMM dd, HH:mm')}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                    {log.status}
                  </span>
                  {expandedId === log.id
                    ? <ChevronUp className="w-4 h-4 text-gray-400" />
                    : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>
              {expandedId === log.id && (
                <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-700">
                  <pre className="mt-4 text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-lg leading-relaxed">
                    {log.body}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
