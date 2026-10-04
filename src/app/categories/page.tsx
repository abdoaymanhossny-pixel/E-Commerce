import React from 'react'
import { getShopCategory } from '@/api/services/categoriesApi'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const categories = await getShopCategory()

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 pb-5">
            Shop by Category
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse range of product categories and find exactly what you're looking for
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/categories/${category._id}`} key={category._id}>
              <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
              
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
              
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

               
                <div className="relative p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-purple-500 transition-colors">
                    Explore Collection
                  </p>
                  
                
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{categories.length}+</div>
              <div className="text-purple-100">Categories Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-purple-100">Products to Choose</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
