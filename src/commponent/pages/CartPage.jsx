import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromcart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const totalitem = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <>
          <p className="mb-6 text-gray-600 text-center">
            Your cart is empty 🛒
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </>
      ) : (
        <div className="w-full max-w-5xl">
          {/* Table for medium+ screens */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border">
              <thead className="bg-gray-200 border">
                <tr>
                  <th className="px-4 py-3">S.N</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price ($)</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <td
                      className="px-4 py-3 text-xl"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 object-contain"
                        onClick={() => navigate(`/product/${item.id}`)}
                      />
                    </td>
                    <td
                      className="px-4 py-3 font-semibold"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.title}
                    </td>
                    <td
                      className="px-4 py-3 text-xl"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="px-4 py-3 font-semibold text-blue-600"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => removeFromcart(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() =>
                          alert(`${item.title} is pending checkout!`)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout */}
          <div className="md:hidden flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-3">
                  <button
                    onClick={() => removeFromcart(item.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() =>
                      alert(`${item.title} is pending checkout!`)
                    }
                    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-6 font-semibold text-lg flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              to="/shop"
              className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              🛍️ Shop More
            </Link>
            <div className="text-center sm:text-right">
              <p>
                Total Product:{" "}
                <span className="text-blue-500">{totalitem}</span>
              </p>
              <p>
                Total Price:{" "}
                <span className="text-blue-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
