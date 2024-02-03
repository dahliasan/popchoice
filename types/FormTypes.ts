export type TextFieldType = BaseFieldType & {
  type: 'text' | 'textarea'
  placeholder?: string
}

export type RadioFieldType = BaseFieldType & {
  type: 'radio'
  options: { label: string; value: string }[]
}

export type BaseFieldType = {
  id: string
  label: string
}

export type Field = TextFieldType | RadioFieldType
