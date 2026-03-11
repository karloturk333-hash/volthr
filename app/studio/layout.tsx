export const metadata = {
  title: "Volt CMS",
  description: "Content management for Volt",
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: "100vh", margin: 0 }}>
      {children}
    </div>
  )
}
