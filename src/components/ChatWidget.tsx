import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  message: string;
  is_admin_reply: boolean;
  created_at: string;
  user_name: string;
}

interface ChatWidgetProps {
  language: 'ar' | 'en';
}

const ChatWidget = ({ language }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const content = {
    ar: {
      title: 'دردشة مباشرة',
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال',
      namePlaceholder: 'أدخل اسمك',
      start: 'ابدأ الدردشة',
      close: 'إغلاق'
    },
    en: {
      title: 'Live Chat',
      placeholder: 'Type your message...',
      send: 'Send',
      namePlaceholder: 'Enter your name',
      start: 'Start Chat',
      close: 'Close'
    }
  };

  const currentContent = content[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen || !isNameSet) return;

    const channel = supabase
      .channel('support_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages'
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, isNameSet]);

  const handleStartChat = async () => {
    if (!userName.trim()) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'الرجاء إدخال اسمك' : 'Please enter your name',
        variant: 'destructive'
      });
      return;
    }

    setIsNameSet(true);

    // Load previous messages
    const { data } = await supabase
      .from('support_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('support_messages')
      .insert({
        user_name: userName,
        message: newMessage,
        is_admin_reply: false
      });

    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل إرسال الرسالة' : 'Failed to send message',
        variant: 'destructive'
      });
      return;
    }

    setNewMessage('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-elegant flex items-center justify-center transition-all hover:scale-110"
        aria-label={currentContent.title}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 left-6 rtl:left-auto rtl:right-6 z-50 w-96 h-[500px] bg-surface rounded-2xl shadow-elegant border border-border/50 flex flex-col overflow-hidden animate-scale-in"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="bg-gradient-brand p-4 text-white">
            <h3 className="font-bold text-lg">{currentContent.title}</h3>
          </div>

          {/* Name Input or Messages */}
          {!isNameSet ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={currentContent.namePlaceholder}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleStartChat()}
              />
              <button
                onClick={handleStartChat}
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                {currentContent.start}
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_admin_reply ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.is_admin_reply
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-white'
                      }`}
                    >
                      <p className="text-xs font-medium mb-1 opacity-80">{msg.user_name}</p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={currentContent.placeholder}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
