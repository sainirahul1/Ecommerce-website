import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="text-yellow-500 text-sm">
          ⭐⭐⭐⭐☆ (120 reviews)
        </div>

        <p className="font-bold text-xl">
          ₹ {product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;