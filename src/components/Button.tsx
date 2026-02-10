import React from 'react';

import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from './ui/button';

interface ButtonProps extends Omit<ShadcnButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Custom Button component that wraps shadcn/ui Button
 * Provides backward compatibility with existing variant names
 */
const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', ...props }) => {
  // Map custom variants to shadcn variants
  const variantMap: Record<ButtonProps['variant'] & string, ShadcnButtonProps['variant']> = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
    ghost: 'ghost',
    destructive: 'destructive',
    link: 'link',
  };

  // Map custom sizes to shadcn sizes
  const sizeMap: Record<ButtonProps['size'] & string, ShadcnButtonProps['size']> = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
  };

  return (
    <ShadcnButton
      variant={variant ? variantMap[variant] : 'default'}
      size={size ? sizeMap[size] : 'default'}
      {...props}
    />
  );
};

export default Button;
