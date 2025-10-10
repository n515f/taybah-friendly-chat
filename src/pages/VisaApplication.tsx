import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, ArrowRight, Home } from 'lucide-react';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  applicant_name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  applicant_email: z.string().email('البريد الإلكتروني غير صحيح'),
  applicant_phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  visa_type: z.enum(['work', 'residence', 'individual', 'family', 'visit']),
  passport_number: z.string().min(5, 'رقم جواز السفر مطلوب'),
  nationality: z.string().min(2, 'الجنسية مطلوبة'),
  purpose: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const VisaApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, setLanguage } = useLanguage();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicant_name: '',
      applicant_email: '',
      applicant_phone: '',
      passport_number: '',
      nationality: '',
      purpose: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: 'خطأ',
        description: 'يجب تسجيل الدخول لتقديم طلب',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    const { error } = await supabase.from('visa_applications').insert([{
      applicant_name: data.applicant_name,
      applicant_email: data.applicant_email,
      applicant_phone: data.applicant_phone,
      visa_type: data.visa_type,
      passport_number: data.passport_number,
      nationality: data.nationality,
      purpose: data.purpose,
      user_id: user.id,
    }]);

    if (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تقديم الطلب',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'تم التقديم بنجاح',
        description: 'سيتم مراجعة طلبك قريباً',
      });
      navigate('/my-applications');
    }
    
    setIsSubmitting(false);
  };


  const content = {
    ar: {
      title: 'تقديم طلب تأشيرة جديد',
      description: 'املأ النموذج أدناه لتقديم طلب للحصول على تأشيرة',
      home: 'الرئيسية',
      submitApplication: 'تقديم طلب تأشيرة',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      visaType: 'نوع التأشيرة',
      selectVisaType: 'اختر نوع التأشيرة',
      passportNumber: 'رقم جواز السفر',
      nationality: 'الجنسية',
      purpose: 'الغرض من التأشيرة',
      purposePlaceholder: 'اذكر الغرض من طلب التأشيرة...',
      submit: 'تقديم الطلب',
      submitting: 'جاري التقديم...',
      cancel: 'إلغاء'
    },
    en: {
      title: 'Submit New Visa Application',
      description: 'Fill out the form below to apply for a visa',
      home: 'Home',
      submitApplication: 'Submit Visa Application',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      visaType: 'Visa Type',
      selectVisaType: 'Select visa type',
      passportNumber: 'Passport Number',
      nationality: 'Nationality',
      purpose: 'Purpose of Visa',
      purposePlaceholder: 'State the purpose of the visa application...',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      cancel: 'Cancel'
    }
  };

  const visaTypes = language === 'ar' ? {
    work: 'تأشيرة عمل',
    residence: 'إقامة',
    individual: 'فردية',
    family: 'عائلية',
    visit: 'زيارة',
  } : {
    work: 'Work Visa',
    residence: 'Residence',
    individual: 'Individual',
    family: 'Family',
    visit: 'Visit',
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Home className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {currentContent.home}
          </Button>
          <ArrowRight className="h-4 w-4" />
          <span className="text-muted-foreground">{currentContent.submitApplication}</span>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              {currentContent.title}
            </CardTitle>
            <CardDescription>
              {currentContent.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="applicant_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.fullName} *</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'ar' ? 'أدخل الاسم الكامل' : 'Enter full name'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="applicant_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{currentContent.email} *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicant_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{currentContent.phone} *</FormLabel>
                        <FormControl>
                          <Input placeholder="+966XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="visa_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.visaType} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={currentContent.selectVisaType} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(visaTypes).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="passport_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{currentContent.passportNumber} *</FormLabel>
                        <FormControl>
                          <Input placeholder={language === 'ar' ? 'رقم الجواز' : 'Passport number'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{currentContent.nationality} *</FormLabel>
                        <FormControl>
                          <Input placeholder={language === 'ar' ? 'مثال: مصري، سوري، أردني' : 'Example: Egyptian, Syrian, Jordanian'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentContent.purpose}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={currentContent.purposePlaceholder}
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? currentContent.submitting : currentContent.submit}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    {currentContent.cancel}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisaApplication;