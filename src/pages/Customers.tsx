import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import CustomDropdown from '../components/CustomDropdown';
import EditCustomerModal from '../components/EditCustomerModal';

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

export default function Customers(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [tailorFilter, setTailorFilter] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '9876543210', city: 'Mumbai', tailor: 'Royal Tailors', orders: 12, totalSpent: 45000, status: 'active', joinDate: '2024-01-15', img: 'https://i.pravatar.cc/150?u=c1' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '9876543211', city: 'Delhi', tailor: 'Elite Stitch', orders: 8, totalSpent: 32000, status: 'active', joinDate: '2024-02-20', img: 'https://i.pravatar.cc/150?u=c2' },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '9876543212', city: 'Bangalore', tailor: 'Urban Fit', orders: 5, totalSpent: 18000, status: 'inactive', joinDate: '2024-01-10', img: 'https://i.pravatar.cc/150?u=c3' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', phone: '9876543213', city: 'Pune', tailor: 'Fashion Hub', orders: 15, totalSpent: 67000, status: 'active', joinDate: '2023-12-05', img: 'https://i.pravatar.cc/150?u=c4' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', phone: '9876543214', city: 'Chennai', tailor: 'Prime Cut', orders: 9, totalSpent: 38000, status: 'active', joinDate: '2024-03-01', img: 'https://i.pravatar.cc/150?u=c5' },
    { id: 6, name: 'Anita Desai', email: 'anita@email.com', phone: '9876543215', city: 'Hyderabad', tailor: 'Modern Tailors', orders: 3, totalSpent: 12000, status: 'pending', joinDate: '2024-03-15', img: 'https://i.pravatar.cc/150?u=c6' }
  ]);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    setAllCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setIsEditModalOpen(false);
    setEditingCustomer(null);
  };

  const filteredCustomers = useMemo(() => {
    return allCustomers.filter(customer => {
      const matchesSearch = searchTerm === '' || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.tailor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
      const matchesTailor = tailorFilter === 'all' || customer.tailor === tailorFilter;
      
      return matchesSearch && matchesStatus && matchesCity && matchesTailor;
    });
  }, [searchTerm, statusFilter, cityFilter, tailorFilter, allCustomers]);

  const cities = [...new Set(allCustomers.map(c => c.city))];
  const statuses = [...new Set(allCustomers.map(c => c.status))];
  const tailors = [...new Set(allCustomers.map(c => c.tailor))];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...statuses.map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
  ];

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    ...cities.map(city => ({ value: city, label: city }))
  ];

  const tailorOptions = [
    { value: 'all', label: 'All Tailors' },
    ...tailors.map(tailor => ({ value: tailor, label: tailor }))
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
            Customers
          </h1>
          <p className="m-0 mt-1.5 text-sm text-[#8b7a63] font-sans">
            Manage all customer accounts and orders
          </p>
          <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
            Showing: {filteredCustomers.length} of {allCustomers.length} customers
          </p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7a63] w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search customers, email, phone..."
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
            
            <CustomDropdown
              options={tailorOptions}
              value={tailorFilter}
              onChange={setTailorFilter}
              placeholder="All Tailors"
            />
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
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Contact</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">City</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Orders</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Total Spent</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-[#8b7a63]">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-50" />
                        <p>No customers found matching your criteria</p>
                        <button 
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCityFilter('all'); setTailorFilter('all'); }}
                          className="text-sm text-[#6f5b3e] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredCustomers.map((customer: Customer) => (
                  <tr key={customer.id} className="bg-transparent transition-colors duration-150 hover:bg-white/55 group">
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                        <img src={customer.img} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full" alt="" />
                        <span className="truncate">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex flex-col">
                        <span className="text-[0.75rem] text-[#8b7a63]">{customer.email}</span>
                        <span className="text-[0.7rem] text-[#8b7a63]/70">{customer.phone}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell">{customer.city}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{customer.tailor}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">{customer.orders}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">₹{customer.totalSpent.toLocaleString()}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap ${
                        customer.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30' : 
                        customer.status === 'pending' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30' : 
                        'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-[#6f5b3e]" />
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-[#6f5b3e]" onClick={() => handleEditCustomer(customer)} />
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
      
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        customer={editingCustomer}
        onSave={handleSaveCustomer}
      />
    </motion.div>
  );
}