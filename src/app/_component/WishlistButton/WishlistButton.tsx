'use client'

import { addToWishlist, removeFromWishlist, getWishlist } from '@/api/services/wishlistApi'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface WishlistButtonProps {
  productId: string
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    checkWishlistStatus()
  }, [productId])

  const checkWishlistStatus = async () => {
    try {
      const wishlistData = await getWishlist()
      const inList = wishlistData.data.some((item: any) => {
        return typeof item === 'string' ? item === productId : item._id === productId
      })
      setInWishlist(inList)
    } catch (error) {
      setInWishlist(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleWishlist = async () => {
    setIsLoading(true)
    try {
      if (inWishlist) {
        await removeFromWishlist(productId)
        setInWishlist(false)
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
      className={`flex gap-2 items-center px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
        inWishlist 
          ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white focus:ring-pink-500' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill={inWishlist ? 'currentColor' : 'none'}
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      {isLoading ? 'Loading...' : 'Wishlist'}
    </button>
  )
}
