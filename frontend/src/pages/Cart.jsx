import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    total,
  } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">

      <h2 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h2>

      {cart.length === 0 && (
        <p className="text-lg">Your cart is empty.</p>
      )}

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex gap-6">
              <img
                src={item.image}
                className="h-24 w-24 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-500">
                  ₹ {item.price}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow text-right">
          <h3 className="text-2xl font-bold">
            Subtotal: ₹ {total}
          </h3>

          <button
            onClick={() => alert("Order placed successfully!")}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-semibold"
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;