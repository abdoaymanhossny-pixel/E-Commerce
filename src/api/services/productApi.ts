import { ProductType } from "../types/productType"

export async function getAllProducts(): Promise<ProductType[]>{

try {

const response =await fetch('https://ecommerce.routemisr.com/api/v1/products' , {
    cache:'force-cache'
})
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data
    
} catch (error) {

throw new Error('API Error')
    
}

}




export async function getSingleProduct(prodId:string): Promise<ProductType>{

try {

const response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
if(!response.ok) throw new Error('API Error')
const payload = await response.json()

return payload.data
    
} catch (error) {

throw new Error('API Error')
    
}

}

export async function getProductsByBrand(brandId: string): Promise<ProductType[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching products by brand:', error)
    throw new Error('API Error')
  }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductType[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw new Error('API Error')
  }
}

export async function getProductsBySubCategory(subCategoryId: string): Promise<ProductType[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subCategoryId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('API Error')
    const payload = await response.json()
    return payload.data
  } catch (error) {
    console.error('Error fetching products by subcategory:', error)
    throw new Error('API Error')
  }
}