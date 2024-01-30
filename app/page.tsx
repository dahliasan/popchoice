import Hero from '@/components/Hero'
import ScreenOne from '@/components/ScreenOne'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center pt-8 bg-indigo-950'>
      <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
        <Hero>
          <h1 className='text-center'>Popchoice</h1>
        </Hero>

        <ScreenOne />
      </div>
    </main>
  )
}
