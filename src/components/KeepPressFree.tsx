import React from 'react';

interface KeepPressFreeProps {
  onOpenSupport: () => void;
  onOpenLogin: () => void;
}

export const KeepPressFree: React.FC<KeepPressFreeProps> = ({ onOpenSupport, onOpenLogin }) => {
  return (
    <div className="my-8 max-w-2xl mx-auto px-4">
      <div className="bg-[#0E5B44] text-white p-6 sm:p-8 rounded-xs text-center border-2 border-dashed border-emerald-400/40 relative shadow-md">
        <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-200 mb-1">
          KEEP
        </h2>
        <h3 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-1">
          OUR PRESS
        </h3>
        <h3 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
          TRULY FREE
        </h3>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6">
          True editorial freedom requires independent funding. In under a minute, you can start a monthly contribution that safeguards our work and keeps your reading experience clean. Thank you!
        </p>

        <button
          onClick={onOpenSupport}
          className="bg-[#A7F3D0] hover:bg-white text-[#064E3B] font-black text-sm uppercase tracking-wider py-3 px-8 rounded-sm shadow-sm transition-colors active:scale-98"
        >
          SUPPORT AMERICANA DIGEST
        </button>

        <div className="mt-4">
          <button
            onClick={onOpenLogin}
            className="text-xs text-emerald-200/90 hover:text-white underline transition-colors"
          >
            Already a member? Log in to hide these messages.
          </button>
        </div>
      </div>
    </div>
  );
};
