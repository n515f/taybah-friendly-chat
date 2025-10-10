import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Home, Shield, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  visa_type: string;
  passport_number: string;
  nationality: string;
  purpose?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingApp, setEditingApp] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      toast({
        title: language === 'ar' ? 'غير مصرح' : 'Unauthorized',
        description: language === 'ar' ? 'ليس لديك صلاحية للوصول إلى لوحة الإدارة' : 'You do not have permission to access the admin panel',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    setIsAdmin(true);
    fetchApplications();
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('visa_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApplications(data);
      const initialNotes: { [key: string]: string } = {};
      const initialStatus: { [key: string]: string } = {};
      data.forEach(app => {
        initialNotes[app.id] = app.admin_notes || '';
        initialStatus[app.id] = app.status;
      });
      setNotes(initialNotes);
      setStatusUpdates(initialStatus);
    }
    setLoading(false);
  };

  const updateApplication = async (appId: string) => {
    const status = statusUpdates[appId] as 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
    const { error } = await supabase
      .from('visa_applications')
      .update({
        status: status,
        admin_notes: notes[appId],
      })
      .eq('id', appId);

    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل تحديث الطلب' : 'Failed to update application',
        variant: 'destructive',
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم التحديث' : 'Updated',
        description: language === 'ar' ? 'تم تحديث الطلب بنجاح' : 'Application updated successfully',
      });
      setEditingApp(null);
      fetchApplications();
    }
  };

  const content = {
    ar: {
      home: 'الرئيسية',
      adminPanel: 'لوحة تحكم الإدارة',
      visaType: 'نوع التأشيرة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      passportNumber: 'رقم الجواز',
      nationality: 'الجنسية',
      submissionDate: 'تاريخ التقديم',
      purpose: 'الغرض',
      updateStatus: 'تحديث الحالة',
      adminNotes: 'ملاحظات الإدارة',
      addNotes: 'أضف ملاحظات...',
      saveChanges: 'حفظ التغييرات',
      cancel: 'إلغاء',
      updateApplication: 'تحديث الطلب',
      loading: 'جاري التحميل...'
    },
    en: {
      home: 'Home',
      adminPanel: 'Admin Dashboard',
      visaType: 'Visa Type',
      email: 'Email',
      phone: 'Phone',
      passportNumber: 'Passport Number',
      nationality: 'Nationality',
      submissionDate: 'Submission Date',
      purpose: 'Purpose',
      updateStatus: 'Update Status',
      adminNotes: 'Admin Notes',
      addNotes: 'Add notes...',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      updateApplication: 'Update Application',
      loading: 'Loading...'
    }
  };

  const statusConfig = language === 'ar' ? {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500', icon: Clock },
    under_review: { label: 'قيد المراجعة', color: 'bg-blue-500', icon: AlertCircle },
    approved: { label: 'تمت الموافقة', color: 'bg-green-500', icon: CheckCircle },
    rejected: { label: 'مرفوض', color: 'bg-red-500', icon: XCircle },
    completed: { label: 'مكتمل', color: 'bg-green-600', icon: CheckCircle },
  } : {
    pending: { label: 'Pending', color: 'bg-yellow-500', icon: Clock },
    under_review: { label: 'Under Review', color: 'bg-blue-500', icon: AlertCircle },
    approved: { label: 'Approved', color: 'bg-green-500', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-500', icon: XCircle },
    completed: { label: 'Completed', color: 'bg-green-600', icon: CheckCircle },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header language={language} onLanguageChange={setLanguage} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">{currentContent.loading}</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Home className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {currentContent.home}
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{currentContent.adminPanel}</h1>
        </div>

        <div className="grid gap-4">
          {applications.map((app) => {
            const status = statusConfig[app.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isEditing = editingApp === app.id;

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.visaType}</p>
                      <p className="font-medium">{visaTypes[app.visa_type as keyof typeof visaTypes]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.email}</p>
                      <p className="font-medium">{app.applicant_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.phone}</p>
                      <p className="font-medium">{app.applicant_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.passportNumber}</p>
                      <p className="font-medium">{app.passport_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.nationality}</p>
                      <p className="font-medium">{app.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{currentContent.submissionDate}</p>
                      <p className="font-medium">
                        {format(new Date(app.created_at), 'dd MMMM yyyy', { locale: language === 'ar' ? ar : enUS })}
                      </p>
                    </div>
                  </div>

                  {app.purpose && (
                    <div className="mb-4 p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">{currentContent.purpose}</p>
                      <p className="text-sm">{app.purpose}</p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="space-y-4 mt-4 p-4 border rounded-md bg-card">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{currentContent.updateStatus}</label>
                        <Select 
                          value={statusUpdates[app.id]} 
                          onValueChange={(value) => setStatusUpdates({...statusUpdates, [app.id]: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">{currentContent.adminNotes}</label>
                        <Textarea
                          value={notes[app.id]}
                          onChange={(e) => setNotes({...notes, [app.id]: e.target.value})}
                          placeholder={currentContent.addNotes}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => updateApplication(app.id)}>
                          {currentContent.saveChanges}
                        </Button>
                        <Button variant="outline" onClick={() => setEditingApp(null)}>
                          {currentContent.cancel}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      {app.admin_notes && (
                        <div className="mb-3 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground mb-1">{currentContent.adminNotes}</p>
                          <p className="text-sm">{app.admin_notes}</p>
                        </div>
                      )}
                      <Button onClick={() => setEditingApp(app.id)} variant="outline" size="sm">
                        {currentContent.updateApplication}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;