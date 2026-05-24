import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import LoginPage from './pages/LoginPage';
import PublicOfferListPage from './pages/PublicOfferListPage';
import OfferDetailPage from './pages/OfferDetailPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ManageOffersPage from './pages/admin/ManageOffersPage';
import CreateOfferPage from './pages/admin/CreateOfferPage';
import ManageBookingsPage from './pages/admin/ManageBookingsPage';
import BusinessProfilePage from './pages/admin/BusinessProfilePage';
import NotificationLogPage from './pages/admin/NotificationLogPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicOfferListPage />} />
            <Route path="/offers" element={<PublicOfferListPage />} />
            <Route path="/offers/:id" element={<OfferDetailPage />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmationPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="offers" element={<ManageOffersPage />} />
              <Route path="offers/create" element={<CreateOfferPage />} />
              <Route path="offers/edit/:id" element={<CreateOfferPage />} />
              <Route path="bookings" element={<ManageBookingsPage />} />
              <Route path="business" element={<BusinessProfilePage />} />
              <Route path="notifications" element={<NotificationLogPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
