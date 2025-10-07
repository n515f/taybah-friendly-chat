import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  language: 'ar' | 'en';
}

const Auth = ({ language }: AuthProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    ar: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      submit: 'متابعة',
      switchToSignup: 'ليس لديك حساب؟ سجل الآن',
      switchToLogin: 'لديك حساب؟ سجل دخولك',
      success: 'تم بنجاح!',
      error: 'حدث خطأ'
    },
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      submit: 'Continue',
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: 'Have an account? Login',
      success: 'Success!',
      error: 'Error occurred'
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        toast({
          title: currentContent.success,
          description: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully'
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        });

        if (error) throw error;

        toast({
          title: currentContent.success,
          description: language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully'
        });
      }
    } catch (error: any) {
      toast({
        title: currentContent.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 shadow-elegant">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Nux.T Visa
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? currentContent.login : currentContent.signup}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {currentContent.fullName}
                </label>
                <div className="relative">
                  <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                {currentContent.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {currentContent.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-brand text-white rounded-lg font-medium hover:shadow-elegant transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {currentContent.submit}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isLogin ? currentContent.switchToSignup : currentContent.switchToLogin}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
