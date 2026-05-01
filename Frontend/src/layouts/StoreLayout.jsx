import { Outlet} from "react-router-dom";
import { CartProvider } from "../context/CartContext";

const StoreLayout = () => {
  return (
    <CartProvider>
      <div className="flex-1 flex flex-col min-h-0 relative w-full">
        <Outlet />
      </div>
    </CartProvider>
  );
};

export default StoreLayout;
