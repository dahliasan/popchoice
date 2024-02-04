import Hero from '@/components/Hero'
import WelcomeForm from '@/components/WelcomeForm'

export default function Home() {
  return (
    <main className='grid place-content-center'>
      <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
        <Hero>
          <h1 className='text-center'>Popchoice</h1>
        </Hero>

        <WelcomeForm />
      </div>
    </main>
  )
}
