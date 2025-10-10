import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={setLanguage} />
      <WhatsAppButton language={language} />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            الشروط والأحكام
          </h1>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">قبول الشروط</h2>
              <p className="text-muted-foreground leading-relaxed">
                باستخدامك لهذا الموقع وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">الخدمات المقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                نقدم خدمات استشارية ومساعدة في إجراءات التأشيرات والإقامات في المملكة العربية السعودية. نحن نسعى لتسهيل العملية، لكننا لا نضمن الموافقة النهائية على الطلبات حيث أن القرار النهائي يعود للجهات الحكومية المختصة.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">مسؤوليات العميل</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                يلتزم العميل بما يلي:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mr-4">
                <li>تقديم معلومات صحيحة ودقيقة</li>
                <li>توفير جميع المستندات المطلوبة في الوقت المناسب</li>
                <li>دفع الرسوم المستحقة في المواعيد المحددة</li>
                <li>الامتثال لجميع القوانين واللوائح ذات الصلة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">الرسوم والمدفوعات</h2>
              <p className="text-muted-foreground leading-relaxed">
                جميع الرسوم المذكورة على الموقع هي رسوم استرشادية وقد تختلف حسب نوع الخدمة والحالة. الرسوم المدفوعة غير قابلة للاسترداد في حالة رفض الطلب من الجهات الحكومية، حيث أننا نقدم خدمات استشارية ومساعدة في الإجراءات فقط.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">إلغاء الخدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                يمكن للعميل إلغاء الطلب قبل البدء في معالجته مع استرداد 50% من الرسوم المدفوعة. بعد البدء في المعالجة، لا يمكن استرداد الرسوم.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">المسؤولية القانونية</h2>
              <p className="text-muted-foreground leading-relaxed">
                نحن غير مسؤولين عن أي تأخير أو رفض من قبل الجهات الحكومية. دورنا يقتصر على تقديم الاستشارات والمساعدة في إعداد وتقديم الطلبات وفقًا للمتطلبات الرسمية.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">السرية</h2>
              <p className="text-muted-foreground leading-relaxed">
                نلتزم بالحفاظ على سرية جميع المعلومات والمستندات المقدمة من قبل عملائنا، ولن نشاركها مع أي طرف ثالث إلا بموافقة العميل أو عند الضرورة القانونية.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">التعديلات على الشروط</h2>
              <p className="text-muted-foreground leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة، ويعتبر استمرارك في استخدام خدماتنا بمثابة موافقة على الشروط المعدلة.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">القانون الحاكم</h2>
              <p className="text-muted-foreground leading-relaxed">
                تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية، وأي نزاع ينشأ عنها يتم حله وفقًا للقوانين السعودية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Terms;
