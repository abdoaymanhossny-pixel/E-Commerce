import React from 'react'
import FeaturedProducts from '../_component/FeaturedProducts/FeaturedProducts'


export default function Shop() {
  return (
    <>



    
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



    </>
  )
}
