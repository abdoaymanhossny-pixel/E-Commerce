import { getAllProducts } from '@/api/services/productApi'
import React from 'react'
import ProductsList from '../ProductsList/ProductsList'

export default async function FeaturedProducts() {

    // call api
const data=  await  getAllProducts()


  return (
   <>
       <h2 className='text-2xl font-bold my-2 p-3 text-green-600 border-l-4 border-l-black'>Featured Products</h2>

   <ProductsList products={data} />
   
   </>
  )
}
