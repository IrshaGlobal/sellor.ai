'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

type ToastVariants = VariantProps<typeof toastVariants>;

const toastVariants = cva(
  'relative rounded-md p-4 pr-12 overflow-hidden shadow-lg transition-all data-[swipe=on]:translate-x-4 data-[swipe=off]:translate-x-0 data-[swipe=end]:translate-x-[120%] data-[swipe=cancel]:-translate-x-1/4 data-[swipe=move]:translate-x-px data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=on]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-1/4 data-[state=open]:sm:slide-in-from-bottom-1/4',
  {
    variants: {
      variant: {
        default: 'bg-white text-black border border-gray-200',
        destructive: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const ToastProvider = ToastPrimitive.Provider;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, ToastVariants {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant = 'default', 
    title, 
    description, 
    action,
    ...props 
  }, ref) => {
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants({ variant, className }))}
        {...props}
      >
        <div className="grid gap-1">
          {title && <ToastPrimitive.Title className="text-sm font-medium">{title}</ToastPrimitive.Title>}
          {description && (
            <ToastPrimitive.Description className="text-sm opacity-90">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>
        {action}
        <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 group-hover:bg-gray-100"
          aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);

Toast.displayName = ToastPrimitive.Root.displayName;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-[420px] md:top-0 md:bottom-auto md:right-0 md:h-fit md:p-6 lg:top-6 md:max-w-[420px] md:gap-4',
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export { Toast, ToastProvider, ToastViewport };