import { Outlet, Link } from 'react-router-dom';

// export default function StoreLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Temporary Navbar just so we can navigate */}
//       <nav className="bg-emerald-800 text-white p-4 flex justify-between">
//         <Link to="/" className="font-bold">SabiSell Store</Link>
//         <div className="space-x-4">
//           <Link to="/cart">Cart</Link>
//           <Link to="/auth/login" className="text-emerald-200">Vendor Login</Link>
//         </div>
//       </nav>

//       {/* This is where StoreHome, ProductDetails, and Cart will render */}
//       <main className="flex-grow max-w-5xl mx-auto w-full p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

const StoreLayout = () => {
  return (
     <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Temporary Navbar just so we can navigate */}
      <nav className="bg-emerald-800 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">SabiSell Store</Link>
        <div className="space-x-4">
          <Link to="/cart">Cart</Link>
          <Link to="/auth/login" className="text-emerald-200">Vendor Login</Link>
        </div>
      </nav>

      {/* This is where StoreHome, ProductDetails, and Cart will render */}
      <main className="grow max-w-5xl mx-auto w-full p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default StoreLayout
