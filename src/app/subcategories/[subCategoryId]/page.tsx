import React from 'react'
import Link from 'next/link'
import { getSingleSubCategory } from '@/api/services/subCategoriesApi'
import { getProductsBySubCategory } from '@/api/services/productApi'
import ProductsList from '@/app/_component/ProductsList/ProductsList'

interface SubCategoryDetailProps {
  params: Promise<{
    subCategoryId: string
  }>
}

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}


async function loadData(subCategoryId: string) {
  try {
    const [subCategory, products] = await Promise.all([
      getSingleSubCategory(subCategoryId),
      getProductsBySubCategory(subCategoryId),
    ])
    return { subCategory, products }
  } catch (error) {
    console.error('Error loading subcategory:', error)
    return null
  }
}

function ErrorState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Error Loading Subcategory</h2>
        <p className="text-gray-600 mb-8">We couldn&apos;t load this subcategory. Please try again.</p>
        <Link
          href="/subcategories"
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Back to Subcategories
        </Link>
      </div>
    </div>
  )
}

export default async function SubCategoryDetail({ params }: SubCategoryDetailProps) {
  const { subCategoryId } = await params
  const data = await loadData(subCategoryId)

  if (!data) return <ErrorState />

  const { subCategory, products } = data

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
       
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-pink-600 transition-colors">Home</Link>
          <Chevron />
          <Link href="/subcategories" className="text-gray-500 hover:text-pink-600 transition-colors">Subcategories</Link>
          <Chevron />
          <span aria-current="page" className="text-gray-900 font-semibold">{subCategory.name}</span>
        </nav>

        {/* SubCategory Hero */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-3xl p-12 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
           
            <div className="inline-block p-6 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>

            <h1 className="text-6xl font-bold mb-6">{subCategory.name}</h1>
            <p className="text-pink-100 text-xl mb-8 leading-relaxed">
              Explore our curated collection of premium products in the {subCategory.name} subcategory
            </p>

         
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm text-pink-100">{products.length === 1 ? 'Product' : 'Products'}</div>
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-pink-100">Support</div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Quality Products</h3>
            <p className="text-sm text-gray-600">Carefully selected items</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">Competitive pricing</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-sm text-gray-600">Quick delivery</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">Safe checkout</p>
          </div>
        </div>

        {/* Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Products in {subCategory.name}</h2>
              <p className="text-gray-600 mt-2">Browse our {subCategory.name} collection</p>
            </div>
            {products.length > 12 && (
             
              <Link
                href="/products"
                className="text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2 group"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </div>

          {products.length > 0 ? (
            <ProductsList products={products.slice(0, 12)} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Available</h3>
              <p className="text-gray-600">We don&apos;t have any products in this subcategory at the moment</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Shop {subCategory.name}?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Browse our complete collection and find the perfect products for your needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Shop Now →
              </Link>
              <Link
                href="/subcategories"
                className="inline-block px-8 py-4 bg-white border-2 border-gray-200 hover:border-pink-500 rounded-xl text-gray-700 hover:text-pink-600 font-bold transition-all"
              >
                All Subcategories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}