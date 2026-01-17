import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Eye, EyeOff, RotateCcw, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface TailorShop {
  id: number;
  name: string;
  owner: string;
  city: string;
  customers: number;
  orders: number;
  revenue: number;
  status: string;
  img: string;
}

interface EditTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tailor: TailorShop | null;
  onSave: (updatedTailor: TailorShop) => void;
}

const EditTailorModal: React.FC<EditTailorModalProps> = ({ isOpen, onClose, tailor, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    mobile: '',
    password: '',
    shopName: '',
    shopAddress: '',
    city: 'Mumbai',
    status: 'active',
  });

  useEffect(() => {
    if (tailor) {
      setFormData({
        ownerName: tailor.owner,
        email: `${tailor.owner.toLowerCase().replace(' ', '.')}@email.com`,
        mobile: '9876543210',
        password: '••••••••',
        shopName: tailor.name,
        shopAddress: `Shop Address, ${tailor.city}`,
        city: tailor.city,
        status: tailor.status,
      });
    }
  }, [tailor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tailor) return;

    // const updatedTailor: TailorShop = {
    //   ...tailor,
    //   name: formData.shopName,
    //   owner: formData.ownerName,
    //   city: formData.city,
    //   status: formData.status,
    // };

    // onSave(updatedTailor);
    toast.success('Tailor updated successfully!');
    onClose();
  };

  const handleReset = () => {
    if (tailor) {
      setFormData({
        ownerName: tailor.owner,
        email: `${tailor.owner.toLowerCase().replace(' ', '.')}@email.com`,
        mobile: '9876543210',
        password: '••••••••',
        shopName: tailor.name,
        shopAddress: `Shop Address, ${tailor.city}`,
        city: tailor.city,
        status: tailor.status,
      });
    }
    setShowPassword(false);
  };

  if (!isOpen || !tailor) return null;

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
        <div className="backdrop-blur-2xl bg-white border-2 border-dashed border-[#6f5b3e]/25 rounded-2xl overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8b7a63] hover:text-[#6f5b3e] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="pt-6 pb-4 px-6">
            <h1 className="text-2xl font-light text-[#6f5b3e] tracking-tight">
              Edit <span className="font-semibold text-[#8b7a63]">Tailor</span>
            </h1>
            <p className="text-[#8b7a63] mt-1 opacity-80 text-sm">Update tailor information</p>
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
                  <h2 className="text-lg font-semibold text-[#6f5b3e]">Owner Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelStyles}>Full Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={inputStyles} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                      <label className={labelStyles}>Mobile</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={inputStyles} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyles}>Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={inputStyles} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7a63] hover:text-[#6f5b3e] transition-colors">
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-[#e8dfd5]">
                  <div className="p-2 bg-[#6f5b3e]/10 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6f5b3e]">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#6f5b3e]">Shop Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelStyles}>Shop Name</label>
                    <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} className={inputStyles} />
                  </div>

                  <div>
                    <label className={labelStyles}>Shop Address</label>
                    <textarea name="shopAddress" value={formData.shopAddress} onChange={handleChange} rows={2} className={`${inputStyles} resize-none`} />
                  </div>

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
                      <label className={labelStyles}>Status</label>
                      <select name="status" value={formData.status} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer font-medium ${formData.status === 'active' ? 'text-emerald-700' : formData.status === 'pending' ? 'text-amber-700' : 'text-red-700'}`}>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="pt-5 flex items-center justify-between border-t border-[#e8dfd5]">
              <p className="text-xs text-[#8b7a63]/60 italic">
                * Update tailor information carefully.
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

export default EditTailorModal;