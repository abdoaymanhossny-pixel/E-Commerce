import { NextResponse } from 'next/server'
import { getWishlist } from '@/api/services/wishlistApi'

export async function GET() {
  try {
    const wishlistData = await getWishlist()
    return NextResponse.json(wishlistData)
  } catch (error) {
    console.error('Wishlist API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}
