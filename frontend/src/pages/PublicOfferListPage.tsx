import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { offerService } from '../services/offerService';
import { OfferListItem } from '../types';
import { Search, Filter, Clock, Tag, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CountdownTimer from '../components/CountdownTimer';

export default function PublicOfferListPage() {
  const [offers, setOffers] = useState<OfferListItem[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<OfferListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    loadOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, categoryFilter, businessTypeFilter, minPrice, maxPrice, availableOnly]);

  const loadOffers = async () => {
    try {
      const data = await offerService.getAll(true);
      setOffers(data);
    } catch (error) {
      console.error('Failed to load offers', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((o) => o.category === categoryFilter);
    }

    if (businessTypeFilter) {
      filtered = filtered.filter((o) => o.businessName.toLowerCase().includes(businessTypeFilter.toLowerCase()));
    }

    if (minPrice) {
      filtered = filtered.filter((o) => o.offerPrice >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((o) => o.offerPrice <= parseFloat(maxPrice));
    }

    if (availableOnly) {
      filtered = filtered.filter((o) => o.availableSlots > 0);
    }

    setFilteredOffers(filtered);
  };

  const categories = Array.from(new Set(offers.map((o) => o.category)));
  const businessTypes = Array.from(new Set(offers.map((o) => o.businessName)));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">Smart Offer</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find amazing deals near you</p>
            </div>
            <div className="flex gap-3">
              <button onClick={toggleTheme} className="btn-secondary">
                {isDark ? '☀️' : '🌙'}
              </button>
              <Link to="/my-bookings" className="btn-secondary">
                My Bookings
              </Link>
              <Link to="/login" className="btn-primary">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search offers or businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Business Type Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={businessTypeFilter}
                onChange={(e) => setBusinessTypeFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Businesses</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input-field"
                min="0"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input-field"
                min="0"
              />
            </div>

            {/* Available Only Toggle */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              <input
                type="checkbox"
                id="availableOnly"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="availableOnly" className="text-sm font-medium cursor-pointer">
                Available Only
              </label>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setBusinessTypeFilter('');
                setMinPrice('');
                setMaxPrice('');
                setAvailableOnly(false);
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>

          {/* Active Filters Count */}
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredOffers.length} of {offers.length} offers
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No offers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <Link
                key={offer.id}
                to={`/offers/${offer.id}`}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    <Tag className="w-3 h-3 mr-1" />
                    {offer.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {offer.availableSlots} slots left
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {offer.businessName}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{offer.offerPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{offer.originalPrice}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-green-600 dark:text-green-400">
                    {offer.discountPercentage.toFixed(0)}% OFF
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <CountdownTimer endDate={offer.endDate} />
                </div>

                <button className="w-full btn-primary">
                  Book Now
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
