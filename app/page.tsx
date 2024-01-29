import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PopcornImage from '@/public/popchoice-icon.png'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-indigo-950'>
      <div className='max-w-prose grid justify-items-center gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <Image src={PopcornImage} alt='Popcorn' />
          <h1 className='text-6xl font-display text-white text-center'>
            Popchoice
          </h1>
        </div>

        <div className='grid w-full max-w-sm items-center gap-2'>
          <div>
            <Label htmlFor='pax'>How many people?</Label>
            <Input id='pax' placeholder='5' />
          </div>

          <div>
            <Label htmlFor='time'>How much time do you have?</Label>
            <Input id='time' placeholder='2h 15min' />
          </div>

          <Button>Start!</Button>
        </div>
      </div>
    </main>
  )
}
