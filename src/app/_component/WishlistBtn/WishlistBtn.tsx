'use client'

import { addToWishlist, removeFromWishlist } from '@/api/services/wishlistApi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

interface WishlistBtnProps {
  productId: string
  isInWishlist?: boolean
  onRemove?: () => void
}

export default function WishlistBtn({ productId, isInWishlist = false, onRemove }: WishlistBtnProps) {
  const [inWishlist, setInWishlist] = useState(isInWishlist)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    try {
      if (inWishlist) {
        await removeFromWishlist(productId)
        setInWishlist(false)
        
        if (onRemove) {
          onRemove()
          router.refresh()
        }
      } else {
        await addToWishlist(productId)
        setInWishlist(true)
      }
      
     
      queryClient.invalidateQueries({ queryKey: ['getWishlist'] })
    } catch (error) {
      console.error('Wishlist error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`absolute top-0 right-0 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group/wishlist ${
        inWishlist 
          ? 'bg-gradient-to-br from-pink-500 via-red-500 to-rose-600' 
          : 'bg-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 transition-colors ${
          inWishlist 
            ? 'text-white' 
            : 'text-gray-600 group-hover/wishlist:text-white'
        }`}
        fill={inWishlist ? 'currentColor' : 'none'}
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={inWishlist ? 0 : 2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  )
}
