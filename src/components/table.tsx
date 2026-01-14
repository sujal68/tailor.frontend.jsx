import React, { useState } from 'react'; import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import TailorDetailSidebar from './TailorDetailSidebar';

interface TailorShop { id: number; name: string; owner: string; city: string; customers: number; orders: number; revenue: number; status: string; img: string; joined?: string; }

const Table: React.FC = () => {
  const [view, setView] = useState<'all' | 'recent'>('all');
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

  const allTailors: TailorShop[] = [{ id: 1, name: 'Royal Tailors', owner: 'Arjun Singh', city: 'Mumbai', customers: 245, orders: 520, revenue: 650000, status: 'active', img: 'https://i.pravatar.cc/150?u=1' }, { id: 2, name: 'Elite Stitch', owner: 'Maie Barnan', city: 'Delhi', customers: 189, orders: 423, status: 'active', revenue: 528750, img: 'https://i.pravatar.cc/150?u=2' }, { id: 3, name: 'Urban Fit', owner: 'Jaana Haena', city: 'Bangalore', customers: 156, orders: 314, status: 'blocked', revenue: 392500, img: 'https://i.pravatar.cc/150?u=3' }, { id: 4, name: 'Fashion Hub', owner: 'Arjun Singh', city: 'Pune', customers: 298, orders: 615, status: 'active', revenue: 768750, img: 'https://i.pravatar.cc/150?u=4' }, { id: 5, name: 'Prime Cut', owner: 'Karak Arien', city: 'Chennai', customers: 267, orders: 520, status: 'active', revenue: 650000, img: 'https://i.pravatar.cc/150?u=5' }, { id: 6, name: 'Modern Tailors', owner: 'Nevic Heirman', city: 'Hyderabad', customers: 134, orders: 208, status: 'active', revenue: 260000, img: 'https://i.pravatar.cc/150?u=6' }, { id: 7, name: 'Classic Stitching', owner: 'Sara Kim', city: 'Kolkata', customers: 178, orders: 420, status: 'blocked', revenue: 525000, img: 'https://i.pravatar.cc/150?u=7' }, { id: 8, name: 'Luxury Fabrics', owner: 'Daniel Roy', city: 'Ahmedabad', customers: 223, orders: 503, status: 'active', revenue: 628750, img: 'https://i.pravatar.cc/150?u=8' }];

  const recentTailors: TailorShop[] = [{ id: 9, name: 'Rajesh Tailors', owner: 'Rajesh Kumar', city: 'Mumbai', customers: 0, orders: 0, revenue: 0, joined: '2 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=9' }, { id: 10, name: 'Elite Stitching', owner: 'Amit Sharma', city: 'Delhi', customers: 0, orders: 0, revenue: 0, joined: '5 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=10' }, { id: 11, name: 'Fashion Hub', owner: 'Priya Patel', city: 'Bangalore', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'pending', img: 'https://i.pravatar.cc/150?u=11' }, { id: 12, name: 'Royal Fabrics', owner: 'Vikram Singh', city: 'Pune', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'active', img: 'https://i.pravatar.cc/150?u=12' }, { id: 13, name: 'Modern Tailors', owner: 'Suresh Reddy', city: 'Chennai', customers: 0, orders: 0, revenue: 0, joined: '2 days ago', status: 'active', img: 'https://i.pravatar.cc/150?u=13' }];

  const customers = view === 'all' ? allTailors : recentTailors;

  return (<div className="font-['Inter',sans-serif] text-[#4e463e]"><div className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border border-white transition-[max-width] duration-350 ease-in-out"><div className="flex gap-2 mb-4"><button onClick={() => setView('all')} className={`px-4 py-2 rounded-[12px] text-[13px] font-medium transition-all ${view === 'all' ? 'bg-[#6f5b3e] text-white shadow-[0_4px_12px_rgba(111,91,62,0.3)]' : 'bg-white/50 text-[#8f8579] hover:bg-white/70'}`}>All Tailors</button><button onClick={() => setView('recent')} className={`px-4 py-2 rounded-[12px] text-[13px] font-medium transition-all ${view === 'recent' ? 'bg-[#6f5b3e] text-white shadow-[0_4px_12px_rgba(111,91,62,0.3)]' : 'bg-white/50 text-[#8f8579] hover:bg-white/70'}`}>Recent Registrations</button></div><div className="overflow-x-auto max-sm:overflow-x-scroll"><table className="w-full border-collapse min-w-[800px]"><thead><tr className="text-left">{view === 'all' ? (<><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor Shop</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Owner</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">City</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Customers</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Orders</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Revenue</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th></>) : (<><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor Shop</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Owner</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">City</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Joined</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th><th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th></>)}</tr></thead><tbody>
      {customers.map((c: TailorShop) => (
        <tr key={c.id} className="bg-transparent transition-colors duration-150 hover:bg-white/55 group">
          <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]"><div className="flex items-center gap-2 sm:gap-2.5 font-medium"><img src={c.img} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full" alt="" /><span className="truncate">{c.name}</span></div></td>
          <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{c.owner}</td>
          <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell">{c.city}</td>
          {view === 'all' ? (<><td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{c.customers}</td><td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{c.orders}</td><td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">₹{c.revenue.toLocaleString()}</td></>) : (<td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] whitespace-nowrap">{c.joined}</td>)}
          <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]"><span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap ${c.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30' : c.status === 'pending' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30' : 'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30'}`}>{c.status}</span></td>
          <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]"><div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity"><Eye size={14} className="cursor-pointer sm:w-4 sm:h-4 hover:text-[#6f5b3e]" onClick={() => handleViewDetails(c)} /><Edit2 size={13} className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:text-[#6f5b3e]" /><Trash2 size={13} className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:text-[#6f5b3e]" /></div></td>
        </tr>
      ))}
    </tbody></table></div>

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
  <TailorDetailSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} tailor={selectedTailor} />
  </div>
  );
};

export default Table;
