import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function WelcomeForm() {
  return (
    <>
      <div className='grid w-full max-w-sm items-center gap-2'>
        <div>
          <Label htmlFor='pax'>How many people?</Label>
          <Input id='pax' placeholder='5' />
        </div>

        <div>
          <Label htmlFor='time'>How much time do you have?</Label>
          <Input id='time' placeholder='2h 15min' />
        </div>

        <Link href='/start'>
          <Button className='w-full'>Start!</Button>
        </Link>
      </div>
    </>
  )
}
