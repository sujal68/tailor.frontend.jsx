import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TailorDetailSidebar from './TailorDetailSidebar';

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

const RecentRegistrationsTable: React.FC = () => {
  const [selectedTailor, setSelectedTailor] = useState<TailorShop | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleViewDetails = (tailor: TailorShop) => {
    setSelectedTailor(tailor);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  const recentTailors: TailorShop[] = [
    { id: 9, name: 'Rajesh Tailors', owner: 'Rajesh Kumar', city: 'Mumbai', customers: 0, orders: 0, revenue: 0, joined: '2 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: 'Elite Stitching', owner: 'Amit Sharma', city: 'Delhi', customers: 0, orders: 0, revenue: 0, joined: '5 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=10' },
    { id: 11, name: 'Fashion Hub', owner: 'Priya Patel', city: 'Bangalore', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'pending', img: 'https://i.pravatar.cc/150?u=11' },
    { id: 12, name: 'Royal Fabrics', owner: 'Vikram Singh', city: 'Pune', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'active', img: 'https://i.pravatar.cc/150?u=12' },
    { id: 13, name: 'Modern Tailors', owner: 'Suresh Reddy', city: 'Chennai', customers: 0, orders: 0, revenue: 0, joined: '2 days ago', status: 'active', img: 'https://i.pravatar.cc/150?u=13' }
  ];

  return (
    <>
      <div className="overflow-x-auto max-sm:overflow-x-scroll">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="text-left">
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor Shop</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Owner</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">City</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Joined</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentTailors.map((tailor: TailorShop) => (
              <tr key={tailor.id} className="bg-transparent transition-colors duration-150 hover:bg-white/55 group">
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                  <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                    <img src={tailor.img} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full" alt="" />
                    <span className="truncate">{tailor.name}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{tailor.owner}</td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell">{tailor.city}</td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] whitespace-nowrap">{tailor.joined}</td>
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
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:stroke-[#6f5b3e]">
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
        <ChevronRight size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
      </div>

      <TailorDetailSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
        tailor={selectedTailor} 
      />
    </>
  );
};

export default RecentRegistrationsTable;