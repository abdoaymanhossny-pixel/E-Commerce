'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { ProductType } from "../types/productType"

export interface WishlistResponse {
  status: string
  message?: string
  count: number
  data: ProductType[]  
}

export async function getWishlist(): Promise<WishlistResponse> {
  const token = await getTokenFun()
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      cache: 'no-store',
      headers: {
        'token': token,
      }
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    console.log('Wishlist API response:', payload)  // Debug log
    return payload
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    throw new Error('API Error')
  }
}

export async function addToWishlist(productId: string): Promise<WishlistResponse> {
  const token = await getTokenFun()
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: 'POST',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId })
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    throw new Error('API Error')
  }
}

export async function removeFromWishlist(productId: string): Promise<WishlistResponse> {
  const token = await getTokenFun()
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'token': token,
      }
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    throw new Error('API Error')
  }
}

