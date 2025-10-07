import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  language: 'ar' | 'en';
}

const WhatsAppButton = ({ language }: WhatsAppButtonProps) => {
  const phoneNumber = '966500000000'; // Replace with actual number
  const message = language === 'ar' 
    ? 'مرحباً، أرغب في الاستفسار عن خدماتكم'
    : 'Hello, I would like to inquire about your services';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 left-6 rtl:left-auto rtl:right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-elegant flex items-center justify-center transition-all hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
