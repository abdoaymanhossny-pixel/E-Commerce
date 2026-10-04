'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { ProductType } from '@/api/types/productType'
import { getWishlist } from '@/api/services/wishlistApi'
import { useQueryClient } from '@tanstack/react-query'

interface ProductsListProps {
  products: ProductType[]
}

export default function ProductsList({ products }: ProductsListProps) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      const wishlistData = await getWishlist()
      
      const ids = wishlistData.data.map((item: any) => 
        typeof item === 'string' ? item : item._id
      )
      setWishlistIds(ids)
      
      
      queryClient.setQueryData(['getWishlist'], { count: wishlistData.count || ids.length })
    } catch (error) {
     
      setWishlistIds([])
      queryClient.setQueryData(['getWishlist'], { count: 0 })
    } finally {
      setIsLoading(false)
    }
  }

 
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group relative my-2">
            <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-md p-5 overflow-hidden">
              
              <div className="relative mb-4">
                <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/5 animate-pulse"></div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product}
          isInWishlist={wishlistIds.includes(product._id)}
        />
      ))}
    </div>
  )
}
