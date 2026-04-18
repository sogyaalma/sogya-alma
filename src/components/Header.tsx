"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, ShoppingCart, User, Globe, ChevronDown, Menu, X, Moon, Sun, LogOut, History, CreditCard } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('AR');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Initial user fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const toggleLang = () => {
    // Multi-language support — coming soon
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const performSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar - Official Look from Legacy */}
      <div className="bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 py-2 hidden md:block">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center text-[13px] text-gray-500 dark:text-gray-400 font-medium">
          <div className="flex items-center gap-4">
            <span className="bg-primary/5 dark:bg-primary/10 text-primary px-2 py-0.5 rounded">مرخصة من مركز الوطني لتنمية القطاع غير الربحي برقم (1123)</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-primary transition-colors flex items-center gap-1"><Globe size={14} /> English</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-primary transition-colors flex items-center gap-1">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
            </button>
          </div>
        </div>
      </div>

      <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-[72px] flex items-center ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4 md:px-0 w-full flex justify-between items-center h-full max-w-7xl">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center">
            <button className="md:hidden text-gray-500 hover:text-primary ml-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          
          <Link href="/" className="flex items-center gap-2 lg:ml-12 md:ml-4 group">
            <img 
              src="/logo.svg" 
              alt="جمعية سقيا الماء" 
              className="h-[50px] md:h-[65px] w-auto transition-transform group-hover:scale-105" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full flex-grow">
          <Link href="/" className="nav-link text-gray-600">الرئيسية</Link>

          {/* من نحن Dropdown */}
          <div className="group h-full flex items-center relative">
            <button className="nav-link text-gray-600 gap-1 flex items-center">
              من نحن <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />
            </button>
            <div className="absolute top-full right-0 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg p-2 z-50 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
              <Link href="/about" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary rounded-lg font-bold">عن الجمعية والهيكل التنظيمي</Link>
              <Link href="/about?tab=policies" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary rounded-lg">اللوائح والسياسات</Link>
              <Link href="/about?tab=financials" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary rounded-lg">القوائم المالية والتقارير</Link>
              <Link href="/about?tab=opendata" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary rounded-lg">البيانات المفتوحة</Link>
              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
              <Link href="/about/branches" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary rounded-lg">فروع الجمعية</Link>
            </div>
          </div>

          <Link href="/opportunities" className="nav-link text-gray-600">منصة التبرعات</Link>
          <Link href="/services" className="nav-link text-gray-600">الخدمات الإلكترونية</Link>
          <Link href="/media" className="nav-link text-gray-600">المكتبة</Link>
          <Link href="/contact" className="nav-link text-gray-600">اتصل بنا</Link>
        </nav>

        {/* Actions (Login, Cart, Search) */}
        <div className="flex items-center justify-end h-full">
          
          <div className="hidden lg:flex items-center gap-2 relative pl-4 border-l border-gray-100 dark:border-gray-700">
            {showSearch && (
              <div className="absolute top-14 left-0 bg-white dark:bg-midnight-surface shadow-lg border border-gray-100 dark:border-midnight-border rounded-xl p-2 w-64 z-50 animate-in fade-in zoom-in duration-200">
                <form onSubmit={handleSearchSubmit}>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الموقع..." 
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-midnight-border rounded-lg py-2 px-4 outline-none focus:border-primary text-sm dark:text-white" 
                    autoFocus 
                  />
                </form>
              </div>
            )}

            <button onClick={() => setShowSearch(!showSearch)} className={`p-2 rounded-full transition-colors ${showSearch ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:text-gray-400'}`}>
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 pr-4 relative">
            <Link href="/cart" className="relative text-primary hover:text-primary-dark transition-colors p-2">
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute top-0 right-0 bg-secondary text-white text-[11px] font-bold w-4 h-4 flex items-center justify-center rounded-full pointer-events-none translate-x-1 -translate-y-1">
                0
              </span>
            </Link>

            <div className="hidden md:flex items-center h-full relative" id="login-btn">
              {user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-bold text-[15px] px-3 py-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors">
                       <User size={18} strokeWidth={2} />
                    </div>
                    <span>{user.user_metadata?.full_name || user.email}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-[60px] left-0 w-56 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                       <ul className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                          <li>
                            <Link href="/auth/dashboard" className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                               <History size={16} />
                               سجل التبرعات
                            </Link>
                          </li>
                          <li>
                            <Link href="/auth/dashboard" className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                               <CreditCard size={16} />
                               استقطاع البطاقات
                            </Link>
                          </li>
                          <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                          <li>
                            <button 
                              onClick={async () => {
                                await supabase.auth.signOut();
                                router.refresh();
                                setShowUserMenu(false);
                              }} 
                              className="flex items-center gap-2 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg w-full text-right"
                            >
                               <LogOut size={16} />
                               تسجيل الخروج
                            </button>
                          </li>
                       </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth/login" className="flex items-center gap-2 bg-primary text-white hover:bg-primary-dark transition-all font-bold text-[14px] px-5 py-2.5 rounded-xl mr-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                  <CreditCard size={18} strokeWidth={2} />
                  شاركنا الأجر
                </Link>
              )}
            </div>
            
            <Link
              href="/auth/dashboard"
              className="md:hidden text-gray-600 hover:text-primary transition-colors"
            >
              <User size={22} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Navigation Drawer - DEF-015 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-40">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          {/* Drawer */}
          <nav className="absolute top-0 right-0 w-[280px] h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 overflow-y-auto">
            <div className="flex flex-col p-6 gap-1">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">الرئيسية</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">من نحن</Link>
              <Link href="/opportunities" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">منصة جمع التبرعات</Link>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">الخدمات الالكترونية</Link>
              <Link href="/about/branches" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">الفروع</Link>
              <Link href="/opportunities" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">مشاريعنا</Link>
              <Link href="/media" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">المكتبة</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">اتصل بنا</Link>
              
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-3" />

              {/* Mobile Search */}
              <form onSubmit={(e) => { e.preventDefault(); if(searchQuery.trim()) { router.push(`/search?q=${encodeURIComponent(searchQuery)}`); setIsMobileMenuOpen(false); } }} className="px-1">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الموقع..." 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-midnight-border rounded-xl py-3 px-4 outline-none focus:border-primary text-sm dark:text-white" 
                />
              </form>

              {/* Mobile Dark Mode Toggle */}
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <Sun size={18} className="hidden dark:block" />
                <Moon size={18} className="block dark:hidden" />
                {theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
              </button>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-3" />
              
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-dark transition-colors">
                <User size={18} />
                تسجيل الدخول
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
