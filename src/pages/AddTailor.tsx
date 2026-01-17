import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Store, ArrowRight, X, Eye, EyeOff, RotateCcw } from 'lucide-react'; // Using Lucide for premium iconography
import toast from 'react-hot-toast';
import CustomDropdown from '../components/CustomDropdown';

interface TailorFormData {
  ownerName: string;
  email: string;
  mobile: string;
  password: string;
  shopName: string;
  shopAddress: string;
  city: string;
  status: string;
}

const AddTailor: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<TailorFormData>({
    ownerName: '',
    email: '',
    mobile: '',
    password: '',
    shopName: '',
    shopAddress: '',
    city: 'Mumbai',
    status: 'Active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic remains identical to your original code
    if (!formData.ownerName.trim()) { toast('Owner name is required', { icon: '⚠️' }); return; }
    if (!formData.email.trim()) { toast('Email is required', { icon: '⚠️' }); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { toast('Please enter a valid email', { icon: '⚠️' }); return; }
    if (formData.mobile.length !== 10) { toast('Mobile number must be 10 digits', { icon: '⚠️' }); return; }
    if (formData.password.length < 8) { toast('Password too short', { icon: '⚠️' }); return; }

    toast.success('Tailor profile created successfully!');
    console.log('Form Data:', formData);
  };

  const handleReset = () => {
    setFormData({
      ownerName: '',
      email: '',
      mobile: '',
      password: '',
      shopName: '',
      shopAddress: '',
      city: 'Mumbai',
      status: 'Active',
    });
    setShowPassword(false);
    toast.success('Form cleared!');
  };

  const inputStyles = "w-full bg-[#f9f4ef] border border-[#e8dfd5] rounded-xl px-3 py-2.5 text-[#6f5b3e] placeholder-[#8b7a63]/50 focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] focus:outline-none transition-all duration-300";
  const labelStyles = "block text-xs font-bold uppercase tracking-wider text-[#8b7a63] mb-2 ml-1";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-6 flex items-center justify-center font-sans">
      <style>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #f9f4ef inset !important;
          -webkit-text-fill-color: #6f5b3e !important;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <motion.div
          className="backdrop-blur-2xl bg-white/70 border-2 border-dashed border-[#6f5b3e]/25 rounded-2xl sm:rounded-[32px] overflow-visible relative"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.51)'
          }}
          whileHover={{ borderColor: 'rgba(111, 91, 62, 0.4)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Header Section Inside Card */}
          <div className="pt-4 sm:pt-6 pb-3 sm:pb-4 px-4 sm:px-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl font-light text-[#6f5b3e] tracking-tight"
            >
              Partner <span className="font-semibold text-[#8b7a63]">Onboarding</span>
            </motion.h1>
            <p className="text-[#8b7a63] mt-1 opacity-80 text-sm">Register a new premium tailor to the luxury network</p>
          </div>

          <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 space-y-5 sm:space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

              {/* Section: Owner Details */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-[#e8dfd5]">
                  <motion.div
                    className="p-2 bg-[#6f5b3e]/10 rounded-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6f5b3e]">
                      <motion.circle
                        cx="12" cy="8" r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#6f5b3e]">Owner Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelStyles}>Full Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="e.g. Julian Ashford" className={inputStyles} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@luxury.com" className={inputStyles} />
                    </div>
                    <div>
                      <label className={labelStyles}>Mobile</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="9876543210" className={inputStyles} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyles}>Secure Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={inputStyles} placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7a63] hover:text-[#6f5b3e] transition-colors">
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Shop Details */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-[#e8dfd5]">
                  <motion.div
                    className="p-2 bg-[#6f5b3e]/10 rounded-lg"
                    whileHover={{ scale: [1, 1.1, 1], transition: { duration: 0.3 } }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6f5b3e]">
                      <motion.path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M9 22V12H15V22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#6f5b3e]">Boutique Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={labelStyles}>Boutique Name</label>
                    <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="The Heritage Stitch" className={inputStyles} />
                  </div>

                  <div>
                    <label className={labelStyles}>Physical Address</label>
                    <textarea name="shopAddress" value={formData.shopAddress} onChange={handleChange} rows={1} className={`${inputStyles} resize-none min-h-[42px]`} placeholder="Suite 402, Luxury Row..." />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyles}>Location</label>
                      <CustomDropdown
                        options={[
                          { value: 'Mumbai', label: 'Mumbai' },
                          { value: 'Delhi', label: 'Delhi' },
                          { value: 'Surat', label: 'Surat' },
                          { value: 'Bangalore', label: 'Bangalore' },
                        ]}
                        value={formData.city}
                        onChange={(value) => setFormData({ ...formData, city: value })}
                        placeholder="Select City"
                      />
                    </div>
                    <div>
                      <label className={labelStyles}>Operational Status</label>
                      <CustomDropdown
                        options={[
                          { value: 'Active', label: 'Active' },
                          { value: 'Inactive', label: 'Inactive' },
                          { value: 'Blocked', label: 'Blocked' },
                        ]}
                        value={formData.status}
                        onChange={(value) => setFormData({ ...formData, status: value })}
                        placeholder="Select Status"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-[#e8dfd5]">
              <p className="text-xs text-[#8b7a63]/60 italic text-center sm:text-left">
                * All fields are required for premium certification.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-[#6f5b3e] font-medium hover:bg-[#6f5b3e]/5 rounded-lg transition-colors text-sm"
                >
                  <RotateCcw size={16} />
                  Clear Form
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-br from-[#6f5b3e] to-[#8b7a63] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg transition-all text-sm"
                >
                  Confirm Registration
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddTailor;