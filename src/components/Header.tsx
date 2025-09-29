import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    ar: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'خدماتنا', href: '#services' },
      { label: 'كيف نعمل', href: '#process' },
      { label: 'الأسئلة الشائعة', href: '#faq' },
      { label: 'تواصل معنا', href: '#contact' }
    ],
    en: [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'How We Work', href: '#process' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' }
    ]
  };

  const currentNav = navItems[language];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-glass' 
          : 'bg-transparent'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Nux.T</h1>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'إصدار التأشيرات' : 'Visa Services'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          {currentNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
            className="hidden md:flex"
          >
            <Globe className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
            {language === 'ar' ? 'EN' : 'عربي'}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* CTA Button */}
          <Button className="btn-nux hidden md:flex">
            {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-glass-border">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {currentNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
                  className="w-full justify-start mb-2"
                >
                  <Globe className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  {language === 'ar' ? 'English' : 'عربي'}
                </Button>
                <Button className="btn-nux w-full">
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;