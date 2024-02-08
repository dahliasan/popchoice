import type { Metadata } from 'next'
import { Carter_One, Roboto_Slab } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
})
const carterOne = Carter_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-carter-one',
})

export const metadata: Metadata = {
  title: 'Popchoice',
  description: 'Decide on a movie - FAST!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'text-white',
          'bg-indigo-950',
          robotoSlab.className,
          carterOne.variable
        )}
      >
        {children}
        <Link
          href='https://github.com/dahliasan/popchoice'
          className='fixed bottom-2 right-1'
        >
          <Button
            variant={'ghost'}
            className='flex gap-1 items-center text-xs bg-indigo-700 border-indigo-600 rounded-full'
          >
            <Github /> view code
          </Button>
        </Link>
      </body>
    </html>
  )
}
