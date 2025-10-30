import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cash",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully! \nTotal: $${total.toFixed(2)}`);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row p-6 gap-6">
      {/* Billing Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md flex-1"
      >
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded-md w-full mt-4"
          required
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <label className="font-semibold">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border p-2 rounded-md w-full mt-2"
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="esewa">eSewa / Khalti</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-all"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty 🛒</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
