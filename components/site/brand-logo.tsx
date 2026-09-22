import Image from "next/image"

export default function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-logo" src="/logo-wordmark.png" alt="Walls N Interior" width={84} height={32} priority={priority} />
}
