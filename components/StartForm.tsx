'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import TextAreaField from './form/TextareaField'
import InputField from './form/InputField'
import { fields } from '@/db/formFields'
import { RadioButtonField } from './form/RadioButtonField'

import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'

import { useCompletionStore } from '@/lib/store'

const formObject = fields.reduce<Record<string, z.ZodString>>((acc, field) => {
  acc[field.id] = z.string()
  return acc
}, {})

const formSchema = z.object(formObject)
const defaultValues = fields.reduce<Record<string, string>>((acc, field) => {
  acc[field.id] = ''
  if (field.type === 'radio') {
    acc[field.id] = field.options[0].value
  }

  return acc
}, {})

export default function StartForm() {
  const { complete, isLoading } = useCompletion()

  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Combine all the answers into a string
    const answer = Object.keys(values)
      .map((key) => `${values[key]}`)
      .join('\n')

    const completion = await complete(answer)

    if (completion) {
      const results = JSON.parse(completion)
      useCompletionStore.setState({ results })
      router.push('/results')
    }

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {fields.map((field, index) => {
          switch (field.type) {
            case 'text':
              return <InputField key={index} fieldData={field} form={form} />
            case 'textarea':
              return <TextAreaField key={index} fieldData={field} form={form} />
            case 'radio':
              return (
                <RadioButtonField key={index} fieldData={field} form={form} />
              )
            default:
              return null
          }
        })}

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
