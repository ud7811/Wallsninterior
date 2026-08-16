import Image from "next/image"

export default function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <span className="brand-logo-frame"><Image className="brand-logo" src="/logo.png" alt="Walls N Interior" width={1024} height={1024} priority={priority} /></span>
}
