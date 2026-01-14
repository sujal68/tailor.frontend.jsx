import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Users, ShoppingBag, TrendingUp, Award } from 'lucide-react';

interface TailorDetailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tailor: {
    name: string;
    owner: string;
    city: string;
    customers: number;
    orders: number;
    revenue: number;
    status: string;
    img: string;
    joined?: string;
  } | null;
}

const TailorDetailSidebar: React.FC<TailorDetailSidebarProps> = ({ isOpen, onClose, tailor }) => {
  if (!tailor) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[480px] bg-gradient-to-br from-[#fdfbf7] to-[#f5ede3] shadow-[-10px_0_40px_rgba(0,0,0,0.15)] z-50 transition-transform duration-300 ease-out overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#8a7b6a] to-[#6f5b3e] p-4 sm:p-5 md:p-6 flex items-center justify-between shadow-lg z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-['Poppins',sans-serif]">Tailor Details</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all active:scale-95"
          >
            <X size={18} className="text-white sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 md:space-y-5">
          {/* Profile Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-[14px] sm:rounded-[16px] md:rounded-[20px] p-3 sm:p-4 md:p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2 sm:mb-3">
                <img
                  src={tailor.img}
                  alt={tailor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg object-cover"
                />
                <div className={`absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-white ${tailor.status === 'active' ? 'bg-[#3f7f5a]' : tailor.status === 'pending' ? 'bg-[#b88924]' : 'bg-[#a64444]'}`} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4e463e] mb-0.5 sm:mb-1">{tailor.name}</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-[#8b7a63] mb-2">Owner: {tailor.owner}</p>
              <span className={`px-2.5 sm:px-3 md:px-4 py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide ${tailor.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53]' : tailor.status === 'pending' ? 'bg-[#fff2db] text-[#b88924]' : 'bg-[#fdeaea] text-[#a64444]'}`}>
                {tailor.status}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-[14px] sm:rounded-[16px] md:rounded-[20px] p-3 sm:p-4 md:p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#4e463e] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <Mail size={14} className="text-[#8a7b6a] sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              Contact Information
            </h4>
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm">
                <Phone size={13} className="text-[#8b7a63] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                <span className="text-[#5c5247]">+91 98765-43210</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm">
                <Mail size={13} className="text-[#8b7a63] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                <span className="text-[#5c5247]">{tailor.name.toLowerCase().replace(/\s+/g, '')}@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm">
                <MapPin size={13} className="text-[#8b7a63] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                <span className="text-[#5c5247]">{tailor.city}, India</span>
              </div>
              {tailor.joined && (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm">
                  <Calendar size={13} className="text-[#8b7a63] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                  <span className="text-[#5c5247]">Joined {tailor.joined}</span>
                </div>
              )}
            </div>
          </div>

          {/* Business Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-[14px] sm:rounded-[16px] md:rounded-[20px] p-3 sm:p-4 md:p-5 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#4e463e] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <TrendingUp size={14} className="text-[#8a7b6a] sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              Business Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-[#e7f3ed] to-[#d4e8dc] rounded-[10px] sm:rounded-[12px] md:rounded-[14px] p-2.5 sm:p-3 md:p-4 border border-[#3f7f5a]/20">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                  <Users size={13} className="text-[#3f7f5a] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-[#3f7f5a] font-medium">Customers</span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#2f6f53]">{tailor.customers}</p>
              </div>
              <div className="bg-gradient-to-br from-[#fff2db] to-[#f5e8c8] rounded-[10px] sm:rounded-[12px] md:rounded-[14px] p-2.5 sm:p-3 md:p-4 border border-[#b88924]/20">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                  <ShoppingBag size={13} className="text-[#b88924] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-[#b88924] font-medium">Orders</span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#9a7420]">{tailor.orders}</p>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-[#e8ddd0] to-[#d9cec1] rounded-[10px] sm:rounded-[12px] md:rounded-[14px] p-2.5 sm:p-3 md:p-4 border border-[#8a7b6a]/30">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                  <Award size={13} className="text-[#6f5b3e] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-[#6f5b3e] font-medium">Total Revenue</span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#5c4d3f]">₹{tailor.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-2.5">
            <button className="w-full py-2 sm:py-2.5 md:py-3 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] bg-gradient-to-r from-[#8a7b6a] to-[#6f5b3e] text-white text-xs sm:text-sm md:text-base font-semibold shadow-[0_6px_20px_rgba(138,123,106,0.4)] hover:shadow-[0_8px_24px_rgba(138,123,106,0.5)] hover:-translate-y-0.5 transition-all active:scale-98">
              View Full Profile
            </button>
            <button className="w-full py-2 sm:py-2.5 md:py-3 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] bg-white/70 border border-[#8a7b6a]/30 text-[#6f5b3e] text-xs sm:text-sm md:text-base font-semibold hover:bg-white hover:border-[#8a7b6a] transition-all active:scale-98">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TailorDetailSidebar;
