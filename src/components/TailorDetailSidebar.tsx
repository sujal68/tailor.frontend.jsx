import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Users, ShoppingBag, TrendingUp, Award, ExternalLink, MessageSquare } from 'lucide-react';

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

// Animated Icon Wrapper Component
const AnimatedIcon = ({ children, color = "#8a7b6a" }: { children: React.ReactNode, color?: string }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    className="p-2 rounded-lg bg-white/50 shadow-sm flex items-center justify-center"
    style={{ color }}
  >
    {children}
  </motion.div>
);

const TailorDetailSidebar: React.FC<TailorDetailSidebarProps> = ({ isOpen, onClose, tailor }) => {
  if (!tailor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-[55]"
          />

          {/* Premium Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#fcfaf7] z-[60] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col border-l border-[#eaddcf]"
          >
            {/* Custom Stitching Header */}
            <div className="relative p-8 bg-[#8a7b6a] text-white overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 border-t-2 border-dashed border-white/30" />
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif font-bold tracking-tight">Tailor Profile</h2>
                  <p className="text-white/70 text-sm italic">Mastering the Art of Fit</p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>
              {/* Decorative SVG Pattern */}
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <ShoppingBag size={120} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

              {/* Profile Card with Animated Hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(138,123,106,0.1)] border border-[#eaddcf] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f8f5f2] rounded-bl-full -z-0 transition-all group-hover:scale-110" />

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mb-4"
                  >
                    <img
                      src={tailor.img}
                      alt={tailor.name}
                      className="w-28 h-28 rounded-2xl object-cover ring-4 ring-[#f8f5f2] shadow-xl"
                    />
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${tailor.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      {tailor.status}
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[#4a3f35]">{tailor.name}</h3>
                  <div className="flex items-center gap-2 text-[#8a7b6a] mt-1">
                    <span className="text-sm font-medium">Lead Designer: {tailor.owner}</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid - Premium Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users size={18} />, label: 'Clients', value: tailor.customers, color: '#5d8a6a' },
                  { icon: <ShoppingBag size={18} />, label: 'Orders', value: tailor.orders, color: '#b88924' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-2xl border border-[#eaddcf] shadow-sm flex flex-col items-center"
                  >
                    <AnimatedIcon color={stat.color}>{stat.icon}</AnimatedIcon>
                    <span className="text-xs text-[#8a7b6a] mt-2 uppercase tracking-tighter font-bold">{stat.label}</span>
                    <span className="text-xl font-bold text-[#4a3f35]">{stat.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Section with "Stitched" border */}
              <div className="bg-[#fcfaf7] border-2 border-dashed border-[#eaddcf] rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#8a7b6a] uppercase tracking-[0.2em] mb-4">Registry Information</h4>

                <div className="space-y-3">
                  {[
                    { icon: <Phone size={16} />, text: '+91 98765-43210' },
                    { icon: <Mail size={16} />, text: `${tailor.name.split(' ')[0].toLowerCase()}@atelier.com` },
                    { icon: <MapPin size={16} />, text: `${tailor.city}, India` },
                    { icon: <Calendar size={16} />, text: `Member since ${tailor.joined || '2023'}` }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-sm text-[#5c5247]"
                    >
                      <span className="text-[#8a7b6a]">{item.icon}</span>
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Revenue Highlight */}
              <div className="bg-[#4a3f35] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Total Valuation</p>
                    <h4 className="text-2xl font-bold">₹{tailor.revenue.toLocaleString()}</h4>
                  </div>
                  <TrendingUp className="text-emerald-400" size={32} />
                </div>
                {/* Abstract Line Pattern */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#8a7b6a] text-white rounded-xl font-bold shadow-xl shadow-[#8a7b6a]/20 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} /> View Portfolio
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#fdfbf9' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border-2 border-[#8a7b6a] text-[#8a7b6a] rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} /> Contact Business
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TailorDetailSidebar;