'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  RadioGroup,
  RadioGroupButtonItem,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { RadioFieldType } from '@/types/FormTypes'
import { cn } from '@/lib/utils'

export function RadioButtonField({
  fieldData,
  form,
}: {
  fieldData: RadioFieldType
  form: UseFormReturn
}) {
  return (
    <FormField
      control={form.control}
      name={fieldData.id}
      render={({ field }) => (
        <FormItem className='space-y-3'>
          <FormLabel>{fieldData.label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex gap-2 items-center'
            >
              {fieldData.options.map((option, index) => (
                <FormItem key={index} className=''>
                  <FormControl>
                    {/* <RadioGroupItem value={option.value} /> */}
                    <RadioGroupButtonItem
                      value={option.value}
                      checked={field.value === option.value}
                    >
                      {option.label}
                    </RadioGroupButtonItem>
                  </FormControl>
                  {/* <FormLabel className='font-normal'>{option.label}</FormLabel> */}
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
