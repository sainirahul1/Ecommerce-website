import { useCart } from "../context/CartContext";

function Navbar() {
  const { count } = useCart();

  return (
    <nav className="bg-[#131921] text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">E-Shop</h1>

      <a href="/cart" className="relative text-lg font-medium">
        🛒 Cart
        {count > 0 && (
          <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </a>
    </nav>
  );
}

export default Navbar;