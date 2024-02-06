import PopcornImage from '@/public/popchoice-icon.png'
import Image from 'next/image'

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Image src={PopcornImage} alt='Popcorn' width={100} height={100} />
      {children}
    </div>
  )
}
