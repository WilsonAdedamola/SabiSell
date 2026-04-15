// import { Outlet, Link, useLocation } from 'react-router-dom'
// import { Card } from '../components/ui/Card'

// const AuthLayout = () => {


// // Reusable desktop common branding panel
// const DesktopBranding = () => {
//   const checkmarks = [
//     "Sell your products with ease",
//     "Manage your orders",
//     "Chat directly with customers",
//   ];

//   return (
//     <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center border-r border-gray-100 space-y-12">
//       {/* SabiSell Branding */}
//       <div className="flex items-center gap-3">
//         {/* Placeholder green bag icon */}
//         <div className="p-3 bg-emerald-600 rounded-2xl">
//           <span className="text-3xl text-white">🛍️</span>
//         </div>
//         <h1 className="text-4xl font-extrabold text-emerald-900 tracking-tighter">SabiSell</h1>
//       </div>

//       <div className="space-y-6">
//         <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">Buy & Sell with Ease</h2>
//         <p className="text-lg text-gray-600 max-w-xl">Join thousands of buyers and sellers on SabiSell and grow your business online.</p>
//       </div>

//       {/* Bullet points from Image 2 */}
//       <ul className="space-y-4 pt-4">
//         {checkmarks.map((text, idx) => (
//           <li key={idx} className="flex items-center gap-3 text-lg font-medium text-gray-700">
//             <span className="text-lg p-1.5 bg-emerald-100 text-emerald-600 rounded-full">✔️</span>
//             {text}
//           </li>
//         ))}
//       </ul>
        
//       {/* Dynamic buttons at the bottom of the common section */}
//       <AuthButtons />
//     </div>
//   );
// };

// // Common auth buttons (Logic to handle Login/Signup links)
// const AuthButtons = () => {
//   const { pathname } = useLocation();
//   const isLogin = pathname.includes('login');

//   return (
//     <div className="pt-10 flex gap-4 w-full">
//       <Link to="/auth/login" className={`w-full py-3.5 px-6 rounded-2xl text-center font-semibold ${isLogin ? 'bg-emerald-600 text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
//         {isLogin ? "Log In" : "Register"}
//       </Link>
//       <Link to="/auth/register" className={`w-full py-3.5 px-6 rounded-2xl text-center font-semibold ${!isLogin ? 'bg-emerald-600 text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
//         {!isLogin ? "Log In" : "Create Account"}
//       </Link>
//     </div>
//   );
// };


//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       {/* Desktop view (Split card, md+) - adapting image 2 logic */}
//       <Card className="hidden md:flex w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-white">
//         <DesktopBranding />
        
//         {/* Specific Auth Form Panel */}
//         <div className="flex-1 p-12 lg:p-16 flex items-center justify-center">
//           <div className="w-full max-w-md">
//             <Outlet />
//           </div>
//         </div>
//       </Card>
      
//       {/* Mobile view */}
//       <Card className="flex md:hidden w-full max-w-md p-6 py-10 bg-white">
//         <Outlet />
//       </Card>
//     </div>
//   )
// }

// export default AuthLayout


// // // Reusable desktop common branding panel (Image 2 style)
// // const DesktopBranding = () => {
// //   const checkmarks = [
// //     "Sell your products with ease",
// //     "Manage your orders",
// //     "Chat directly with customers",
// //   ];

// //   return (
// //     <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center border-r border-gray-100 space-y-12">
// //       {/* SabiSell Branding */}
// //       <div className="flex items-center gap-3">
// //         {/* Placeholder green bag icon */}
// //         <div className="p-3 bg-emerald-600 rounded-2xl">
// //           <span className="text-3xl text-white">🛍️</span>
// //         </div>
// //         <h1 className="text-4xl font-extrabold text-emerald-900 tracking-tighter">SabiSell</h1>
// //       </div>

// //       <div className="space-y-6">
// //         <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">Buy & Sell with Ease</h2>
// //         <p className="text-lg text-gray-600 max-w-xl">Join thousands of buyers and sellers on SabiSell and grow your business online.</p>
// //       </div>

// //       {/* Bullet points from Image 2 */}
// //       <ul className="space-y-4 pt-4">
// //         {checkmarks.map((text, idx) => (
// //           <li key={idx} className="flex items-center gap-3 text-lg font-medium text-gray-700">
// //             <span className="text-lg p-1.5 bg-emerald-100 text-emerald-600 rounded-full">✔️</span>
// //             {text}
// //           </li>
// //         ))}
// //       </ul>
        
// //       {/* Dynamic buttons at the bottom of the common section */}
// //       <AuthButtons />
// //     </div>
// //   );
// // };

// // // Common auth buttons (Logic to handle Login/Signup links)
// // const AuthButtons = () => {
// //   const { pathname } = useLocation();
// //   const isLogin = pathname.includes('login');

// //   return (
// //     <div className="pt-10 flex gap-4 w-full">
// //       <Link to="/auth/login" className={`w-full py-3.5 px-6 rounded-2xl text-center font-semibold ${isLogin ? 'bg-emerald-600 text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
// //         {isLogin ? "Log In" : "Register"}
// //       </Link>
// //       <Link to="/auth/register" className={`w-full py-3.5 px-6 rounded-2xl text-center font-semibold ${!isLogin ? 'bg-emerald-600 text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
// //         {!isLogin ? "Log In" : "Create Account"}
// //       </Link>
// //     </div>
// //   );
// // };


// // export default function AuthLayout() {
// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //       {/* Desktop view (Split card, md+) - adapting image 2 logic */}
// //       <Card className="hidden md:flex w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-white">
// //         <DesktopBranding />
        
// //         {/* Specific Auth Form Panel */}
// //         <div className="flex-1 p-12 lg:p-16 flex items-center justify-center">
// //           <div className="w-full max-w-md">
// //             <Outlet />
// //           </div>
// //         </div>
// //       </Card>
      
// //       {/* Mobile view (Image 1 screens, <md) */}
// //       <Card className="flex md:hidden w-full max-w-md p-6 py-10 bg-white">
// //         <Outlet />
// //       </Card>
// //     </div>
// //   )
// // }
