import Hero from '@/components/Hero'
import WelcomeForm from '@/components/WelcomeForm'

export default function Home() {
  return (
    <main className='min-h-screen grid place-content-center py-8'>
      <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
        <Hero>
          <h1 className='text-center'>Popchoice</h1>
        </Hero>

        <WelcomeForm />
      </div>
    </main>
  )
}
