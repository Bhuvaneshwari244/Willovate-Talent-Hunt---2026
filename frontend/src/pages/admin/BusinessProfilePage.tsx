import { useState, useEffect } from 'react';
import { businessService } from '../../services/businessService';
import { Business } from '../../types';
import toast from 'react-hot-toast';

export default function BusinessProfilePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    businessType: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    logoUrl: '',
    openingTime: '09:00',
    closingTime: '18:00',
  });

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const data = await businessService.getAll();
    setBusinesses(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await businessService.update(editing, form);
        toast.success('Business updated');
      } else {
        await businessService.create(form);
        toast.success('Business created');
      }
      resetForm();
      loadBusinesses();
    } catch (error) {
      toast.error('Failed to save business');
    }
  };

  const handleEdit = (business: Business) => {
    setEditing(business.id);
    setForm({
      name: business.name,
      businessType: business.businessType,
      ownerName: business.ownerName,
      phone: business.phone,
      email: business.email,
      address: business.address,
      city: business.city,
      logoUrl: business.logoUrl || '',
      openingTime: business.openingTime,
      closingTime: business.closingTime,
    });
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: '',
      businessType: '',
      ownerName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      logoUrl: '',
      openingTime: '09:00',
      closingTime: '18:00',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Business Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Create'} Business</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Business Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Business Type *</label>
              <select
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select Type</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Gym">Gym</option>
                <option value="Salon">Salon</option>
                <option value="Clinic">Clinic</option>
                <option value="Coaching">Coaching</option>
                <option value="Turf">Turf</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Owner Name *</label>
                <input
                  type="text"
                  value={form.ownerName}
                  onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Address *</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">City *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Opening Time *</label>
                <input
                  type="time"
                  value={form.openingTime}
                  onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Closing Time *</label>
                <input
                  type="time"
                  value={form.closingTime}
                  onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              {editing && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-primary flex-1">
                {editing ? 'Update' : 'Create'} Business
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Existing Businesses</h2>
          <div className="space-y-4">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                onClick={() => handleEdit(business)}
              >
                <h3 className="font-bold text-lg">{business.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{business.businessType}</p>
                <p className="text-sm mt-2">{business.address}, {business.city}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {business.openingTime} - {business.closingTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
