import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function Home() {
  const mockProducts = [
    { _id: '1', name: 'Product 1', price: 29.99, stock: 10, imageURLs: ['https://mbg.com.my/cdn/shop/files/South-Africa-Grapefruit-M-4-Pcs-Citrus_1024x1024.jpg?v=1735288683'], categoryId: { name: 'Electronics' }, averageRating: 4 },
    { _id: '2', name: 'Product 2', price: 49.99, stock: 5, imageURLs: ['https://mbg.com.my/cdn/shop/files/China-Red-Fuji-Apple-M-4-Pcs-Apples-Pears_1024x1024.jpg?v=1745690157'], categoryId: { name: 'Clothing' }, averageRating: 3 },
    { _id: '3', name: 'Product 3', price: 19.99, stock: 0, imageURLs: ['https://mbg.com.my/cdn/shop/files/Malaysia-Papaya-Hong-Kong-1_5Kg-Exotic-Fruits_1024x1024.jpg?v=1747677332'], categoryId: { name: 'Home' }, averageRating: 5 },
  ];

  const mockRecentlyViewed = [
    { _id: '1', name: 'Product 1', price: 29.99, stock: 10, imageURLs: ['https://mbg.com.my/cdn/shop/files/Malaysia-Sarawak-Pineapple-1-Pc-Berries_1024x1024.jpg?v=1747158939'] },
  ];

  const banners = [
    { image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=2000', text: 'Summer Sale! Up to 50% Off' },
    { image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000', text: 'New Arrivals In Stock!' },
    { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000', text: 'Free Shipping on Orders Over $50' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerIndex, setBannerIndex] = useState(0);
  const productsPerPage = 12;

  const categories = [...new Set(mockProducts.map(p => p.categoryId?.name || 'Uncategorized'))];
  let filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId?.name === selectedCategory;
    return matchesSearch && matchesCategory;
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
    <div className="container px-4 py-8 mx-auto">
      <div className="relative p-8 mb-12 text-white bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2000')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Welcome to YHA Shop</h1>
          <p className="mb-6 text-lg md:text-xl">Discover top-quality products at unbeatable prices!</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 font-semibold text-orange-600 bg-white rounded-full hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="relative h-48 mb-12 overflow-hidden rounded-2xl">
        <img src={banners[bannerIndex].image} alt="Promotion" className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-xl font-semibold text-white md:text-2xl">{banners[bannerIndex].text}</p>
        </div>
        <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
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
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Featured Products</h2>
          <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-thin">
            {mockProducts.slice(0, 5).map(product => (
              <div key={product._id} className="flex-none w-64 p-4 bg-white rounded-lg shadow-md">
                <img src={product.imageURLs?.[0]} alt={product.name} className="object-cover w-full h-32 mb-2 rounded-lg" />
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
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Recently Viewed</h2>
          <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-thin">
            {mockRecentlyViewed.map(product => (
              <div key={product._id} className="flex-none w-64 p-4 bg-white rounded-lg shadow-md">
                <img src={product.imageURLs?.[0]} alt={product.name} className="object-cover w-full h-32 mb-2 rounded-lg" />
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

      <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full p-4 border border-gray-200 rounded-full focus:ring-2 focus:ring-orange-500"
          />
          <svg className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex flex-col w-full gap-4 md:flex-row md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
         
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white shadow-md rounded-2xl">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 3l2 18h14l2-18H3zm5 7h8" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">No products found.</p>
          <Link to="/" className="inline-block mt-4 font-semibold text-orange-600 hover:text-orange-700">Browse All Products</Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map(product => (
              <div key={product._id} className="overflow-hidden transition-all bg-white shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <img src={product.imageURLs?.[0]} alt={product.name} className="object-cover w-full h-48" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.categoryId?.name || 'Uncategorized'}</p>
                  <StarRating rating={product.averageRating} />
                  <p className="mt-2 text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                  <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link to={`/products/${product._id}`} className="flex-1 px-4 py-2 text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
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
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
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
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
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