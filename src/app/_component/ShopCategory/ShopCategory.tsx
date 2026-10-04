import { getShopCategory } from '@/api/services/categoriesApi'
import Image from 'next/image';
import React from 'react'
import  Link  from 'next/link';


export default async function ShopCategory() {
    // call api
const data= await   getShopCategory()


  return (
    <div className='my-10'>
       <h2 className='text-2xl font-bold my-2 p-3 text-green-600 border-l-4 border-l-black'>Shop By Category</h2>

       <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 ">
      {data.map((category)=>{ return   <div key={category._id} className="category hover:-translate-y-2 p-5 transition-all duration-300 transform hover:-translate-y-2 p-5 overflow-hidden">
         



            <Link href={`categories/${category._id}`}>
               <div>
                <Image className='rounded-full w-25 h-25 gap-10' src={category.image} alt={category.name} width={100} height={100}/>
                <h4>{category.name}</h4>
            </div>
            </Link>
        </div>})}

       </div>
    </div>
  )
}
