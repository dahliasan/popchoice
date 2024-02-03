'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Hero from '@/components/Hero'
import StartForm from '@/components/StartForm'

export default function Page() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center py-8 bg-indigo-950'>
        <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
          <Hero>
            <h1 className='text-center font-display'>Popchoice</h1>
          </Hero>

          <div className='grid w-full max-w-sm items-center gap-4 font-light'>
            <StartForm />
          </div>
        </div>
      </main>
    </>
  )
}
