export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='min-h-screen grid place-content-center pt-8 pb-12 px-4'>
      {children}
    </main>
  )
}
