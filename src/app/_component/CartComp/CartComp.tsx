'use client'
import { clearCart } from '@/api/actions/cartActions/clearCart.action'
import { getCart } from '@/api/actions/cartActions/getCart'
import { deleteCartItem } from '@/api/actions/deleteCartItem'
import { updateCart } from '@/api/actions/updateCartItem'
import { CartResponseType } from '@/api/types/cartType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery , useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default   function CartComp() {
 const query= useQueryClient()

const {data:cartData , isLoading}= useQuery<CartResponseType>({
    queryKey:['getCart'] ,
    queryFn: async()=>{
        const response = await fetch('/api/cart')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }

})
console.log('cart Data..' , cartData);


// delete 
const {data:delData , mutate:delCartItem}= useMutation({
  mutationFn: deleteCartItem ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Product Deleted Successfully',
          }) 
query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})


// update 
const {data:updatedData , mutate:updateCartItem}= useMutation({
  mutationFn:  updateCart ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Product updated Successfully',
          }) 
query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})

// clear Cart

const {data:clearData , mutate:clearCartItems}= useMutation({
  mutationFn:  clearCart ,
  onSuccess:()=>{
      toast.add({
            type: "success",
            description: 'Cart Deleted Successfully',
          }) 
          query.invalidateQueries({queryKey:['getCart']})

  } ,
  onError:()=>{

      toast.add({
                type: "error",
                description: 'Failed',
              }) 
    

  }
})

function handleClearCart(){
  clearCartItems()
}
function HandleUpdateCart(prodId:string , count : number){
  updateCartItem({prodId , count})
}


if(isLoading){
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Loading your cart...</h2>
        </div>
      </div>
    )
  }
  
  return (
   <>
   {cartData?.numOfCartItems ? (
     <section className="py-12 px-4">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="text-center mb-12">
           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
             Shopping Cart
           </h1>
           <p className="text-gray-600">Review your items and complete your purchase</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Cart Items */}
           <div className="lg:col-span-2">
             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
               <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b">
                 <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase">
                   <div className="col-span-5">Product</div>
                   <div className="col-span-2 text-center">Price</div>
                   <div className="col-span-3 text-center">Quantity</div>
                   <div className="col-span-2 text-center">Total</div>
                 </div>
               </div>

               <div className="divide-y divide-gray-100">
                 {cartData?.data.products.map((product) => (
                   <div key={product._id} className="p-6 hover:bg-gray-50 transition-colors">
                     <div className="grid grid-cols-12 gap-4 items-center">
                       {/* Product Info */}
                       <div className="col-span-5 flex items-center gap-4">
                         <div className="relative w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                           <img 
                             src={product.product.imageCover} 
                             alt={product.product.title}
                             className="w-full h-full object-contain p-2" 
                           />
                         </div>
                         <div>
                           <h3 className="font-semibold text-gray-900 line-clamp-2">{product.product.title}</h3>
                           <p className="text-sm text-gray-500 mt-1">{product.product.category?.name}</p>
                         </div>
                       </div>

                       {/* Price */}
                       <div className="col-span-2 text-center">
                         <span className="font-semibold text-gray-900">{product.price} EGP</span>
                       </div>

                       {/* Quantity Controls */}
                       <div className="col-span-3 flex justify-center">
                         <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
                           <button 
                             onClick={() => HandleUpdateCart(product.product._id, product.count - 1)}
                             className="w-8 h-8 rounded-lg bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all flex items-center justify-center group"
                             disabled={product.count <= 1}
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                             </svg>
                           </button>
                           <span className="w-12 text-center font-semibold text-gray-900">{product.count}</span>
                           <button 
                             onClick={() => HandleUpdateCart(product.product._id, product.count + 1)}
                             className="w-8 h-8 rounded-lg bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all flex items-center justify-center"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                             </svg>
                           </button>
                         </div>
                       </div>

                       {/* Subtotal & Remove */}
                       <div className="col-span-2 flex items-center justify-between">
                         <span className="font-bold text-gray-900">{product.count * product.price} EGP</span>
                         <button 
                           onClick={() => delCartItem(product.product._id)}
                           className="w-9 h-9 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all flex items-center justify-center"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>

               {/* Footer Actions */}
               <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
                <Link
  href="/products"
  className="inline-block cursor-pointer px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-purple-500 hover:text-purple-600 transition-all"
>
  ← Continue Shopping
</Link>
                 <button 
                   onClick={handleClearCart}
                   className="cursor-pointer px-6 py-3 bg-white border-2 border-red-200 rounded-xl text-red-600 font-semibold hover:bg-red-50 hover:border-red-500 transition-all"
                 >
                   Clear Cart
                 </button>
               </div>
             </div>

             {/* Coupon Section */}
             <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Have a Coupon?</h3>
               <div className="flex gap-3">
                 <input 
                   placeholder="Enter coupon code" 
                   type="text" 
                   className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" 
                 />
                 <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                   Apply
                 </button>
               </div>
             </div>
           </div>

           {/* Order Summary */}
           <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
               
               <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                   <span className="text-gray-600">Items ({cartData?.numOfCartItems})</span>
                   <span className="font-semibold text-gray-900">{cartData?.data.totalCartPrice} EGP</span>
                 </div>
                 
                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                   <span className="text-gray-600">Shipping</span>
                   <span className="font-semibold text-green-600">Free</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-lg font-bold text-gray-900">Total</span>
                   <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                     {cartData?.data.totalCartPrice} EGP
                   </span>
                 </div>
               </div>
<Link
  href={`/checkout/${cartData?.cartId}`}
  className="block w-full py-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
>
  Proceed to Checkout →
</Link>

               {/* Trust Badges */}
               <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   <span>Secure checkout</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                     <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                   </svg>
                   <span>Free shipping on orders over $50</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                   </svg>
                   <span>Easy 30-day returns</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   ) : (
     <div className="min-h-[60vh] flex items-center justify-center">
       <div className="text-center">
         <div className="inline-block p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl mb-6">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
           </svg>
         </div>
         <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
         <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
         <Link href="/products">
           <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
             Start Shopping
           </button>
         </Link>
       </div>
     </div>
   )}
   </>
  )
}
