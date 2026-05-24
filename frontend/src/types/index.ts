export interface User {
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: string;
}

export interface Business {
  id: number;
  name: string;
  businessType: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  logoUrl?: string;
  openingTime: string;
  closingTime: string;
  createdAt: string;
}

export interface Offer {
  id: number;
  businessId: number;
  businessName: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  maxBookingPerCustomer: number;
  termsAndConditions?: string;
  status: string;
  totalSlots: number;
  availableSlots: number;
  createdAt: string;
}

export interface OfferListItem {
  id: number;
  title: string;
  businessName: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  availableSlots: number;
  endDate: string;
  status: string;
}

export interface Slot {
  id: number;
  offerId: number;
  slotDate: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  availableCount: number;
  status: string;
  createdAt: string;
}

export interface Booking {
  id: number;
  bookingReference: string;
  offerId: number;
  offerTitle: string;
  businessName: string;
  slotId: number;
  slotDate: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
  status: string;
  qrCode?: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalOffers: number;
  activeOffers: number;
  totalBookings: number;
  todayBookings: number;
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  conversionRate: number;
  recentBookings: RecentBooking[];
}

export interface RecentBooking {
  id: number;
  customerName: string;
  offerName: string;
  slotDate: string;
  slotTime: string;
  peopleCount: number;
  status: string;
}
