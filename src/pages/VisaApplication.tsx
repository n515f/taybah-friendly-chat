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
  const [language] = useState<'ar' | 'en'>('ar');

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

  const visaTypes = {
    work: 'تأشيرة عمل',
    residence: 'إقامة',
    individual: 'فردية',
    family: 'عائلية',
    visit: 'زيارة',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={() => {}} />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 ml-2" />
            الرئيسية
          </Button>
          <ArrowRight className="h-4 w-4" />
          <span className="text-muted-foreground">تقديم طلب تأشيرة</span>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              تقديم طلب تأشيرة جديد
            </CardTitle>
            <CardDescription>
              املأ النموذج أدناه لتقديم طلب للحصول على تأشيرة
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
                      <FormLabel>الاسم الكامل *</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل الاسم الكامل" {...field} />
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
                        <FormLabel>البريد الإلكتروني *</FormLabel>
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
                        <FormLabel>رقم الهاتف *</FormLabel>
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
                      <FormLabel>نوع التأشيرة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع التأشيرة" />
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
                        <FormLabel>رقم جواز السفر *</FormLabel>
                        <FormControl>
                          <Input placeholder="رقم الجواز" {...field} />
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
                        <FormLabel>الجنسية *</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: مصري، سوري، أردني" {...field} />
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
                      <FormLabel>الغرض من التأشيرة</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اذكر الغرض من طلب التأشيرة..."
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
                    {isSubmitting ? 'جاري التقديم...' : 'تقديم الطلب'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    إلغاء
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