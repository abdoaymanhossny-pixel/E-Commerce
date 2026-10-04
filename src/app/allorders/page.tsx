import Link from 'next/link'
import Image from 'next/image'
import { getUserOrders } from '@/api/services/ordersApi'

interface CartItem {
  count: number
  _id: string
  product: {
    _id: string
    title: string
    imageCover: string
    price: number
  } | null
  price: number 
}

interface Order {
  _id: string
  user?: {
    name: string
    email: string
  }
  cartItems: CartItem[]
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
}

const formatPrice = (n: number) =>
  `${new Intl.NumberFormat('en-US').format(n)} EGP`

export default async function AllOrders() {
  let orders: Order[] = []
  let error: string | null = null

  try {
    const res = await getUserOrders()
    
    const list = Array.isArray(res) ? res : res?.data
    orders = Array.isArray(list) ? list : []
    
    orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load orders'
    console.error('Orders page error:', e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
       
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Orders
          </h1>
          {!error && (
            <p className="text-gray-600">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </p>
          )}
        </div>

      
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-semibold mb-2">Unable to load orders</div>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

     
        {!error && orders.length === 0 && (
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        )}

        
        {orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="text-sm opacity-90 mb-1">Order ID</div>
                      <div className="font-mono text-lg font-semibold">
                        #{order._id.slice(-8)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90 mb-1">Order Date</div>
                      <div className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC', 
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90 mb-1">Total Amount</div>
                      <div className="text-2xl font-bold">
                        {formatPrice(order.totalOrderPrice)}
                      </div>
                    </div>
                  </div>
                </div>

               
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.isPaid ? '✓ Paid' : '⏳ Payment Pending'}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.isDelivered
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {order.isDelivered ? '✓ Delivered' : '🚚 In Transit'}
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                      {order.paymentMethodType === 'cash'
                        ? '💵 Cash on Delivery'
                        : '💳 Online Payment'}
                    </span>
                  </div>
                </div>

              
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Items</h3>
                  <div className="space-y-4">
                    {order.cartItems.map((item) => {
                      const unitPrice = item.price
                      const lineTotal = unitPrice * item.count

                      return (
                        <div
                          key={item._id}
                          className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                            {item.product?.imageCover ? (
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={80}
                                height={80}
                                className="object-contain w-full h-full p-2"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                              {item.product?.title ?? 'Product unavailable'}
                            </h4>
                            <div className="text-sm text-gray-600">
                              Quantity:{' '}
                              <span className="font-semibold text-gray-900">
                                {item.count}
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-purple-600">
                              {formatPrice(lineTotal)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {unitPrice} × {item.count}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}