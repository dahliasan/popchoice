'use client'
import { useState } from 'react'
import { useCompletionStore } from '@/lib/store'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'

const Results = () => {
  const results = useCompletionStore((state) => state.results)
  const [showingCardIndex, setShowingCardIndex] = useState(0)

  return (
    <div className='space-y-8'>
      {results.map((result, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-col sm:flex-row items-center gap-6',
            index === showingCardIndex ? 'visible' : 'hidden'
          )}
        >
          {result.posterUrl && (
            <Image
              src={result.posterUrl}
              alt={result.title}
              width={250}
              height={200}
              className='rounded-md w-full'
              priority
            />
          )}

          <div className='flex flex-col gap-6'>
            <div className='max-w-sm space-y-2'>
              <span>{result.releaseYear}</span>

              <h3 className='text-4xl md:text-5xl font-semibold'>
                {result.title}
              </h3>

              <p>{result.reason}</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {result.genre_names &&
                result.genre_names.map((genre) => (
                  <Badge
                    variant='outline'
                    className='text-white text-xs font-light'
                    key={genre}
                  >
                    {genre}
                  </Badge>
                ))}
            </div>

            <Link
              href={`https://duckduckgo.com/?q=${result.title} watch free`}
              target='_blank'
            >
              <Button>
                Watch for free <ExternalLinkIcon className='w-3 ml-2' />
              </Button>
            </Link>
          </div>
        </div>
      ))}

      <div className='flex gap-4 mt-auto flex-col sm:flex-row'>
        <Button
          onClick={() => setShowingCardIndex((prev) => prev - 1)}
          disabled={showingCardIndex === 0}
          variant={'secondary'}
          className='order-2 sm:order-1'
        >
          <ArrowLeftIcon className='w-4 mr-2' /> Previous
        </Button>
        <Button
          onClick={() => setShowingCardIndex((prev) => prev + 1)}
          disabled={showingCardIndex === results.length - 1}
          className='order-1'
        >
          Next Movie <ArrowRightIcon className='w-4 ml-2' />
        </Button>
        <Link href='/' className='order-3'>
          <Button variant={'link'}>Start Again</Button>
        </Link>
      </div>
    </div>
  )
}

export default Results
