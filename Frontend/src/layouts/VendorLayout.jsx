import { Outlet, Link } from 'react-router-dom';

// export default function VendorLayout() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
//       {/* Temporary Sidebar for navigation */}
//       <aside className="bg-gray-900 text-white w-full md:w-64 p-4 flex flex-col gap-4">
//         <h2 className="font-bold text-xl mb-4 text-emerald-400">SabiSell Admin</h2>
//         <Link to="/dashboard" className="hover:text-emerald-300">Dashboard</Link>
//         <Link to="/dashboard/products" className="hover:text-emerald-300">Products</Link>
//         <Link to="/dashboard/orders" className="hover:text-emerald-300">Orders</Link>
//         <Link to="/dashboard/settings" className="hover:text-emerald-300">Settings</Link>
//         <Link to="/" className="mt-auto text-gray-400 text-sm">View Live Store</Link>
//       </aside>

//       {/* This is where Dashboard, Products, Orders, etc. will render */}
//       <main className="flex-grow p-4 md:p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

const VendorLayout = () => {
  return (
   <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Temporary Sidebar for navigation */}
      <aside className="bg-gray-900 text-white w-full md:w-64 p-4 flex flex-col gap-4">
        <h2 className="font-bold text-xl mb-4 text-emerald-400">SabiSell Admin</h2>
        <Link to="/dashboard" className="hover:text-emerald-300">Dashboard</Link>
        <Link to="/dashboard/products" className="hover:text-emerald-300">Products</Link>
        <Link to="/dashboard/orders" className="hover:text-emerald-300">Orders</Link>
        <Link to="/dashboard/settings" className="hover:text-emerald-300">Settings</Link>
        <Link to="/" className="mt-auto text-gray-400 text-sm">View Live Store</Link>
      </aside>

      {/* This is where Dashboard, Products, Orders, etc. will render */}
      <main className="flex-grow p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default VendorLayout
