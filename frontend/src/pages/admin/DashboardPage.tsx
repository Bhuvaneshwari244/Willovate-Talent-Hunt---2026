import { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { DashboardSummary } from '../../types';
import { TrendingUp, Tag, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await dashboardService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>
          <div className="h-16 w-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (!summary) return null;

  const stats = [
    { label: 'Total Offers', value: summary.totalOffers, icon: Tag, color: 'bg-blue-500' },
    { label: 'Active Offers', value: summary.activeOffers, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Bookings', value: summary.totalBookings, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Today Bookings', value: summary.todayBookings, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8 page-transition">
      <h1 className="text-4xl font-bold mb-2 gradient-text animate-fadeIn">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 animate-slideInRight stagger-1">
        Welcome back! Here's your business overview
      </p>

      {/* Stats Grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="stat-card animate-scaleIn ripple"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capacity Stats with animations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card animate-slideInLeft stagger-4 hover:shadow-2xl transition-all duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Capacity</p>
          <p className="text-3xl font-bold">{summary.totalCapacity}</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary-600 rounded-full animate-shimmer" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="card animate-slideInLeft stagger-5 hover:shadow-2xl transition-all duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Booked Seats</p>
          <p className="text-3xl font-bold text-green-600">{summary.bookedSeats}</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full transition-all duration-1000"
              style={{ width: `${(summary.bookedSeats / summary.totalCapacity) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="card animate-slideInLeft stagger-6 hover:shadow-2xl transition-all duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-primary-600">{summary.conversionRate}%</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full transition-all duration-1000"
              style={{ width: `${summary.conversionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Offer</th>
                <th className="text-left py-3 px-4">Date & Time</th>
                <th className="text-left py-3 px-4">People</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4">{booking.customerName}</td>
                  <td className="py-3 px-4">{booking.offerName}</td>
                  <td className="py-3 px-4">
                    {format(new Date(booking.slotDate), 'MMM dd, yyyy')} {booking.slotTime}
                  </td>
                  <td className="py-3 px-4">{booking.peopleCount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
