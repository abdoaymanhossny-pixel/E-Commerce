import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSingleCategory } from '@/api/services/categoriesApi'
import { getSubCategoriesOnCategory } from '@/api/services/subCategoriesApi'
import { getProductsByCategory } from '@/api/services/productApi'
import ProductsList from '@/app/_component/ProductsList/ProductsList'

interface CategoryDetailProps {
  params: Promise<{
    categoryId: string
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


async function loadData(categoryId: string) {
  try {
    const [category, subCategories, products] = await Promise.all([
      getSingleCategory(categoryId),
      getSubCategoriesOnCategory(categoryId),
      getProductsByCategory(categoryId),
    ])
    return { category, subCategories, products }
  } catch (error) {
    console.error('Error loading category:', error)
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
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Error Loading Category</h2>
        <p className="text-gray-600 mb-8">We couldn&apos;t load this category. Please try again.</p>
        <Link
          href="/categories"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Back to Categories
        </Link>
      </div>
    </div>
  )
}

export default async function CategoryDetail({ params }: CategoryDetailProps) {
  const { categoryId } = await params
  const data = await loadData(categoryId)

  if (!data) return <ErrorState />

  const { category, subCategories, products } = data

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
      
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-purple-600 transition-colors">Home</Link>
          <Chevron />
          <Link href="/categories" className="text-gray-500 hover:text-purple-600 transition-colors">Categories</Link>
          <Chevron />
          <span aria-current="page" className="text-gray-900 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl overflow-hidden flex-shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-purple-100 text-lg mb-6">
                Discover our collection of {subCategories.length} subcategories in {category.name}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-semibold">{subCategories.length} Subcategories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SubCategories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Subcategories</h2>

          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((subCategory) => (
                <Link href={`/subcategories/${subCategory._id}`} key={subCategory._id}>
                  <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-2 border-transparent hover:border-purple-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                          {subCategory.name}
                        </h3>
                        <p className="text-sm text-gray-500">View products</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Subcategories Yet</h3>
              <p className="text-gray-600">This category doesn&apos;t have any subcategories at the moment</p>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Products in {category.name}</h2>
              <p className="text-gray-600 mt-2">Browse our {category.name} collection</p>
            </div>
            {products.length > 12 && (
             
              <Link
                href="/products"
                className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group"
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
              <p className="text-gray-600 mb-6">We don&apos;t have any products in this category at the moment</p>
              <Link
                href="/categories"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}