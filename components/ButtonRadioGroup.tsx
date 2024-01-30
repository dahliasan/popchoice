import { useState, forwardRef } from 'react'
import * as React from 'react'

import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface ButtonRadioGroupProps {
  options: { label: string; value: string }[]
  name: string
  onChange: (value: string) => void
}

type CombinedProps = ButtonRadioGroupProps &
  React.HTMLAttributes<HTMLDivElement>

export const ButtonRadioGroup = forwardRef<HTMLDivElement, CombinedProps>(
  ({ options, name, onChange, className, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null)

    const handleClick = (value: string) => {
      setSelectedValue(value)
      onChange(value)
    }

    return (
      <div
        role='group'
        aria-labelledby={`${name}-label`}
        ref={ref}
        className={cn('flex gap-2 flex-wrap', className)}
        {...props}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant='secondary'
            onClick={() => handleClick(option.value)}
            className={cn(
              'h-auto px-2 py-1 font-light hover:text-accent-foreground',
              selectedValue === option.value
                ? 'bg-accent text-accent-foreground'
                : 'bg-indigo-300/50 text-white'
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    )
  }
)

ButtonRadioGroup.displayName = 'ButtonRadioGroup'
