import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function Home() {
  const mockProducts = [
    { _id: '1', name: 'Product 1', price: 29.99, stock: 10, imageURLs: ['https://via.placeholder.com/300'], categoryId: { name: 'Electronics' }, averageRating: 4 },
    { _id: '2', name: 'Product 2', price: 49.99, stock: 5, imageURLs: ['https://via.placeholder.com/300'], categoryId: { name: 'Clothing' }, averageRating: 3 },
    { _id: '3', name: 'Product 3', price: 19.99, stock: 0, imageURLs: ['https://via.placeholder.com/300'], categoryId: { name: 'Home' }, averageRating: 5 },
  ];

  const mockRecentlyViewed = [
    { _id: '1', name: 'Product 1', price: 29.99, stock: 10, imageURLs: ['https://via.placeholder.com/300'] },
  ];

  const banners = [
    { image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=2000', text: 'Summer Sale! Up to 50% Off' },
    { image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000', text: 'New Arrivals In Stock!' },
    { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000', text: 'Free Shipping on Orders Over $50' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerIndex, setBannerIndex] = useState(0);
  const productsPerPage = 12;

  const categories = [...new Set(mockProducts.map(p => p.categoryId?.name || 'Uncategorized'))];
  let filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId?.name === selectedCategory;
    let matchesPrice = true;
    const minPrice = Number(priceRange.min);
    const maxPrice = Number(priceRange.max);
    if (priceRange.min !== '' && !isNaN(minPrice)) matchesPrice = matchesPrice && product.price >= minPrice;
    if (priceRange.max !== '' && !isNaN(maxPrice)) matchesPrice = matchesPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filteredProducts.sort((a, b) => b.price - b.price);
  else if (sort === 'name-asc') filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-2xl p-8 mb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to YHA Shop</h1>
          <p className="text-lg md:text-xl mb-6">Discover top-quality products at unbeatable prices!</p>
          <Link
            to="/"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="mb-12 relative h-48 rounded-2xl overflow-hidden">
        <img src={banners[bannerIndex].image} alt="Promotion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-semibold">{banners[bannerIndex].text}</p>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`w-2 h-2 rounded-full ${i === bannerIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {mockProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin">
            {mockProducts.slice(0, 5).map(product => (
              <div key={product._id} className="flex-none w-64 bg-white rounded-lg shadow-md p-4">
                <img src={product.imageURLs?.[0]} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                <StarRating rating={product.averageRating} />
                <p className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
                <button
                  disabled={product.stock === 0}
                  className={`w-full mt-2 px-4 py-2 rounded-lg text-sm ${product.stock > 0 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-600'}`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {mockRecentlyViewed.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recently Viewed</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin">
            {mockRecentlyViewed.map(product => (
              <div key={product._id} className="flex-none w-64 bg-white rounded-lg shadow-md p-4">
                <img src={product.imageURLs?.[0]} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                <p className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
                <button
                  disabled={product.stock === 0}
                  className={`w-full mt-2 px-4 py-2 rounded-lg text-sm ${product.stock > 0 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-600'}`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full p-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500"
          />
          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e

.target.value }))}
            placeholder="Min Price"
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            placeholder="Max Price"
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">No products found.</p>
          <Link to="/" className="mt-4 inline-block text-orange-600 font-semibold hover:text-orange-700">Browse All Products</Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map(product => (
              <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <img src={product.imageURLs?.[0]} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.categoryId?.name || 'Uncategorized'}</p>
                  <StarRating rating={product.averageRating} />
                  <p className="text-xl font-bold text-orange-600 mt-2">${product.price.toFixed(2)}</p>
                  <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link to={`/products/${product._id}`} className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                      Quick View
                    </Link>
                    <button
                      disabled={product.stock === 0}
                      className={`flex-1 px-4 py-2 rounded-lg ${product.stock > 0 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-600'}`}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;