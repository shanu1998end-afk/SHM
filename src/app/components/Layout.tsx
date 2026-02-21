import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Activity,
  ClipboardList,
  Radio,
  AlertTriangle,
  CloudRain,
  Settings,
  User,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ndmaLogo from '../../../NDMA Logo.png';
import bendcreteLogo from '../../assets/bendcrete-logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/inventory', label: 'Asset Inventory', icon: Building2 },
  { path: '/monitoring', label: 'Infra Monitoring', icon: Activity },
  { path: '/inspections', label: 'Inspections & Reports', icon: ClipboardList },
  { path: '/sensors', label: 'Sensors & Data', icon: Radio },
  { path: '/alerts', label: 'Alerts & Risk Levels', icon: AlertTriangle },
  { path: '/disaster', label: 'Post-Disaster Assessment', icon: CloudRain },
  { path: '/admin', label: 'Admin / Settings', icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [userRole, setUserRole] = React.useState('Engineer');
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-PK', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-PK', {
      timeZone: 'Asia/Karachi',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-md">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                onClick={() => setMobileNavOpen((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-200">
                <img src={ndmaLogo} alt="NDMA logo" className="h-8 w-8 rounded-md object-contain" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-semibold text-gray-900">
                  Infra Early Warning System
                </h1>
                <p className="text-xs md:text-sm text-gray-500">Pakistan National Infrastructure Monitoring Portal</p>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {/* Organization Selector */}
              <div className="flex items-center gap-2">
                  <label className="text-sm text-blue-800">Organization:</label>
                <Select defaultValue="ndma">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ndma">NDMA</SelectItem>
                    <SelectItem value="nha">NHA</SelectItem>
                    <SelectItem value="pwd">PWD</SelectItem>
                    <SelectItem value="provincial">Provincial C&W</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date & Time */}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{formatTime(currentTime)} PKT</div>
                <div className="text-xs text-gray-500">{formatDate(currentTime)}</div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-indigo-700" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Engr. Ahmed Khan</div>
                  <div className="text-xs text-gray-500">{userRole}</div>
                </div>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {mobileNavOpen && (
          <button
            className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          />
        )}
        {/* Sidebar */}
        <aside
          className={`
            w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 min-h-[calc(100vh-81px)] z-40
            fixed lg:static top-[81px] left-0 transition-transform duration-200
            ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 h-full flex flex-col">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm'
                          : 'text-slate-100 hover:bg-slate-700/70'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t border-slate-700 pt-4">
              <a
                href="https://bendcretecs.com/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-slate-600 bg-slate-800/90 p-3 hover:bg-slate-700/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-md p-1.5 shrink-0">
                    <img src={bendcreteLogo} alt="Bendcrete logo" className="h-10 w-10 object-contain" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-300">Powered by</p>
                    <p className="text-sm font-semibold text-white leading-tight">Bendcrete (Pvt.) Ltd.</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-cyan-300 underline underline-offset-2">https://bendcretecs.com/</div>
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}