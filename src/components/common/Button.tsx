import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
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
    sm: 'px-3.5 py-1.5 text-xs font-bold rounded-xl gap-1.5 tracking-wide',
    md: 'px-5 py-2.5 text-sm font-bold rounded-2xl gap-2 tracking-wider',
    lg: 'px-7 py-3.5 text-base font-extrabold rounded-2xl gap-2.5 tracking-widest',
  }[size];

  const variantClasses = {
    // Primary: Royal Blue with subtle gold edge and white/gold text
    primary:
      'bg-[#173B67] hover:bg-[#0F2847] text-white border border-[#D8BD6A]/50 shadow-[0_4px_16px_rgba(23,59,103,0.22)] hover:shadow-[0_6px_22px_rgba(23,59,103,0.35)]',
    // Secondary: Outlined Royal Blue with ivory fill and champagne hover
    secondary:
      'bg-[#FAF8F2]/90 hover:bg-[#FAF3DE] text-[#173B67] border-2 border-[#173B67] shadow-[0_2px_10px_rgba(23,59,103,0.08)] hover:border-[#173B67]',
    // Gold: Rich Gold with dark royal text
    gold:
      'bg-gradient-to-r from-[#C9A227] via-[#D8BD6A] to-[#C9A227] text-[#173B67] font-black border border-[#FAF3DE] shadow-[0_4px_18px_rgba(201,162,39,0.35)] hover:shadow-[0_6px_25px_rgba(201,162,39,0.5)]',
    // Danger: Tasteful Vermilion Red
    danger:
      'bg-[#B63A32] hover:bg-[#8F2922] text-white border border-[#D8726A]/50 shadow-[0_4px_16px_rgba(182,58,50,0.25)] hover:shadow-[0_6px_22px_rgba(182,58,50,0.35)]',
    // Ghost: Subtle slate text
    ghost:
      'bg-transparent hover:bg-[#E8D9B5]/30 text-[#5F6872] hover:text-[#173B67] border border-transparent',
  }[variant];

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.02, y: -1 }}
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
