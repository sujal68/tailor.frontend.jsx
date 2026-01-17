import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  tailor: string;
  orders: number;
  totalSpent: number;
  status: string;
  joinDate: string;
  img: string;
}

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onSave: (updatedCustomer: Customer) => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ isOpen, onClose, customer, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    tailor: 'Royal Tailors',
    status: 'active',
    address: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        tailor: customer.tailor,
        status: customer.status,
        address: `Address, ${customer.city}`,
      });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    // const updatedCustomer: Customer = {
    //   ...customer,
    //   name: formData.name,
    //   email: formData.email,
    //   phone: formData.phone,
    //   city: formData.city,
    //   tailor: formData.tailor,
    //   status: formData.status,
    // };

    // onSave(updatedCustomer);
    toast.success('Customer updated successfully!');
    onClose();
  };

  const handleReset = () => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        tailor: customer.tailor,
        status: customer.status,
        address: `Address, ${customer.city}`,
      });
    }
  };

  if (!isOpen || !customer) return null;

  const inputStyles = "w-full bg-[#f9f4ef] border border-[#e8dfd5] rounded-xl px-3 py-2.5 text-[#6f5b3e] placeholder-[#8b7a63]/50 focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] focus:outline-none transition-all duration-300";
  const labelStyles = "block text-xs font-bold uppercase tracking-wider text-[#8b7a63] mb-2 ml-1";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="backdrop-blur-2xl bg-white/70 border-2 border-dashed border-[#6f5b3e]/25 rounded-2xl overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8b7a63] hover:text-[#6f5b3e] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="pt-6 pb-4 px-6">
            <h1 className="text-2xl font-light text-[#6f5b3e] tracking-tight">
              Edit <span className="font-semibold text-[#8b7a63]">Customer</span>
            </h1>
            <p className="text-[#8b7a63] mt-1 opacity-80 text-sm">Update customer information</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-[#e8dfd5]">
                  <div className="p-2 bg-[#6f5b3e]/10 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6f5b3e]">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#6f5b3e]">Personal Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelStyles}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyles} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                      <label className={labelStyles}>Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputStyles} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyles}>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={`${inputStyles} resize-none`} />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-[#e8dfd5]">
                  <div className="p-2 bg-[#6f5b3e]/10 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6f5b3e]">
                      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M20 8V14L17 11L20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#6f5b3e]">Service Details</h2>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>City</label>
                      <select name="city" value={formData.city} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer`}>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Chennai</option>
                        <option>Hyderabad</option>
                        <option>Kolkata</option>
                        <option>Ahmedabad</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelStyles}>Assigned Tailor</label>
                      <select name="tailor" value={formData.tailor} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer`}>
                        <option>Royal Tailors</option>
                        <option>Elite Stitch</option>
                        <option>Urban Fit</option>
                        <option>Fashion Hub</option>
                        <option>Prime Cut</option>
                        <option>Modern Tailors</option>
                        <option>Classic Stitching</option>
                        <option>Luxury Fabrics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelStyles}>Account Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer font-medium ${formData.status === 'active' ? 'text-emerald-700' : formData.status === 'pending' ? 'text-amber-700' : 'text-red-700'}`}>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="bg-[#6f5b3e]/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7a63]">Total Orders:</span>
                      <span className="font-semibold text-[#6f5b3e]">{customer.orders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7a63]">Total Spent:</span>
                      <span className="font-semibold text-[#6f5b3e]">₹{customer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b7a63]">Member Since:</span>
                      <span className="font-semibold text-[#6f5b3e]">{new Date(customer.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="pt-5 flex items-center justify-between border-t border-[#e8dfd5]">
              <p className="text-xs text-[#8b7a63]/60 italic">
                * Update customer information carefully.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 text-[#6f5b3e] font-medium hover:bg-[#6f5b3e]/5 rounded-lg transition-colors text-sm"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-br from-[#6f5b3e] to-[#8b7a63] text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all text-sm"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditCustomerModal;