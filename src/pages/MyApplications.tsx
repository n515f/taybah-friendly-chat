import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Home, ArrowRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Application {
  id: string;
  applicant_name: string;
  visa_type: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [language] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchApplications();
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('visa_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
    setLoading(false);
  };

  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500', icon: Clock },
    under_review: { label: 'قيد المراجعة', color: 'bg-blue-500', icon: AlertCircle },
    approved: { label: 'تمت الموافقة', color: 'bg-green-500', icon: CheckCircle },
    rejected: { label: 'مرفوض', color: 'bg-red-500', icon: XCircle },
    completed: { label: 'مكتمل', color: 'bg-green-600', icon: CheckCircle },
  };

  const visaTypes = {
    work: 'تأشيرة عمل',
    residence: 'إقامة',
    individual: 'فردية',
    family: 'عائلية',
    visit: 'زيارة',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={() => {}} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

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
          <span className="text-muted-foreground">طلباتي</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">طلبات التأشيرات</h1>
          <Button onClick={() => navigate('/visa-application')}>
            <FileText className="h-4 w-4 ml-2" />
            طلب جديد
          </Button>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">لا توجد طلبات بعد</p>
              <Button onClick={() => navigate('/visa-application')}>
                تقديم طلب جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => {
              const status = statusConfig[app.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{app.applicant_name}</CardTitle>
                      <Badge className={`${status.color} text-white`}>
                        <StatusIcon className="h-3 w-3 ml-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">نوع التأشيرة</p>
                        <p className="font-medium">{visaTypes[app.visa_type as keyof typeof visaTypes]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                        <p className="font-medium">
                          {format(new Date(app.created_at), 'dd MMMM yyyy', { locale: ar })}
                        </p>
                      </div>
                    </div>
                    {app.admin_notes && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm text-muted-foreground mb-1">ملاحظات الإدارة</p>
                        <p className="text-sm">{app.admin_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;