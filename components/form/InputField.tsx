import { TextFieldType } from '@/types/types'
import { UseFormReturn } from 'react-hook-form'

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '../ui/input'

const InputField = ({
  fieldData,
  form,
}: {
  fieldData: TextFieldType
  form: UseFormReturn
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldData.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldData.label}</FormLabel>
          <FormControl>
            <Input placeholder={fieldData.placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputField
