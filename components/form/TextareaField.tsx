import { TextFieldType } from '@/types/types'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'

const TextAreaField = ({
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
            <Textarea placeholder={fieldData.placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextAreaField
