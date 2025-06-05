function AdminDashboard() {
  const mockProducts = [
    { _id: '1', name: 'Product 1', price: 29.99, stock: 10, categoryId: { name: 'Electronics' } },
    { _id: '2', name: 'Product 2', price: 49.99, stock: 5, categoryId: { name: 'Clothing' } },
  ];
  const mockOrders = [
    { _id: 'order1', userId: { name: 'User 1' }, total: 79.97, status: 'Processing' },
  ];
  const mockUsers = [
    { _id: 'user1', name: 'User 1', email: 'user1@example.com', role: 'user' },
    { _id: 'user2', name: 'Admin', email: 'admin@example.com', role: 'admin' },
  ];

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-orange-600">Admin Dashboard - YHA Shop</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">Products</h2>
        {mockProducts.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockProducts.map((product) => (
              <div key={product._id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Category: {product.categoryId?.name || 'Uncategorized'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">Orders</h2>
        {mockOrders.length === 0 ? (
          <p className="text-gray-600">No orders available.</p>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order._id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-gray-800">Order ID: {order._id}</p>
                <p className="text-gray-600">User: {order.userId?.name || 'Unknown'}</p>
                <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">Users</h2>
        {mockUsers.length === 0 ? (
          <p className="text-gray-600">No users available.</p>
        ) : (
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div>
                  <p className="text-gray-800">Name: {user.name}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Role: {user.role}</p>
                </div>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  disabled={user.role === 'admin'}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;