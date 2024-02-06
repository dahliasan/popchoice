'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { number } from 'zod'

export default function WelcomeForm() {
  const [numberOfPeople, setNumberOfPeople] = useState('1')
  return (
    <>
      <div className='grid w-full max-w-sm items-center gap-2'>
        <div>
          <Label htmlFor='pax'>How many people?</Label>
          <Input
            id='pax'
            placeholder='5'
            defaultValue={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
        </div>

        {/* <div>
          <Label htmlFor='time'>How much time do you have?</Label>
          <Input id='time' placeholder='2h 15min' />
        </div> */}

        <Link href={`/start?numberOfPeople=${numberOfPeople}`}>
          <Button className='w-full'>Start!</Button>
        </Link>
      </div>
    </>
  )
}
