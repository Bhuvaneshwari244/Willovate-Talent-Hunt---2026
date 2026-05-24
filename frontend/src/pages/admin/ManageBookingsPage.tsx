import { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { Booking } from '../../types';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await bookingService.updateStatus(id, status);
      toast.success('Status updated');
      loadBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const exportCSV = () => {
    const headers = ['Reference', 'Customer', 'Phone', 'Offer', 'Date', 'Time', 'People', 'Status'];
    const rows = bookings.map((b) => [
      b.bookingReference,
      b.customerName,
      b.customerPhone,
      b.offerTitle,
      format(new Date(b.slotDate), 'yyyy-MM-dd'),
      `${b.startTime}-${b.endTime}`,
      b.peopleCount,
      b.status,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <button onClick={exportCSV} className="btn-primary flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4">Reference</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Phone</th>
                <th className="text-left py-3 px-4">Offer</th>
                <th className="text-left py-3 px-4">Date & Time</th>
                <th className="text-left py-3 px-4">People</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-mono text-sm">{booking.bookingReference}</td>
                  <td className="py-3 px-4">{booking.customerName}</td>
                  <td className="py-3 px-4">{booking.customerPhone}</td>
                  <td className="py-3 px-4">{booking.offerTitle}</td>
                  <td className="py-3 px-4">
                    {format(new Date(booking.slotDate), 'MMM dd, yyyy')}
                    <br />
                    <span className="text-sm text-gray-500">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </td>
                  <td className="py-3 px-4">{booking.peopleCount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="No Show">No Show</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
