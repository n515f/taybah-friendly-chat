import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const content = {
    ar: { title: '404', message: 'عذراً! الصفحة غير موجودة', home: 'العودة للرئيسية' },
    en: { title: '404', message: 'Oops! Page not found', home: 'Return to Home' }
  };

  const currentContent = content[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{currentContent.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{currentContent.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/80">
          {currentContent.home}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
