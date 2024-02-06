import Hero from '@/components/Hero'
import StartForm from '@/components/StartForm'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
        <Hero>
          <h1 className='text-center font-display'>Popchoice</h1>
        </Hero>

        <div className='grid w-full max-w-sm items-center gap-4 font-light'>
          <Suspense>
            <StartForm />
          </Suspense>
        </div>
      </div>
    </>
  )
}
