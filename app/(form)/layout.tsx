export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='min-h-screen grid place-content-center py-8'>
      {children}
    </main>
  )
}
