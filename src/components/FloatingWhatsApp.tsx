import React from 'react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        'Assalam o Alaikum, I am contacting Rajpoot Marriage Bureau Chakwal for a marriage proposal.'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 group"
      style={{
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
      }}
    >
      <span className="absolute -top-9 right-0 bg-neutral-900 text-neutral-100 text-[11px] font-semibold py-1 px-2.5 rounded-md border border-emerald-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
        WhatsApp Chakwal Office
      </span>

      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 32 32">
        <path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.6 1.9 6.5L3 29l7.2-2.1c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.3 1.3 1.4-4.1-.3-.4a10 10 0 0 1-1.6-5.4C5.7 10 10.3 5.5 16 5.5S26.3 10 26.3 15.5 21.7 25.8 16 25.8zm5.6-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 0 1-4.2-3.7c-.3-.6.3-.6.9-1.8.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.8.9 3.8.7.6-.1 1.8-.8 2.1-1.5s.3-1.3.2-1.5-.3-.2-.7-.4z" />
      </svg>
    </a>
  );
};
