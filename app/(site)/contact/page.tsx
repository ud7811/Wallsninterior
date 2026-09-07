import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"
import ContactForm from "@/components/forms/contact-form"
import { buildWhatsAppLink } from "@/lib/whatsapp"
import { getEmailHealth } from "@/lib/email"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({
    title: "Contact Our Crossings Republik Studio",
    description: "Visit or contact Walls N Interior in Crossings Republik, Ghaziabad for a home, office, or renovation consultation.",
    path: "/contact",
  })

function firstParam(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] ?? "" : value ?? "" }

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const interest = { flatType: firstParam(params.flat), tier: firstParam(params.tier), priceRange: firstParam(params.range) }
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917428095297"
  const wa = buildWhatsAppLink({ number: whatsapp, text: "Hi Walls N Interior, I'd like a design consultation" })
  const emailHealth = getEmailHealth()

  return (
    <div className="section">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="font-serif text-3xl mb-4">Contact</h1>
          <p className="text-muted-foreground mb-6">We&apos;d love to hear about your project. Fill this form or message us on WhatsApp.</p>
          {emailHealth.ok && emailHealth.notes?.some(note => note.includes("test sender")) && (
            <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Email is currently using Resend&apos;s test sender. Add <code>RESEND_FROM_EMAIL</code> in Vercel to receive production mail at your inbox.
            </div>
          )}
          {!emailHealth.ok && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
              Email config error: {emailHealth.error}
            </div>
          )}
          <div className="text-sm mb-4">
            <a className="underline" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
          <ContactForm initialInterest={interest} />
        </div>
        <div className="card p-6">
          <div className="font-semibold mb-2">Studio</div>
          <p className="text-sm text-muted-foreground">
            LGF-11, Avantika Retail Street, Crossings Republik, Ghaziabad, Uttar Pradesh 201016, India
          </p>
          <div className="mt-4 text-sm">
            <div><strong>Phone:</strong> <a className="underline" href="tel:+917428095297">+917428095297</a></div>
            <div><strong>Email:</strong> <a className="underline" href="mailto:wallsninterior@gmail.com">wallsninterior@gmail.com</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
