import {
  Home,
  CheckCircle,
  ShoppingBag,
  LayoutGrid,
  Sparkles,
  Globe,
  Wallet,
  Ticket,
  Users as UserGroupIcon,
  ArrowRightLeft,
  BarChart2,
  Settings,
  HelpCircle,
  UserCircle
} from 'lucide-react';
import { MenuItem, Product } from './types.ts';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'checkout', label: 'Checkout', icon: CheckCircle },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '25', badgeColor: 'green' },
  { id: 'products', label: 'Products', icon: LayoutGrid },
  { id: 'smart-assistant', label: 'Smart Assistant', icon: Sparkles, badge: 'BETA', badgeColor: 'blue' },
  { id: 'online-catalog', label: 'Online Catalog', icon: Globe },
  { id: 'finance', label: 'Finance', icon: Wallet },
  { id: 'coupons', label: 'Coupons', icon: Ticket, badge: 'NEW', badgeColor: 'green' },
  { id: 'customers', label: 'Customers', icon: UserGroupIcon },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'users', label: 'Users', icon: UserGroupIcon },
  { id: 'account', label: 'Account', icon: UserCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export const MOCK_SALES_DATA = {
  today: 36643.00,
  saleCount: 20,
  yesterday: 86123.31,
  thisMonth: 3269223.61
};

export const MOCK_STOCK_DATA = {
  registeredProducts: 856,
  amountInStock: 1749434.70,
  availableItems: 190
};

export const CATEGORIES = ['ALL', 'HIGHLIGHTS', 'CHOCOLATE', 'COFFEE AND BEANS', 'SUPPLIES', 'PURREE', 'PACKAGING'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '1kg Aviko Shoestring Fries 7mm',
    code: '6973131179669',
    price: 129.00,
    stock: 79,
    expiry: 'May 4, 2027',
    category: 'FROZEN FRIES & MOZZA',
    imageColor: 'bg-yellow-100',
    isStarred: true
  },
  {
    id: '2',
    name: 'Aviko BOX i Shoestring Fries 7mm 1kgx10',
    code: '6973131179669',
    price: 990.00,
    stock: 126,
    expiry: 'Jun 9, 2027',
    category: 'FROZEN FRIES & MOZZA',
    imageColor: 'bg-blue-100',
    isStarred: true
  },
  {
    id: '3',
    name: "Beryl's 1kg 8800cts Dark Chocolate Chips",
    code: '9556247518194',
    price: 350.00,
    stock: 13,
    expiry: 'Jan 9, 2027',
    category: 'TOPPINGS & SINKERS',
    imageColor: 'bg-amber-800',
    isStarred: true
  },
  {
    id: '4',
    name: "Beryl's 200g Bittersweet Compound",
    code: 'hg bb',
    price: 99.00,
    stock: 45,
    category: 'CHOCOLATE',
    imageColor: 'bg-amber-900',
    isStarred: true
  },
  {
    id: '5',
    name: "Beryl's 200g Dark Chocolate Compound",
    code: '9556247520227',
    price: 99.00,
    stock: 21,
    expiry: 'Feb 4, 2027',
    category: 'CHOCOLATE',
    imageColor: 'bg-amber-950',
    isStarred: true
  },
  {
    id: '6',
    name: "Beryl's 200g Milk Chocolate Compound",
    code: '9556247520234',
    price: 99.00,
    stock: 15,
    expiry: 'Feb 4, 2027',
    category: 'CHOCOLATE',
    imageColor: 'bg-orange-800',
    isStarred: true
  },
  {
    id: '7',
    name: "Beryl's 200g Semisweet Compound",
    code: 'hg bb',
    price: 99.00,
    stock: 32,
    category: 'CHOCOLATE',
    imageColor: 'bg-amber-700',
    isStarred: true
  }
];