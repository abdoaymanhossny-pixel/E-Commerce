import { Brand } from "../types/productType"

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      cache: 'force-cache'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

export async function getSingleBrand(brandId: string): Promise<Brand> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching brand:', error)
    throw new Error('API Error')
  }
}
