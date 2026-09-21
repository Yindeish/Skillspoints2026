import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  icon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-7 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-sm active:scale-[0.99]",
    outline:
      "bg-white border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50/70 active:scale-[0.99]",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="ml-2 flex items-center">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {content}
    </button>
  );
};

export default Button;
