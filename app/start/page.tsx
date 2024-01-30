'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ButtonRadioGroup } from '@/components/ButtonRadioGroup'
import Hero from '@/components/Hero'
import slugify from 'slugify'
import { Textarea } from '@/components/ui/textarea'

const fields: Field[] = [
  {
    label: `What's your favourite movie and why?`,
    type: 'textarea',
    placeholder: `The Shawshank Redemption. Because it taught me to never give up hope no matter how hard life gets`,
  },
  {
    label: `Are you in the mood for something new or a classic?`,
    type: 'radio',
    options: [
      {
        label: 'New',
        value: 'new',
      },
      {
        label: 'Classic',
        value: 'classic',
      },
    ],
  },
  {
    label: `What are you in the mood for?`,
    type: 'radio',
    options: [
      {
        label: 'Fun',
        value: 'fun',
      },
      {
        label: 'Serious',
        value: 'serious',
      },
      {
        label: 'Inspiring',
        value: 'inspiring',
      },
      {
        label: 'Scary',
        value: 'scary',
      },
    ],
  },
  {
    label: `Which famous film person would you love to be stranded on an island with and why?`,
    type: 'textarea',
    placeholder: `Steven Spielberg. He's a genius and I'd love to pick his brain`,
  },
]

type BaseFieldType = {
  label: string
}

type TextFieldType = BaseFieldType & {
  type: 'text' | 'textarea'
  placeholder?: string
}

type RadioFieldType = BaseFieldType & {
  type: 'radio'
  options: { label: string; value: string }[]
}

type Field = TextFieldType | RadioFieldType

export default function Page() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center pt-8 bg-indigo-950'>
        <div className='max-w-prose min-w-[min(100%,250px)] grid justify-items-center gap-4'>
          <Hero>
            <h1 className='text-center'>Popchoice</h1>
          </Hero>

          <div className='grid w-full max-w-sm items-center gap-4 font-light'>
            {fields.map((field, index) => {
              if (field.type === 'textarea') {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <Label htmlFor={slugify(field.label)}>{field.label}</Label>
                    <Textarea
                      id={slugify(field.label)}
                      placeholder={field.placeholder}
                    />
                  </div>
                )
              } else if (field.type === 'radio') {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <Label htmlFor={slugify(field.label)}>{field.label}</Label>
                    <ButtonRadioGroup
                      name={field.label}
                      options={field.options}
                      onChange={() => {}}
                      id={slugify(field.label)}
                    />
                  </div>
                )
              }
            })}

            <Button>Start!</Button>
          </div>
        </div>
      </main>
    </>
  )
}
