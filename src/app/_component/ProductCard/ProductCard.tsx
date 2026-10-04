import Image from 'next/image'
import Link from 'next/link'
import { ProductType } from '@/api/types/productType'
import AddBtn from '../AddBtn/AddBtn'
import WishlistBtn from '../WishlistBtn/WishlistBtn'

interface ProductCardProps {
  product: ProductType
  isInWishlist?: boolean
  onRemoveFromWishlist?: () => void
  isCheckingWishlist?: boolean
}

export default function ProductCard({
  product,
  isInWishlist = false,
  onRemoveFromWishlist,
  isCheckingWishlist = false,
}: ProductCardProps) {
  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceAfterDiscount! / product.price) * 100)
    : 0
  const rating = product.ratingsAverage ?? 0

  return (
    <div className="group relative my-2">
      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        <div className="relative mb-4">
         
          {hasDiscount && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                -{discountPercent}%
              </div>
            </div>
          )}

          {!isCheckingWishlist && (
            <WishlistBtn
              productId={product._id}
              isInWishlist={isInWishlist}
              onRemove={onRemoveFromWishlist}
            />
          )}

          <Link href={`/productDetails/${product._id}`} className="block mt-12">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                width={300}
                height={300}
                src={product.imageCover}
                alt={product.title}
                className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          {product.category?.name && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                {product.category.name}
              </span>
            </div>
          )}

          <Link href={`/productDetails/${product._id}`}>
            <h3 className="text-gray-900 font-bold text-base line-clamp-2 hover:text-purple-600 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2" aria-label={`Rating ${rating} out of 5`}>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {product.priceAfterDiscount} EGP
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.price} EGP
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {product.price} EGP
                </span>
              )}
            </div>

            <AddBtn
              prodId={product._id}
              child={
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              }
              cls="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center shadow-lg hover:shadow-xl text-white transform hover:-translate-y-1 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}