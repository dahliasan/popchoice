export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className='grid place-content-center'>{children}</main>
}
