import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { offerService } from '../services/offerService';
import { slotService } from '../services/slotService';
import { bookingService } from '../services/bookingService';
import { Offer, Slot } from '../types';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Users, CreditCard, Smartphone, Building2, X, Lock } from 'lucide-react';
import { format } from 'date-fns';

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [booking, setBooking] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    peopleCount: 1,
    specialNote: '',
  });

  useEffect(() => {
    if (id) loadOfferDetails();
  }, [id]);

  const loadOfferDetails = async () => {
    try {
      const [offerData, slotsData] = await Promise.all([
        offerService.getById(Number(id)),
        slotService.getByOfferId(Number(id)),
      ]);
      setOffer(offerData);
      setSlots(slotsData.filter((s) => s.status === 'Available'));
    } catch {
      toast.error('Failed to load offer details');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }
    // Open payment modal
    setShowPayment(true);
  };

  const handlePaymentConfirm = async () => {
    if (paymentMethod === 'upi' && !upiId.trim()) {
      toast.error('Please enter your UPI ID');
      return;
    }
    setPaymentProcessing(true);
    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 1500));
    setPaymentProcessing(false);
    setShowPayment(false);
    // Now create the booking
    await submitBooking();
  };

  const submitBooking = async () => {
    setSubmitting(true);
    try {
      const result = await bookingService.create({
        offerId: Number(id),
        slotId: selectedSlot!,
        ...booking,
      });
      toast.success('Booking confirmed!');
      navigate(`/booking-confirmation/${result.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = offer ? offer.offerPrice * booking.peopleCount : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="h-16 w-16 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>
          <div className="h-16 w-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading offer details...</p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Offer Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, this offer is no longer available.</p>
          <button onClick={() => navigate('/')} className="btn-primary inline-flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Browse All Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate('/')} className="flex items-center text-primary-600 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Offers
        </button>

        {/* Offer Info */}
        <div className="card mb-6">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              <Tag className="w-4 h-4 mr-1" />
              {offer.category}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {offer.discountPercentage.toFixed(0)}% OFF
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{offer.title}</h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            {offer.businessName}
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-primary-600">₹{offer.offerPrice}</span>
            <span className="text-2xl text-gray-400 line-through">₹{offer.originalPrice}</span>
            <span className="text-sm text-gray-500">per person</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{offer.description}</p>
          {offer.termsAndConditions && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{offer.termsAndConditions}</p>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Book Your Slot</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">

            {/* Slot Selection */}
            <div>
              <label className="block font-medium mb-3">Select Slot *</label>
              {slots.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No available slots for this offer.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        selectedSlot === slot.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center text-sm font-medium">
                          <Calendar className="w-4 h-4 mr-2" />
                          {format(new Date(slot.slotDate), 'MMM dd, yyyy')}
                        </span>
                        <span className="flex items-center text-sm text-green-600">
                          <Users className="w-4 h-4 mr-1" />
                          {slot.availableCount} left
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {slot.startTime} – {slot.endTime}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={booking.customerName}
                  onChange={(e) => setBooking({ ...booking, customerName: e.target.value })}
                  className="input-field"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={booking.customerPhone}
                  onChange={(e) => setBooking({ ...booking, customerPhone: e.target.value })}
                  className="input-field"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Email *
                <span className="ml-2 text-xs font-normal text-gray-500">Used to retrieve your booking later</span>
              </label>
              <input
                type="email"
                value={booking.customerEmail}
                onChange={(e) => setBooking({ ...booking, customerEmail: e.target.value })}
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Number of People *</label>
              <input
                type="number"
                min="1"
                max={slots.find(s => s.id === selectedSlot)?.availableCount ?? 10}
                value={booking.peopleCount}
                onChange={(e) => setBooking({ ...booking, peopleCount: Number(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Special Note (Optional)</label>
              <textarea
                value={booking.specialNote}
                onChange={(e) => setBooking({ ...booking, specialNote: e.target.value })}
                className="input-field"
                rows={2}
                placeholder="Any special requirements..."
              />
            </div>

            {/* Order Summary */}
            {selectedSlot && (
              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{offer.title}</span>
                    <span>₹{offer.offerPrice} × {booking.peopleCount}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 line-through text-xs">
                    <span>Original price</span>
                    <span>₹{offer.originalPrice * booking.peopleCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-primary-200 dark:border-primary-700 pt-2 mt-2">
                    <span>Total Payable</span>
                    <span className="text-primary-600">₹{totalAmount}</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    You save ₹{(offer.originalPrice - offer.offerPrice) * booking.peopleCount}!
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || slots.length === 0}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment — ₹{totalAmount}
            </button>
          </form>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-bold">Secure Payment</h2>
              </div>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Amount */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount to Pay</p>
                <p className="text-4xl font-bold text-primary-600">₹{totalAmount}</p>
                <p className="text-xs text-gray-500 mt-1">{offer.title} · {booking.peopleCount} {booking.peopleCount === 1 ? 'person' : 'people'}</p>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <p className="text-sm font-medium mb-3">Payment Method</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'upi', label: 'UPI', icon: Smartphone },
                    { key: 'card', label: 'Card', icon: CreditCard },
                    { key: 'netbanking', label: 'Net Banking', icon: Building2 },
                  ] as { key: PaymentMethod; label: string; icon: any }[]).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPaymentMethod(key)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-medium transition-colors ${
                        paymentMethod === key
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI Input */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium mb-2">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g. 9876543210@paytm, name@gpay</p>
                </div>
              )}

              {/* Card Input */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="input-field" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="input-field" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input type="password" placeholder="•••" className="input-field" maxLength={3} />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select Bank</label>
                  <select className="input-field">
                    <option value="">Choose your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePaymentConfirm}
                disabled={paymentProcessing}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                {paymentProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{totalAmount} Securely
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                256-bit SSL encrypted · Demo payment (no real charge)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
