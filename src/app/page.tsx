
import Image from "next/image";
import { Button } from "@/components/ui/button"
import FeaturedProducts from "./_component/FeaturedProducts/FeaturedProducts";
import Slider from "./_component/Slider/Slider";
import img1 from '../assets/banner-4.jpeg'
import img2 from '../assets/blog-img-1.jpeg'
import img3 from '../assets/blog-img-2.jpeg'
import dynamic from "next/dynamic";



const ShopCategory=  dynamic(() => import('./_component/ShopCategory/ShopCategory') , {
  loading:()=> <div className="bg-gray-400"> Loading</div>
});
export default function Home() {
  return (
  <>
  
  {/* Hero Section */}
  <div className="relative overflow-hidden rounded-3xl my-8">
    <Slider spaceBetween={0} slidesPerView={1} pageList={[img1.src , img2.src , img3.src]}  />
  </div>

  {/* Welcome Section */}
  <div className="text-center my-16 space-y-4">
    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
      Welcome to FreshCart
    </h1>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Discover amazing products at unbeatable prices. Shop the latest trends and enjoy fast, reliable shipping.
    </p>
  </div>

  {/* Shop Categories */}
  <div className="my-16">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="text-gray-600 mt-2">Find exactly what you're looking for</p>
      </div>
      <a href="/categories" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group">
        View All
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
    <ShopCategory/>
  </div>

  {/* Featured Products */}
  <div className="my-16">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <p className="text-gray-600 mt-2">Handpicked products just for you</p>
      </div>
      <a href="/products" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group">
        View All
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
    <FeaturedProducts/>
  </div>

  {/* Features Section */}
  <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow">
      <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
      <p className="text-gray-600">On orders over $50</p>
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow">
      <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
      <p className="text-gray-600">100% secure transactions</p>
    </div>

    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow">
      <div className="inline-block p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
      <p className="text-gray-600">Dedicated customer service</p>
    </div>
  </div>
  </>
  );
}




