'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { ProductType } from '@/api/types/productType'
import { getWishlist } from '@/api/services/wishlistApi'

interface ProductCardWrapperProps {
  product: ProductType
  initialIsInWishlist?: boolean
  onRemoveFromWishlist?: () => void
}

type WishlistItem = string | { _id: string }

export default function ProductCardWrapper({
  product,
  initialIsInWishlist = false,
  onRemoveFromWishlist,
}: ProductCardWrapperProps) {
  const { status } = useSession()

  const { data, isLoading } = useQuery({
    queryKey: ['wishlistItems'],
    queryFn: async () => {
      const res = (await getWishlist()) as WishlistItem[] | { data?: WishlistItem[] }
      const list = Array.isArray(res) ? res : res?.data
      return Array.isArray(list) ? list : []
    },
    enabled: status === 'authenticated' && !initialIsInWishlist,
    staleTime: 60_000,
  })

  const isInWishlist = useMemo(() => {
    if (initialIsInWishlist) return true
    return (data ?? []).some((item) =>
      typeof item === 'string' ? item === product._id : item._id === product._id
    )
  }, [data, initialIsInWishlist, product._id])

  if (status === 'loading' || (isLoading && !initialIsInWishlist)) {
    return (
      <div className="group relative my-2">
        <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-md p-5 overflow-hidden animate-pulse">
          <div className="relative mb-4">
            <div className="aspect-square bg-gray-200 rounded-xl"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProductCard
      product={product}
      isInWishlist={isInWishlist}
      onRemoveFromWishlist={onRemoveFromWishlist}
    />
  )
}