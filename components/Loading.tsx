import PopcornImage from '@/public/popchoice-icon.png'
import Image from 'next/image'

export function Loading() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center max-w-xs'>
      <p className='text-center animate-pulse'>
        Hang tight... <br />
        finding you recommendations you&apos;ll ❤️!
      </p>
    </div>
  )
}
