export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface Measurement {
  id: string;
  customerId: string;
  customerName: string;
  type: string;
  measurements: Record<string, number>;
  notes?: string;
  createdAt: string;
}

export type StatTitle =
  | "Total Tailor Shops"
  | "Active Tailors"
  | "Inactive Tailors"
  | "Total Invoices Generated";

export interface StatCardProps {
  image: string;
  alt: StatTitle;
  style?: React.CSSProperties;
  subtitle?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'stable';
}

export interface GlobalFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: string;
  business: string;
  city: string;
  status: string;
}

export interface PremiumSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface LoaderProps {
  show: boolean;
}

export interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export interface ChartData {
  name: string;
  value?: number;
  revenue?: number;
  customers?: number;
  color?: string;
}

export interface SystemHealthMetric {
  label: string;
  value: string;
  status: 'online' | 'stable' | 'warning' | 'error';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}