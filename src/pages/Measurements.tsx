import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Edit, Trash2, Ruler } from 'lucide-react';

interface Measurement {
  id: number;
  customerName: string;
  tailorShop: string;
  garmentType: string;
  measurements: {
    chest?: number;
    waist?: number;
    shoulder?: number;
    length?: number;
  };
  status: string;
  createdDate: string;
  notes?: string;
  img: string;
}

export default function Measurements(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [garmentFilter, setGarmentFilter] = useState('all');
  const [tailorFilter, setTailorFilter] = useState('all');

  const allMeasurements: Measurement[] = [
    { id: 1, customerName: 'Rahul Sharma', tailorShop: 'Royal Tailors', garmentType: 'Suit', measurements: { chest: 40, waist: 34, shoulder: 18, length: 30 }, status: 'completed', createdDate: '2024-03-15', notes: 'Regular fit preferred', img: 'https://i.pravatar.cc/150?u=m1' },
    { id: 2, customerName: 'Priya Patel', tailorShop: 'Elite Stitch', garmentType: 'Dress', measurements: { chest: 36, waist: 28, length: 42 }, status: 'pending', createdDate: '2024-03-14', img: 'https://i.pravatar.cc/150?u=m2' },
    { id: 3, customerName: 'Amit Kumar', tailorShop: 'Urban Fit', garmentType: 'Shirt', measurements: { chest: 38, waist: 32, shoulder: 17, length: 28 }, status: 'in-progress', createdDate: '2024-03-13', img: 'https://i.pravatar.cc/150?u=m3' },
    { id: 4, customerName: 'Sneha Gupta', tailorShop: 'Fashion Hub', garmentType: 'Blouse', measurements: { chest: 34, waist: 26, length: 24 }, status: 'completed', createdDate: '2024-03-12', notes: 'Tight fit around waist', img: 'https://i.pravatar.cc/150?u=m4' },
    { id: 5, customerName: 'Vikram Singh', tailorShop: 'Prime Cut', garmentType: 'Kurta', measurements: { chest: 42, waist: 36, shoulder: 19, length: 45 }, status: 'pending', createdDate: '2024-03-11', img: 'https://i.pravatar.cc/150?u=m5' },
    { id: 6, customerName: 'Anita Desai', tailorShop: 'Modern Tailors', garmentType: 'Saree Blouse', measurements: { chest: 32, waist: 24, length: 22 }, status: 'in-progress', createdDate: '2024-03-10', img: 'https://i.pravatar.cc/150?u=m6' }
  ];

  const filteredMeasurements = useMemo(() => {
    return allMeasurements.filter(measurement => {
      const matchesSearch = searchTerm === '' || 
        measurement.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.tailorShop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.garmentType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || measurement.status === statusFilter;
      const matchesGarment = garmentFilter === 'all' || measurement.garmentType === garmentFilter;
      const matchesTailor = tailorFilter === 'all' || measurement.tailorShop === tailorFilter;
      
      return matchesSearch && matchesStatus && matchesGarment && matchesTailor;
    });
  }, [searchTerm, statusFilter, garmentFilter, tailorFilter, allMeasurements]);

  const garmentTypes = [...new Set(allMeasurements.map(m => m.garmentType))];
  const statuses = [...new Set(allMeasurements.map(m => m.status))];
  const tailors = [...new Set(allMeasurements.map(m => m.tailorShop))];

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
            Measurements
          </h1>
          <p className="m-0 mt-1.5 text-sm text-[#8b7a63] font-sans">
            Track all customer measurements and fittings
          </p>
          <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
            Showing: {filteredMeasurements.length} of {allMeasurements.length} measurements
          </p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7a63] w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers, tailors, garments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] placeholder-[#8b7a63]/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e]"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status} className="capitalize">{status.replace('-', ' ')}</option>
              ))}
            </select>
            
            <select
              value={garmentFilter}
              onChange={(e) => setGarmentFilter(e.target.value)}
              className="px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
            >
              <option value="all">All Garments</option>
              {garmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={tailorFilter}
              onChange={(e) => setTailorFilter(e.target.value)}
              className="px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
            >
              <option value="all">All Tailors</option>
              {tailors.map(tailor => (
                <option key={tailor} value={tailor}>{tailor}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="font-['Inter',sans-serif] text-[#4e463e]">
        <div className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border border-white transition-[max-width] duration-350 ease-in-out">
          
          <div className="overflow-x-auto max-sm:overflow-x-scroll">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="text-left">
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Customer</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor Shop</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Garment</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden lg:table-cell">Measurements</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">Date</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeasurements.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-[#8b7a63]">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-50" />
                        <p>No measurements found matching your criteria</p>
                        <button 
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); setGarmentFilter('all'); setTailorFilter('all'); }}
                          className="text-sm text-[#6f5b3e] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredMeasurements.map((measurement: Measurement) => (
                  <tr key={measurement.id} className="bg-transparent transition-colors duration-150 hover:bg-white/55 group">
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                        <img src={measurement.img} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full" alt="" />
                        <span className="truncate">{measurement.customerName}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{measurement.tailorShop}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3 h-3 text-[#8b7a63]" />
                        <span>{measurement.garmentType}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden lg:table-cell">
                      <div className="text-[0.7rem] text-[#8b7a63] space-y-0.5">
                        {measurement.measurements.chest && <div>Chest: {measurement.measurements.chest}"</div>}
                        {measurement.measurements.waist && <div>Waist: {measurement.measurements.waist}"</div>}
                        {measurement.measurements.length && <div>Length: {measurement.measurements.length}"</div>}
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap ${
                        measurement.status === 'completed' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30' : 
                        measurement.status === 'in-progress' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30' : 
                        'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30'
                      }`}>
                        {measurement.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell">
                      {new Date(measurement.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-[#6f5b3e]" />
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-[#6f5b3e]" />
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-[#6f5b3e]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}