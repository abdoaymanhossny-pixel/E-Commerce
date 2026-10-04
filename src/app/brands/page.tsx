import React from 'react'
import { getAllBrands } from '@/api/services/brandsApi'
import Image from 'next/image'
import Link from 'next/link'

export default async function Brands() {
  const brands = await getAllBrands()

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Top Brands
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Shop from the world most trusted and popular brands
          </p>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link href={`/brands/${brand._id}`} key={brand._id}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 cursor-pointer border-2 border-transparent hover:border-blue-200 relative overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
               
                <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-4">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

               
                <div className="relative text-center">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm truncate">
                    {brand.name}
                  </h3>
                  
                
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Trusted by Millions</h2>
            <p className="text-blue-100 text-lg mb-8">
              We partner with the worlds leading brands to bring you quality products you can trust
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">{brands.length}+</div>
                <div className="text-blue-100">Global Brands</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Authentic Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5★</div>
                <div className="text-blue-100">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Shop Branded Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Authentic products with manufacturer warranties</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Value</h3>
              <p className="text-gray-600">Competitive prices on premium brands</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Choice</h3>
              <p className="text-gray-600">Millions of satisfied customers worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
