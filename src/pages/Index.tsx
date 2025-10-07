import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'en' || 'ar';
    setLanguage(savedLang);
    
    // Set document direction and lang
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, []);

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main>
          <Hero language={language} />
          <Services language={language} />
          <Process language={language} />
          <FAQ language={language} />
        </main>
        <Footer language={language} />
        <ChatWidget language={language} />
        <WhatsAppButton language={language} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
