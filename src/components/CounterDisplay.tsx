interface CounterDisplayProps {
  count: number;
}

export function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#96a9e6] mb-4 block font-['Inter']">
        Aktif Oturum
      </span>
      <h2 className="text-[8rem] md:text-[12rem] font-black font-['Space_Grotesk'] text-[#dfe4ff] leading-none tracking-tighter">
        {count}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="w-2 h-2 rounded-full bg-[#4ae176] animate-pulse"></div>
        <span className="text-sm font-medium text-[#4ae176]/80 font-['Inter'] tracking-wide">
          Senkronize Edildi
        </span>
      </div>
    </div>
  );
}
