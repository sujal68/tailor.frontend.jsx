import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import TailorDetailSidebar from '../components/TailorDetailSidebar';
import CustomDropdown from '../components/CustomDropdown';
import EditTailorModal from '../components/EditTailorModal';

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
  joined?: string;
}

const AllTailors: React.FC = () => {
  const [selectedTailor, setSelectedTailor] = useState<TailorShop | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTailor, setEditingTailor] = useState<TailorShop | null>(null);
  const [allTailors, setAllTailors] = useState<TailorShop[]>([
    { id: 1, name: 'Royal Tailors', owner: 'Arjun Singh', city: 'Mumbai', customers: 245, orders: 520, revenue: 650000, status: 'active', img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Elite Stitch', owner: 'Maie Barnan', city: 'Delhi', customers: 189, orders: 423, status: 'active', revenue: 528750, img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Urban Fit', owner: 'Jaana Haena', city: 'Bangalore', customers: 156, orders: 314, status: 'blocked', revenue: 392500, img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Fashion Hub', owner: 'Arjun Singh', city: 'Pune', customers: 298, orders: 615, status: 'active', revenue: 768750, img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Prime Cut', owner: 'Karak Arien', city: 'Chennai', customers: 267, orders: 520, status: 'active', revenue: 650000, img: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Modern Tailors', owner: 'Nevic Heirman', city: 'Hyderabad', customers: 134, orders: 208, status: 'active', revenue: 260000, img: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'Classic Stitching', owner: 'Sara Kim', city: 'Kolkata', customers: 178, orders: 420, status: 'blocked', revenue: 525000, img: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Luxury Fabrics', owner: 'Daniel Roy', city: 'Ahmedabad', customers: 223, orders: 503, status: 'active', revenue: 628750, img: 'https://i.pravatar.cc/150?u=8' }
  ]);

  const handleViewDetails = (tailor: TailorShop) => {
    setSelectedTailor(tailor);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleEditTailor = (tailor: TailorShop) => {
    setEditingTailor(tailor);
    setIsEditModalOpen(true);
  };

  const handleSaveTailor = (updatedTailor: TailorShop) => {
    setAllTailors(prev => prev.map(t => t.id === updatedTailor.id ? updatedTailor : t));
    setIsEditModalOpen(false);
    setEditingTailor(null);
  };

  const filteredTailors = useMemo(() => {
    return allTailors.filter(tailor => {
      const matchesSearch = searchTerm === '' || 
        tailor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || tailor.status === statusFilter;
      const matchesCity = cityFilter === 'all' || tailor.city === cityFilter;
      
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchTerm, statusFilter, cityFilter, allTailors]);

  const cities = [...new Set(allTailors.map(t => t.city))];
  const statuses = [...new Set(allTailors.map(t => t.status))];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...statuses.map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
  ];

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    ...cities.map(city => ({ value: city, label: city }))
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 sm:px-6 pb-6 pt-1"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start mb-[22px] gap-5">
        <div>
          <h1 className="text-[28px] sm:text-[32px] font-bold m-0 text-[#6f5b3e] font-sans">
            All Tailors
          </h1>
          <p className="m-0 mt-1.5 text-sm text-[#8b7a63] font-sans">
            Complete list of registered tailor shops
          </p>
          <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
            Showing: {filteredTailors.length} of {allTailors.length} tailors
          </p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7a63] w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search tailors, owners, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`pl-10 pr-4 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] placeholder-[#8b7a63]/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] transition-all duration-300 ${
                isSearchFocused ? 'w-80 sm:w-96' : 'w-64 sm:w-80'
              }`}
            />
          </div>
          
          <div className="flex gap-2">
            <CustomDropdown
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
            />
            
            <CustomDropdown
              options={cityOptions}
              value={cityFilter}
              onChange={setCityFilter}
              placeholder="All Cities"
            />
          </div>
        </div>
      </div>

      <div className="font-['Inter',sans-serif] text-[#4e463e]">
        <div className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border border-white transition-[max-width] duration-350 ease-in-out">
          
          <div className="overflow-x-auto max-sm:overflow-x-scroll">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="text-left">
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor Shop</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Owner</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">City</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Customers</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Orders</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Revenue</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTailors.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-[#8b7a63]">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-50" />
                        <p>No tailors found matching your criteria</p>
                        <button 
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCityFilter('all'); }}
                          className="text-sm text-[#6f5b3e] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredTailors.map((tailor: TailorShop) => (
                  <tr key={tailor.id} className="bg-transparent transition-colors duration-150 hover:bg-white/55 group">
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                        <img src={tailor.img} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full" alt="" />
                        <span className="truncate">{tailor.name}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{tailor.owner}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell">{tailor.city}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{tailor.customers}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{tailor.orders}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">₹{tailor.revenue.toLocaleString()}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap ${
                        tailor.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30' : 
                        tailor.status === 'pending' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30' : 
                        'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30'
                      }`}>
                        {tailor.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer sm:w-4 sm:h-4 hover:stroke-[#6f5b3e]" onClick={() => handleViewDetails(tailor)}>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                            <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite" />
                          </path>
                          <circle cx="12" cy="12" r="3">
                            <animate attributeName="r" values="3;3.5;3" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:stroke-[#6f5b3e]" onClick={() => handleEditTailor(tailor)}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                            <animate attributeName="stroke-dasharray" values="0 60;60 0" dur="2.5s" repeatCount="indefinite" />
                          </path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                          </path>
                        </svg>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:stroke-[#6f5b3e]">
                          <polyline points="3 6 5 6 21 6">
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                          </polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                            <animate attributeName="stroke-dasharray" values="0 80;80 0" dur="3s" repeatCount="indefinite" />
                          </path>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[18px] flex justify-center items-center gap-3 text-[0.8rem] text-[#8f8579]">
            <ChevronLeft size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
            <span className="px-2 py-1 cursor-pointer bg-[#6f5b3e] rounded-md text-white font-semibold">1</span>
            <span className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]">2</span>
            <span className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]">3</span>
            <span className="px-1">...</span>
            <span className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]">10</span>
            <ChevronRight size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
          </div>
        </div>
      </div>

      <TailorDetailSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
        tailor={selectedTailor} 
      />
      
      <EditTailorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tailor={editingTailor}
        onSave={handleSaveTailor}
      />
    </motion.div>
  );
};

export default AllTailors;