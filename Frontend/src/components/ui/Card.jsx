import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ children, className }) {
  return (
    <div className={cn(
      "bg-white border border-gray-100",
      "rounded-3xl shadow-sm", // Large radii seen in designs
      "overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 py-5 border-b border-gray-100", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}