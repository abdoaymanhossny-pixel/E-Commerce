import { SubCategory } from "../types/productType"

export async function getAllSubCategories(): Promise<SubCategory[]> {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories', {
      cache: 'force-cache'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    throw new Error('API Error')
  }
}

export async function getSingleSubCategory(subCategoryId: string): Promise<SubCategory> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching subcategory:', error)
    throw new Error('API Error')
  }
}

export async function getSubCategoriesOnCategory(categoryId: string): Promise<SubCategory[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching subcategories on category:', error)
    throw new Error('API Error')
  }
}
