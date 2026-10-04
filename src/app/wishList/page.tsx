'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getWishlist } from '@/api/services/wishlistApi'
import ProductCard from '../_component/ProductCard/ProductCard'
import { ProductType } from '@/api/types/productType'

export default function WishList() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

 
  const loadWishlist = useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true)
    try {
      const res = (await getWishlist()) as ProductType[] | { data?: ProductType[] }
      const list = Array.isArray(res) ? res : res?.data
      setProducts(Array.isArray(list) ? list : [])
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load wishlist')
      console.error('Wishlist page error:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWishlist()
  }, [loadWishlist])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
       
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Wishlist
          </h1>
          {!error && (
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'item' : 'items'} saved for later
            </p>
          )}
        </div>

      
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-semibold mb-2">Unable to load wishlist</div>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => loadWishlist()}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

       
        {!error && products.length === 0 && (
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products you love!</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        )}

        
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isInWishlist={true}
                onRemoveFromWishlist={() => loadWishlist(false)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}