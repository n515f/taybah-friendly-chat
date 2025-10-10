import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  const [language] = useState<'ar' | 'en'>('ar');

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={() => {}} />
      <WhatsAppButton language={language} />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            سياسة الخصوصية
          </h1>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">جمع المعلومات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نقوم بجمع المعلومات الشخصية التي تقدمها لنا طواعية عند التسجيل في موقعنا أو تقديم طلب للحصول على خدماتنا. تشمل هذه المعلومات: الاسم، البريد الإلكتروني، رقم الهاتف، رقم جواز السفر، والجنسية.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">استخدام المعلومات</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                نستخدم المعلومات التي نجمعها للأغراض التالية:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mr-4">
                <li>معالجة طلبات التأشيرات والإقامات</li>
                <li>التواصل معك بخصوص طلبك</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
                <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">حماية المعلومات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نتخذ تدابير أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الإفصاح. نستخدم تقنيات التشفير والبروتوكولات الآمنة لضمان سرية بياناتك.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">مشاركة المعلومات</h2>
              <p className="text-muted-foreground leading-relaxed">
                لا نقوم بمشاركة معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية: عند الحصول على موافقتك الصريحة، لتلبية المتطلبات القانونية، أو لمعالجة طلبات التأشيرات مع الجهات الحكومية المعنية.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                لديك الحق في:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mr-4">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح أو تحديث معلوماتك</li>
                <li>طلب حذف معلوماتك (وفقًا للقوانين المعمول بها)</li>
                <li>الاعتراض على معالجة معلوماتك</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">ملفات تعريف الارتباط (Cookies)</h2>
              <p className="text-muted-foreground leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك التحكم في استخدام ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">التواصل معنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية الخاصة بنا، يرجى التواصل معنا عبر الواتساب أو البريد الإلكتروني.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Privacy;
