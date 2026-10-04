"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useQuery } from '@tanstack/react-query'
import logo from '../../../assets/freshcart-logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { CartResponseType } from '@/api/types/cartType'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/brands', label: 'Brands' },
  { href: '/categories', label: 'Categories' },
]

const iconBtn = "relative p-2 rounded-xl hover:bg-purple-50 transition-colors"
const iconCls = "w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors"
const badgeCls =
  "absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"

export default function Navbar() {
  const pathname = usePathname() ?? '/'
  const { status } = useSession()
  const isAuth = status === 'authenticated'

  const { data: cartData } = useQuery<CartResponseType>({
    queryKey: ['getCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
    enabled: isAuth,
  })

  const { data: wishlistData } = useQuery<{ count: number }>({
    queryKey: ['getWishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('Failed to fetch wishlist')
      return response.json()
    },
    enabled: isAuth,
  })

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  return (
    <nav className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm'>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-transform">
            <Image src={logo} alt='Fresh Cart' className="h-10 w-auto" />
          </Link>

        
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-semibold transition-colors relative group ${
                    active ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

         
          <div className="hidden md:flex items-center space-x-6">
            {isAuth ? (
              <>
                <Link href='/cart' className="relative group" aria-label="Cart">
                  <div className={iconBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconCls}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {(cartData?.numOfCartItems ?? 0) > 0 && (
                      <span className={badgeCls}>{cartData?.numOfCartItems}</span>
                    )}
                  </div>
                </Link>

                <Link href='/wishList' className="relative group" aria-label="Wishlist">
                  <div className={iconBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconCls}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {(wishlistData?.count ?? 0) > 0 && (
                      <span className={badgeCls}>{wishlistData?.count}</span>
                    )}
                  </div>
                </Link>

                <Link
                  href='/allorders'
                  className={`font-semibold transition-colors ${
                    isActive('/allorders') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Orders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href='/login'
                className='inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 rounded-xl hover:bg-purple-50" aria-label="Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-72 p-4 space-y-3">
                      <ListItem href="/" title="Home">Discover our latest products</ListItem>
                      <ListItem href="/products" title="Shop">Browse all products</ListItem>
                      <ListItem href="/brands" title="Brands">Explore top brands</ListItem>
                      <ListItem href="/categories" title="Categories">Shop by category</ListItem>

                      {isAuth ? (
                        <>
                          <ListItem href="/cart" title={`Cart${(cartData?.numOfCartItems ?? 0) > 0 ? ` (${cartData?.numOfCartItems})` : ''}`}>
                            View your cart
                          </ListItem>
                          <ListItem href="/wishList" title={`Wishlist${(wishlistData?.count ?? 0) > 0 ? ` (${wishlistData?.count})` : ''}`}>
                            Items saved for later
                          </ListItem>
                          <ListItem href="/allorders" title="Orders">Track your orders</ListItem>
                          <li>
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold"
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <ListItem href="/login" title="Sign In">Access your account</ListItem>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div>
          </Link>
        }
      />
    </li>
  )
}