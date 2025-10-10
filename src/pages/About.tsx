import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Globe, CheckCircle } from 'lucide-react';

const About = () => {
  const [language] = useState<'ar' | 'en'>('ar');

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={() => {}} />
      <WhatsAppButton language={language} />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            من نحن
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
            <p className="text-xl leading-relaxed">
              نحن شركة متخصصة في تقديم خدمات التأشيرات والإقامات في المملكة العربية السعودية. نسعى لتسهيل إجراءات الحصول على التأشيرات وتوفير أفضل الخدمات لعملائنا.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">خبرة واسعة</h3>
                <p className="text-muted-foreground">
                  سنوات من الخبرة في مجال التأشيرات والإقامات، مع فريق متخصص يضمن لك أفضل النتائج
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">فريق محترف</h3>
                <p className="text-muted-foreground">
                  فريق عمل مدرب ومؤهل لتقديم أفضل الخدمات والاستشارات لعملائنا الكرام
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">تغطية شاملة</h3>
                <p className="text-muted-foreground">
                  نقدم خدماتنا لجميع أنواع التأشيرات والإقامات في المملكة العربية السعودية
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">ضمان الجودة</h3>
                <p className="text-muted-foreground">
                  نلتزم بتقديم خدمات عالية الجودة مع متابعة دقيقة لكل طلب حتى إتمامه بنجاح
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                أن نكون الخيار الأول والأكثر موثوقية في مجال خدمات التأشيرات والإقامات في المملكة العربية السعودية.
              </p>
              <h2 className="text-2xl font-bold mb-4 mt-6">رسالتنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                تقديم خدمات متميزة وموثوقة في مجال التأشيرات والإقامات، مع التركيز على رضا العملاء وتسهيل إجراءاتهم بكل احترافية وشفافية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default About;
