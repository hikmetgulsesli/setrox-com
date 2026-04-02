interface ErrorBannerProps {
  message: string | null;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="w-full max-w-2xl mb-8 animate-fade-in">
      <div className="bg-red-900/30 backdrop-blur-xl border border-red-500/20 p-6 rounded-2xl flex items-start gap-5 shadow-[0_20px_50px_rgba(127,41,39,0.2)]">
        <div className="bg-red-800 p-3 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-red-400 font-bold text-3xl">gpp_maybe</span>
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-red-400 font-['Space_Grotesk'] font-bold text-lg leading-none">Hata</h2>
          <p className="text-red-200/90 text-sm leading-relaxed font-medium">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Kapat"
          className="text-red-400 hover:text-red-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
