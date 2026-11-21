import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map(toast => {
        let bg = 'bg-white border-[#E2E6F0] text-[#17213D]';
        let Icon = Info;
        let iconColor = 'text-[#6658D3]';

        if (toast.type === 'success') {
          bg = 'bg-white border-[#A3E8DC] text-[#17213D] shadow-lg';
          Icon = CheckCircle2;
          iconColor = 'text-[#159B85]';
        } else if (toast.type === 'error') {
          bg = 'bg-white border-[#F6B8BD] text-[#17213D] shadow-lg';
          Icon = AlertCircle;
          iconColor = 'text-[#E16D78]';
        } else if (toast.type === 'warning') {
          bg = 'bg-white border-[#F8D8A8] text-[#17213D] shadow-lg';
          Icon = AlertTriangle;
          iconColor = 'text-[#E6A448]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-80 items-center justify-between rounded-card border p-3.5 shadow-popover animate-fade-in ${bg}`}
          >
            <div className="flex items-start space-x-2.5">
              <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconColor}`} />
              <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
