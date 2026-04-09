// A global utility function to join Tailwind class names
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};