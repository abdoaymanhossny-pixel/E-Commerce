'use server'

import { getTokenFun } from "@/utilities/getTokenData"

interface CartItem {
  count: number
  _id: string
  product: string
  price: number
}

interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface Order {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: string
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface OrdersResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  data: Order[]
}

// Get all orders (admin only typically)
export async function getAllOrders(): Promise<Order[]> {
  const token = await getTokenFun()
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders', {
      cache: 'no-store',
      headers: {
        'token': token,
      }
    })
    if (!response.ok) throw new Error('API Error')
    const payload: OrdersResponse = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching all orders:', error)
    throw new Error('API Error')
  }
}


export async function getUserOrders(): Promise<Order[]> {
  const token = await getTokenFun()
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
   
    const { jwtDecode } = await import('jwt-decode')
    const decoded: { id: string } = jwtDecode(token)
    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`, {
      cache: 'no-store',
      headers: {
        'token': token,
      }
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    

    return Array.isArray(payload) ? payload : payload.data || []
  } catch (error) {
    console.error('Error fetching user orders:', error)
    throw new Error('API Error')
  }
}
