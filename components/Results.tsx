'use client'
import { useState } from 'react'
import { useCompletionStore } from '@/lib/store'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const Results = () => {
  const results = useCompletionStore((state) => state.results)
  const [showingCardIndex, setShowingCardIndex] = useState(0)

  return (
    <div className='space-y-8'>
      <div>
        {results.map((result, index) => (
          <>
            <div
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
                />
              )}

              <div className='flex flex-col'>
                <div className='max-w-sm space-y-2'>
                  <span className='text-sm'>
                    {new Date(result.releaseYear).getFullYear()}
                  </span>
                  <h3 className='text-4xl md:text-5xl font-semibold'>
                    {result.title}
                  </h3>
                  <p>{result.reason}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className='flex gap-4 mt-auto flex-col sm:flex-row'>
        <Button
          onClick={() => setShowingCardIndex((prev) => prev - 1)}
          disabled={showingCardIndex === 0}
          variant={'secondary'}
          className='order-2 sm:order-1'
        >
          Previous
        </Button>
        <Button
          onClick={() => setShowingCardIndex((prev) => prev + 1)}
          disabled={showingCardIndex === results.length - 1}
          className='order-1'
        >
          Next Movie
        </Button>
      </div>
    </div>
  )
}

export default Results

type MovieCard = {
  title: string
  description: string
  imgUrl: string
  className?: string
}

const MovieCard = ({
  title,
  description,
  imgUrl,
  className,
  ...props
}: MovieCard) => {
  return (
    <div
      className={cn(
        'flex flex-wrap md:flex-nowrap items-center gap-6 px-4',
        className
      )}
      {...props}
    >
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={title}
          width={250}
          height={200}
          className='rounded-md'
        />
      )}
      <div className='max-w-sm space-y-2'>
        <h3 className='text-4xl'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
