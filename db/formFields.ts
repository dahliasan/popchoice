import { Field } from '@/types/FormTypes'
export const fields: Field[] = [
  {
    id: 'favourite_movie',
    label: `What's your favourite movie and why?`,
    type: 'textarea',
    placeholder: `The Shawshank Redemption. Because it taught me to never give up hope no matter how hard life gets`,
  },
  {
    id: 'new_or_classic',
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
    id: 'mood',
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
    id: 'stranded_on_island',
    label: `Which famous film person would you love to be stranded on an island with and why?`,
    type: 'textarea',
    placeholder: `Steven Spielberg. He's a genius and I'd love to pick his brain`,
  },
]
