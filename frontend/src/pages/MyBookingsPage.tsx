import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { Search, ArrowLeft, Calendar, Clock, Hash, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'reference' | 'phone'>('reference');
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(false);
    try {
      const results = await bookingService.lookup(searchType, query.trim());
      setBookings(results);
      setSearched(true);
      if (results.length === 0) {
        toast.error('No bookings found');
      }
    } catch {
      toast.error('Failed to search bookings');
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center text-primary-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Offers
          </button>
          <h1 className="text-xl font-bold">My Bookings</h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Search Card */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-2">Find Your Booking</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enter your booking reference or phone number to retrieve your booking details.
          </p>

          {/* Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => { setSearchType('reference'); setQuery(''); setBookings([]); setSearched(false); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                searchType === 'reference'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Booking Reference
            </button>
            <button
              type="button"
              onClick={() => { setSearchType('phone'); setQuery(''); setBookings([]); setSearched(false); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                searchType === 'phone'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Phone Number
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type={searchType === 'phone' ? 'tel' : 'text'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchType === 'reference' ? 'e.g. BK20260524123456789' : 'e.g. 9876543210'}
              className="input-field flex-1"
              required
            />
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 px-6">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && bookings.length === 0 && (
          <div className="text-center py-12 card">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">No bookings found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Check your {searchType === 'reference' ? 'booking reference' : 'phone number'} and try again.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="card">
              {/* Booking Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="font-mono font-bold text-primary-600">{booking.bookingReference}</span>
                  </div>
                  <h3 className="text-lg font-bold">{booking.offerTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{booking.businessName}</p>
                </div>
                <div className="flex items-center gap-2">
                  {statusIcon(booking.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Slot Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-sm">{format(new Date(booking.slotDate), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium text-sm">{booking.startTime} – {booking.endTime}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-medium text-gray-900 dark:text-gray-100">{booking.customerName}</span>
                {' · '}{booking.customerPhone}
                {booking.customerEmail && <>{' · '}{booking.customerEmail}</>}
                {' · '}{booking.peopleCount} {booking.peopleCount === 1 ? 'person' : 'people'}
              </div>

              {/* QR Code — always shown */}
              <div className="mt-4 flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Show this at the venue</p>
                <div className="p-4 bg-white rounded-xl shadow">
                  <QRCodeSVG value={booking.bookingReference} size={160} level="H" />
                </div>
                <p className="font-mono text-sm font-bold">{booking.bookingReference}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Booked an offer?{' '}
          <Link to="/" className="text-primary-600 hover:underline">Browse more offers</Link>
        </p>
      </div>
    </div>
  );
}
