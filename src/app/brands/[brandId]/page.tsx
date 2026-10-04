import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getSingleBrand } from '@/api/services/brandsApi'
import { getProductsByBrand } from '@/api/services/productApi'
import ProductsList from '@/app/_component/ProductsList/ProductsList'

interface BrandDetailProps {
  params: Promise<{
    brandId: string
  }>
}

const features = [
  {
    title: '100% Authentic',
    text: 'Genuine products only',
    wrapper: 'bg-gradient-to-br from-blue-100 to-blue-200',
    icon: 'text-blue-600',
    path: 'M5 13l4 4L19 7',
  },
  {
    title: 'Fast Delivery',
    text: 'Quick shipping',
    wrapper: 'bg-gradient-to-br from-purple-100 to-purple-200',
    icon: 'text-purple-600',
    path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Warranty',
    text: 'Official warranty',
    wrapper: 'bg-gradient-to-br from-pink-100 to-pink-200',
    icon: 'text-pink-600',
    path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Secure Payment',
    text: 'Safe checkout',
    wrapper: 'bg-gradient-to-br from-green-100 to-green-200',
    icon: 'text-green-600',
    path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
]

function Chevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export default async function BrandDetail({ params }: BrandDetailProps) {
  const { brandId } = await params

 
  const [brand, products] = await Promise.all([
    getSingleBrand(brandId),
    getProductsByBrand(brandId),
  ])

  
  if (!brand) notFound()

  const productList = products ?? []

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <Chevron />
          <Link href="/brands" className="text-gray-500 hover:text-blue-600 transition-colors">Brands</Link>
          <Chevron />
          <span className="text-gray-900 font-semibold">{brand.name}</span>
        </nav>

        {/* Brand Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden mb-12 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 items-center">
            {/* Brand Info */}
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm font-semibold">Official Brand Store</span>
              </div>
              <h1 className="text-6xl font-bold mb-6">{brand.name}</h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Discover authentic {brand.name} products with guaranteed quality and competitive prices. Shop with confidence from our verified collection.
              </p>

              
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white rounded-xl text-gray-900 font-semibold">
                  <div className="text-2xl font-bold text-blue-600">{productList.length}</div>
                  <div className="text-sm text-gray-600">
                    {productList.length === 1 ? 'Product' : 'Products'}
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className={`inline-block p-3 rounded-xl mb-3 ${f.wrapper}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${f.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.path} />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Products from {brand.name}</h2>
              <p className="text-gray-600 mt-2">Browse our {brand.name} collection</p>
            </div>
            {productList.length > 12 && (
              <Link
                href={`/products?brand=${brandId}`}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </div>

          {productList.length > 0 ? (
            <ProductsList products={productList.slice(0, 12)} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Available</h3>
              <p className="text-gray-600 mb-6">We don&apos;t have any {brand.name} products at the moment</p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}