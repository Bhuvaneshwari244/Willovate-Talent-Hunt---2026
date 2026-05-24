import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, Hash, MessageSquare, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import api from '../services/api';

interface NotificationLog {
  id: number;
  channel: string;
  recipient: string;
  subject: string;
  body: string;
  status: string;
  sentAt: string;
}

export default function BookingConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNotif, setExpandedNotif] = useState<number | null>(null);

  useEffect(() => {
    if (id) loadBooking();
  }, [id]);

  const loadBooking = async () => {
    try {
      const data = await bookingService.getById(Number(id));
      setBooking(data);
      // Load notification logs for this booking
      const { data: notifs } = await api.get<NotificationLog[]>(`/notifications/booking/${id}`);
      setNotifications(notifs);
    } catch (error) {
      console.error('Failed to load booking');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center">Booking not found</div>;
  }

  const emailNotif = notifications.find(n => n.channel === 'Email');
  const smsNotif   = notifications.find(n => n.channel === 'SMS');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Success Header */}
        <div className="text-center">
          <div className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your booking has been successfully confirmed</p>
        </div>

        {/* Notification sent banner */}
        {notifications.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex gap-2 mt-0.5">
                {emailNotif && <Mail className="w-5 h-5 text-blue-600" />}
                {smsNotif   && <Smartphone className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                  Confirmation sent!
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-0.5">
                  {emailNotif && <>Email sent to <strong>{emailNotif.recipient}</strong></>}
                  {emailNotif && smsNotif && ' · '}
                  {smsNotif   && <>SMS sent to <strong>{smsNotif.recipient}</strong></>}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  The email contains your booking reference and a link to retrieve your booking anytime.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Card */}
        <div className="card space-y-6">
          {/* Reference */}
          <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl mb-3 shadow-lg">
              <Hash className="w-6 h-6 mr-2 text-white" />
              <span className="font-mono font-bold text-xl text-white">{booking.bookingReference}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Booking Reference — save this for your records</p>
          </div>

          {/* Offer & Business */}
          <div>
            <h2 className="text-xl font-bold mb-1">{booking.offerTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400">{booking.businessName}</p>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium">{format(new Date(booking.slotDate), 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-medium">{booking.startTime} – {booking.endTime}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span>{booking.customerName} · {booking.peopleCount} {booking.peopleCount === 1 ? 'person' : 'people'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{booking.customerPhone}</span>
            </div>
            {booking.customerEmail && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{booking.customerEmail}</span>
              </div>
            )}
          </div>

          {/* QR Code */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Show this QR code at the venue</p>
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
              <QRCodeSVG value={booking.bookingReference} size={200} level="H" />
            </div>
            <p className="mt-3 font-mono text-sm text-gray-500">{booking.bookingReference}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={() => navigate('/my-bookings')} className="flex-1 btn-primary">
              View My Bookings
            </button>
            <button onClick={() => window.print()} className="flex-1 btn-secondary">
              Print / Save PDF
            </button>
            <button onClick={() => navigate('/')} className="flex-1 btn-secondary">
              Browse Offers
            </button>
          </div>
        </div>

        {/* Mock Notification Log — expandable */}
        {notifications.length > 0 && (
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              Notification Log
              <span className="ml-auto text-xs text-gray-400 font-normal">(Mock — no real messages sent)</span>
            </h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedNotif(expandedNotif === notif.id ? null : notif.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {notif.channel === 'Email'
                        ? <Mail className="w-4 h-4 text-blue-500" />
                        : <Smartphone className="w-4 h-4 text-green-500" />}
                      <div>
                        <p className="font-medium text-sm">{notif.channel} → {notif.recipient}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{notif.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                        {notif.status}
                      </span>
                      {expandedNotif === notif.id
                        ? <ChevronUp className="w-4 h-4 text-gray-400" />
                        : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>
                  {expandedNotif === notif.id && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                      <pre className="mt-3 text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg leading-relaxed">
                        {notif.body}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
