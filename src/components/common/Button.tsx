import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'gold' | 'police' | 'danger' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  children,
  onClick,
  disabled,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading) {
      sound.playButtonClick();
      onClick?.(e);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5 tracking-wide',
  }[size];

  const variantClasses = {
    gold: 'bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] border border-[#FFE082]',
    police: 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-[#93C5FD]',
    danger: 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] border border-[#FCA5A5]',
    secondary: 'bg-[#111722]/80 hover:bg-[#182232] text-[#F8FAFC] border border-white/10 hover:border-[#D4AF37]/50 shadow-lg backdrop-blur-md',
    ghost: 'bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-white border border-transparent hover:border-white/10',
  }[variant];

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`inline-flex items-center justify-center transition-all duration-200 uppercase font-sans select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : ''
      } ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
