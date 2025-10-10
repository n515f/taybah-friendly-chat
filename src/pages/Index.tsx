import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

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
        <Header language={language} onLanguageChange={setLanguage} />
        <main>
          <Hero language={language} />
          
          <div className="py-12 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4 text-gradient">
                {language === 'ar' ? 'ابدأ طلبك الآن' : 'Start Your Application Now'}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'قدم طلب التأشيرة الخاص بك بسهولة وتتبع حالته خطوة بخطوة'
                  : 'Submit your visa application easily and track its status step by step'}
              </p>
              <Button onClick={() => navigate('/visa-application')} size="lg" className="btn-nux text-lg px-8">
                <FileText className="h-5 w-5 ml-2" />
                {language === 'ar' ? 'قدم طلب تأشيرة' : 'Submit Visa Application'}
              </Button>
            </div>
          </div>
          
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
