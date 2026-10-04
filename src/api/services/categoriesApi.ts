import { Category } from "../types/productType"

export async function getShopCategory(): Promise<Category[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
      cache: 'force-cache'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

export async function getSingleCategory(categoryId: string): Promise<Category> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching category:', error)
    throw new Error('API Error')
  }
}
