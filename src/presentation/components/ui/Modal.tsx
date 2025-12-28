import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className={`relative w-full ${maxWidth} bg-[#111a22] border border-[#324d67] rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#324d67] bg-[#151f2b]/50 rounded-t-xl shrink-0">
          <div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">{title}</h2>
            {subtitle && <p className="text-[#92adc9] text-sm mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-[#92adc9] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#324d67]/50"
            aria-label="Close modal"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
