import React from "react";
import Image from "next/image";

export interface StepCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-6 lg:p-7 flex items-center gap-4 sm:gap-5 transition-transform duration-200 hover:-translate-y-0.5">
      {/* Icon with light bordered box */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl border border-slate-200/90 flex items-center justify-center shrink-0 p-2 bg-slate-50/40">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={56}
          height={56}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
