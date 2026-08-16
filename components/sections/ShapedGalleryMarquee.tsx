"use client"

import Image from "next/image"
import * as React from "react"

type Item = { src: string; alt?: string; href?: string }
type Props = { items?: Item[]; title?: string }

const FALLBACK_UNSPLASH: Item[] = [
  {
    src: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=1600&q=70&auto=format&fit=crop",
    alt: "Elegant living room with warm textures",
  },
  {
    src: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1600&q=70&auto=format&fit=crop",
    alt: "Natural light and sheer curtains",
  },
  {
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=70&auto=format&fit=crop",
    alt: "Scandi white kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1600&q=70&auto=format&fit=crop",
    alt: "Serene bedroom styling",
  },
  {
    src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=70&auto=format&fit=crop",
    alt: "Mid-century chair with moody wall",
  },
  {
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=70&auto=format&fit=crop",
    alt: "Dining table in neutral palette",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=70&auto=format&fit=crop",
    alt: "Minimal office corner",
  },
  {
    src: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=1600&q=70&auto=format&fit=crop",
    alt: "Pampas arrangement and round mirror",
  },
  {
    src: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=1600&q=70&auto=format&fit=crop",
    alt: "Cozy bedroom with layered bedding",
  },
  {
    src: "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=1600&q=70&auto=format&fit=crop",
    alt: "Calm entryway styling",
  },
  {
    src: "https://images.unsplash.com/photo-1493660412993-7dacf7beaa0a?w=1600&q=70&auto=format&fit=crop",
    alt: "Kitchen island and wood cabinetry",
  },
  {
    src: "https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?w=1600&q=70&auto=format&fit=crop",
    alt: "Green textured feature wall",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=70&auto=format&fit=crop",
    alt: "Spa-inspired bathroom",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=70&auto=format&fit=crop",
    alt: "Sunlit staircase and lattice",
  },
  {
    src: "https://images.unsplash.com/photo-1505692794403-34d4982a83cd?w=1600&q=70&auto=format&fit=crop",
    alt: "Rattan outdoor seating",
  },
  {
    src: "https://images.unsplash.com/photo-1493666438910-6f37d2e8d4f1?w=1600&q=70&auto=format&fit=crop",
    alt: "Botanical feature wall",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=70&auto=format&fit=crop",
    alt: "Soft green wall close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1600&q=70&auto=format&fit=crop",
    alt: "Geometric pattern detail",
  },
]

const SIZES = ["w-28 h-28", "w-36 h-36", "w-48 h-48", "w-56 h-56"] as const

function hashStr(s: string) {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i)
  return h >>> 0
}
function pickStable<T>(key: string, arr: readonly T[]) {
  const h = hashStr(key)
  return arr[h % arr.length]
}
function stableRotationDeg(key: string) {
  const h = hashStr(key)
  // rotate between -10deg and +10deg
  return (h % 21) - 10
}

async function fetchSanityImages(): Promise<Item[] | null> {
  try {
    const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const ds = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
    if (!pid || !ds) return null
    const v = "2023-10-10"
    const url = (q: string) => `https://${pid}.apicdn.sanity.io/v${v}/data/query/${ds}?query=${encodeURIComponent(q)}`
    const q1 = `*[_type=="project" && defined(coverImage.asset->url)]|order(publishedAt desc)[0...24]{ "url": coverImage.asset->url }`
    const r1 = await fetch(url(q1))
    const d1 = (await r1.json())?.result?.map((x: any) => x.url) || []
    const urls = Array.from(new Set<string>(d1)).slice(0, 24)
    if (!urls.length) return null
    return urls.map((u) => ({ src: u, alt: "Inspiration image" }))
  } catch {
    return null
  }
}

function Track({
  items,
  duration,
  playing,
  label,
}: {
  items: Item[]
  duration: number
  playing: boolean
  label: string
}) {
  const dup = [...items, ...items]
  return (
    <div className="marquee-row" role="list" aria-label={label}>
      <div className={`marquee-track ${playing ? "is-playing" : ""}`} style={{ ["--dur" as any]: `${duration}s` }}>
        {dup.map((it, idx) => {
          const key = (it.href || it.src) + "-" + idx
          const size = pickStable(key + "size", SIZES)
          const rot = stableRotationDeg(key)
          const Comp: any = it.href ? "a" : "div"
          return (
            <Comp
              key={key}
              href={it.href}
              className={`group relative ${size} shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-2)]`}
              aria-hidden={it.href ? undefined : "true"}
              role="listitem"
            >
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-shadow"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <Image
                  src={it.src || "/placeholder.svg"}
                  alt={it.alt || "Inspiration image"}
                  fill
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </Comp>
          )
        })}
      </div>
    </div>
  )
}

export default function ShapedGalleryMarquee({ items, title = "Inspiration Wall" }: Props) {
  const [data, setData] = React.useState<Item[] | null>(items || null)
  const [playing, setPlaying] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  React.useEffect(() => {
    let cancelled = false
    if (items && items.length) return
    ;(async () => {
      const cms = await fetchSanityImages()
      const result = cms && cms.length >= 12 ? cms : FALLBACK_UNSPLASH
      if (!cancelled) setData(result)
    })()
    return () => {
      cancelled = true
    }
  }, [items])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting)
        setPlaying(vis && !prefersReduced)
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReduced])

  // Replace this:
  // const rows = splitIntoRows(data || FALLBACK_UNSPLASH, 3)

  // With this:
  const list = data || FALLBACK_UNSPLASH

  return (
    <section ref={rootRef} className="section bg-[var(--bg)]" aria-label="Inspiration Wall">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-6">{title}</h2>
        {/* Find: */}
        <div className="marquee">
          {/* Replace with (keeps the same centered-start motion and a smooth speed): */}
          <Track items={list} duration={65} playing={playing} label="Inspiration images marquee" />
        </div>
      </div>
    </section>
  )
}
