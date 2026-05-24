import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { offerService } from '../../services/offerService';
import { businessService } from '../../services/businessService';
import { slotService } from '../../services/slotService';
import { Business } from '../../types';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function CreateOfferPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [offer, setOffer] = useState({
    businessId: 0,
    title: '',
    description: '',
    category: '',
    originalPrice: 0,
    offerPrice: 0,
    startDate: '',
    endDate: '',
    maxBookingPerCustomer: 1,
    termsAndConditions: '',
    status: 'Draft',
  });
  const [slots, setSlots] = useState([
    { slotDate: '', startTime: '', endTime: '', capacity: 10 },
  ]);

  useEffect(() => {
    loadBusinesses();
    if (id) loadOffer();
  }, [id]);

  const loadBusinesses = async () => {
    const data = await businessService.getAll();
    setBusinesses(data);
  };

  const loadOffer = async () => {
    try {
      const data = await offerService.getById(Number(id));
      setOffer({
        businessId: data.businessId,
        title: data.title,
        description: data.description,
        category: data.category,
        originalPrice: data.originalPrice,
        offerPrice: data.offerPrice,
        startDate: data.startDate.split('T')[0],
        endDate: data.endDate.split('T')[0],
        maxBookingPerCustomer: data.maxBookingPerCustomer || 1,
        termsAndConditions: data.termsAndConditions || '',
        status: data.status,
      });
    } catch (error) {
      toast.error('Failed to load offer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await offerService.update(Number(id), offer);
        toast.success('Offer updated');
      } else {
        const created = await offerService.create(offer);
        for (const slot of slots) {
          await slotService.create({ ...slot, offerId: created.id });
        }
        toast.success('Offer created');
      }
      navigate('/admin/offers');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save offer');
    }
  };

  const addSlot = () => {
    setSlots([...slots, { slotDate: '', startTime: '', endTime: '', capacity: 10 }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <button onClick={() => navigate('/admin/offers')} className="flex items-center text-primary-600 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Offers
      </button>

      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Create'} Offer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Offer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Business *</label>
              <select
                value={offer.businessId}
                onChange={(e) => setOffer({ ...offer, businessId: Number(e.target.value) })}
                className="input-field"
                required
              >
                <option value={0}>Select Business</option>
                {businesses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Category *</label>
              <input
                type="text"
                value={offer.category}
                onChange={(e) => setOffer({ ...offer, category: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Title *</label>
              <input
                type="text"
                value={offer.title}
                onChange={(e) => setOffer({ ...offer, title: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Description *</label>
              <textarea
                value={offer.description}
                onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                className="input-field"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Original Price *</label>
              <input
                type="number"
                value={offer.originalPrice}
                onChange={(e) => setOffer({ ...offer, originalPrice: Number(e.target.value) })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Offer Price *</label>
              <input
                type="number"
                value={offer.offerPrice}
                onChange={(e) => setOffer({ ...offer, offerPrice: Number(e.target.value) })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Start Date *</label>
              <input
                type="date"
                value={offer.startDate}
                onChange={(e) => setOffer({ ...offer, startDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">End Date *</label>
              <input
                type="date"
                value={offer.endDate}
                onChange={(e) => setOffer({ ...offer, endDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Max Booking Per Customer *</label>
              <input
                type="number"
                min="1"
                value={offer.maxBookingPerCustomer}
                onChange={(e) => setOffer({ ...offer, maxBookingPerCustomer: Number(e.target.value) })}
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Terms & Conditions</label>
              <textarea
                value={offer.termsAndConditions}
                onChange={(e) => setOffer({ ...offer, termsAndConditions: e.target.value })}
                className="input-field"
                rows={2}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Status *</label>
              <select
                value={offer.status}
                onChange={(e) => setOffer({ ...offer, status: e.target.value })}
                className="input-field"
                required
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {!id && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Slots</h2>
              <button type="button" onClick={addSlot} className="btn-secondary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </button>
            </div>
            <div className="space-y-4">
              {slots.map((slot, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={slot.slotDate}
                      onChange={(e) => {
                        const newSlots = [...slots];
                        newSlots[index].slotDate = e.target.value;
                        setSlots(newSlots);
                      }}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => {
                        const newSlots = [...slots];
                        newSlots[index].startTime = e.target.value;
                        setSlots(newSlots);
                      }}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Time</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => {
                        const newSlots = [...slots];
                        newSlots[index].endTime = e.target.value;
                        setSlots(newSlots);
                      }}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input
                      type="number"
                      value={slot.capacity}
                      onChange={(e) => {
                        const newSlots = [...slots];
                        newSlots[index].capacity = Number(e.target.value);
                        setSlots(newSlots);
                      }}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSlot(index)}
                      className="btn-secondary w-full"
                      disabled={slots.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/admin/offers')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {id ? 'Update' : 'Create'} Offer
          </button>
        </div>
      </form>
    </div>
  );
}
