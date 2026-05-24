import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { offerService } from '../../services/offerService';
import { OfferListItem } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageOffersPage() {
  const [offers, setOffers] = useState<OfferListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const data = await offerService.getAll();
      setOffers(data);
    } catch (error) {
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      await offerService.delete(id);
      toast.success('Offer deleted');
      loadOffers();
    } catch (error) {
      toast.error('Failed to delete offer');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Offers</h1>
        <Link to="/admin/offers/create" className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Offer
        </Link>
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
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Business</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Discount</th>
                <th className="text-left py-3 px-4">Slots</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium">{offer.title}</td>
                  <td className="py-3 px-4">{offer.businessName}</td>
                  <td className="py-3 px-4">{offer.category}</td>
                  <td className="py-3 px-4">₹{offer.offerPrice}</td>
                  <td className="py-3 px-4">{offer.discountPercentage.toFixed(0)}%</td>
                  <td className="py-3 px-4">{offer.availableSlots}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        offer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/offers/edit/${offer.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
