import Hero from '@/components/Hero'
import WelcomeForm from '@/components/WelcomeForm'

export default function Home() {
  return (
    <main className='min-h-screen grid place-content-center py-8 px-4'>
      <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
        <Hero>
          <div className='max-w-sm text-center text-balance space-y-2'>
            <h1 className='text-center'>Popchoice</h1>
            <p className='font-display text-sm'>
              Stop wasting time deciding what to watch. Popchoice will help you.
            </p>
          </div>
        </Hero>

        <WelcomeForm />
      </div>
    </main>
  )
}
