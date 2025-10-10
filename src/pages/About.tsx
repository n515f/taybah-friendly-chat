import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    ar: {
      title: 'من نحن',
      description: 'نحن شركة متخصصة في تقديم خدمات التأشيرات والإقامات في المملكة العربية السعودية. نسعى لتسهيل إجراءات الحصول على التأشيرات وتوفير أفضل الخدمات لعملائنا.',
      experience: 'خبرة واسعة',
      experienceDesc: 'سنوات من الخبرة في مجال التأشيرات والإقامات، مع فريق متخصص يضمن لك أفضل النتائج',
      team: 'فريق محترف',
      teamDesc: 'فريق عمل مدرب ومؤهل لتقديم أفضل الخدمات والاستشارات لعملائنا الكرام',
      global: 'خدمات شاملة',
      globalDesc: 'نغطي جميع أنواع التأشيرات والإقامات بأسعار تنافسية وإجراءات سريعة',
      quality: 'جودة عالية',
      qualityDesc: 'نلتزم بأعلى معايير الجودة في تقديم خدماتنا لضمان رضا عملائنا'
    },
    en: {
      title: 'About Us',
      description: 'We are a company specialized in providing visa and residency services in Saudi Arabia. We strive to facilitate visa procedures and provide the best services to our clients.',
      experience: 'Extensive Experience',
      experienceDesc: 'Years of experience in the field of visas and residencies, with a specialized team that ensures the best results',
      team: 'Professional Team',
      teamDesc: 'A trained and qualified team to provide the best services and consultations to our valued clients',
      global: 'Comprehensive Services',
      globalDesc: 'We cover all types of visas and residencies at competitive prices and fast procedures',
      quality: 'High Quality',
      qualityDesc: 'We are committed to the highest quality standards in providing our services to ensure customer satisfaction'
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={setLanguage} />
      <WhatsAppButton language={language} />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {currentContent.title}
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
            <p className="text-xl leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{currentContent.experience}</h3>
                <p className="text-muted-foreground">
                  {currentContent.experienceDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{currentContent.team}</h3>
                <p className="text-muted-foreground">
                  {currentContent.teamDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{currentContent.global}</h3>
                <p className="text-muted-foreground">
                  {currentContent.globalDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{currentContent.quality}</h3>
                <p className="text-muted-foreground">
                  {currentContent.qualityDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default About;
