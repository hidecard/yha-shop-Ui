import { Link } from 'react-router-dom';

function Cart() {
  const mockCart = {
    items: [
      { productId: { _id: '1', name: 'Product 1', price: 29.99, imageURLs: ['https://via.placeholder.com/100'] }, quantity: 2 },
    ]
  };

  const total = mockCart.items.reduce(
    (sum, item) => (item.productId ? sum + item.productId.price * item.quantity : sum),
    0
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-orange-600 mb-10">Your Cart</h1>
      {mockCart.items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-orange-500 hover:text-orange-600 font-semibold">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {mockCart.items.map(item => (
            item.productId && (
              <div
                key={item.productId._id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-xl border border-gray-100 p-8"
              >
                <img
                  src={item.productId.imageURLs?.[0]}
                  alt={item.productId.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-800">{item.productId.name}</h3>
                  <p className="text-lg font-extrabold text-orange-600">${item.productId.price.toFixed(2)}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4">
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300">-</button>
                      <span className="text-gray-800 font-semibold">{item.quantity}</span>
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300">+</button>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600">Remove</button>
                  </div>
                </div>
              </div>
            )
          ))}
          <div className="text-right mt-10">
            <h2 className="text-2xl font-extrabold text-gray-800">Total: ${total.toFixed(2)}</h2>
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;