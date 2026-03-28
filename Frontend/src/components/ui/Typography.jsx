import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Heading({ children, level = 1, className }) {
  const Tag = `h${level}`;
  
  const levels = {
    1: "text-3xl font-bold text-gray-900 tracking-tight", // Page titles
    2: "text-2xl font-semibold text-gray-900", // Card titles
    3: "text-lg font-semibold text-gray-800", // Section titles
  }

  return <Tag className={cn(levels[level], className)}>{children}</Tag>;
}

export function Label({ children, className }) {
  return <span className={cn("text-sm text-gray-500", className)}>{children}</span>;
}

