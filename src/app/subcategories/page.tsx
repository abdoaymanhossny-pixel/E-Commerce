import React from 'react'
import { getAllSubCategories } from '@/api/services/subCategoriesApi'
import Link from 'next/link'

export default async function SubCategories() {
  const subCategories = await getAllSubCategories()

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 pb-5">
            All Subcategories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore detailed product subcategories to find exactly what you're looking for
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {subCategories.map((subCategory, index) => (
            <Link href={`/subcategories/${subCategory._id}`} key={subCategory._id}>
              <div 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 cursor-pointer border-2 border-transparent hover:border-pink-200 relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
              
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-2 line-clamp-2">
                      {subCategory.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-pink-500 transition-colors">
                      Explore products
                    </p>
                  </div>
                </div>

                
                <div className="relative mt-4 flex justify-end">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

               
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

       
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Navigation</h3>
            <p className="text-gray-600">Find products faster with organized subcategories</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Wide Selection</h3>
            <p className="text-gray-600">Thousands of products across {subCategories.length}+ subcategories</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Updates</h3>
            <p className="text-gray-600">New products added regularly to all subcategories</p>
          </div>
        </div>

        
        <div className="mt-16 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
              Browse our main categories or contact our support team for assistance
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
             <Link
  href="/categories"
  className="inline-block px-8 py-4 bg-white text-pink-600 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
>
  View Categories
</Link>
           <Link
  href="/products"
  className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/30 transition-all"
>
  Shop All Products
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
