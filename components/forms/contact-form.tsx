"use client"

import { useActionState, useEffect } from "react"
import { sendContact, type ContactResult } from "@/app/actions/send-contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { pushEvent } from "@/lib/ga"
import { toast } from "sonner"

function SubmitBtn({ pending }: { pending: boolean }) {
  return <Button disabled={pending}>{pending ? "Sending..." : "Send"}</Button>
}

type InitialInterest = { flatType: string; tier: string; priceRange: string }

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-red-600 text-sm" role="alert">{message}</p> : null
}

export default function ContactForm({ initialInterest }: { initialInterest?: InitialInterest }) {
  const [state, formAction, pending] = useActionState<ContactResult, FormData>(
    async (_prev, formData) =>
      sendContact({
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        city: String(formData.get("city") || ""),
        service: String(formData.get("service") || ""),
        message: String(formData.get("message") || ""),
        flatType: String(formData.get("flatType") || ""),
        tier: String(formData.get("tier") || ""),
        priceRange: String(formData.get("priceRange") || ""),
        company: String(formData.get("company") || ""),
        ctaId: String(formData.get("ctaId") || ""),
      }),
    { ok: false, error: "" },
  )

  const fieldErrors = state.ok ? undefined : state.fieldErrors

  useEffect(() => {
    if (state.ok) {
      pushEvent("contact_form_submit", { method: "server_action" })
      toast.success("Mail sent successfully")
    }
  }, [state.ok])

  return (
    <form action={formAction} className="grid gap-4 max-w-xl">
      {initialInterest?.flatType && <div className="interest-summary"><p className="eyebrow">Your selected interest</p><strong>{[initialInterest.flatType, initialInterest.tier].filter(Boolean).join(" · ")}</strong>{initialInterest.priceRange && <span>Indicative range: {initialInterest.priceRange}</span>}<small>This selection will be included in your enquiry email.</small></div>}
      <input type="hidden" name="flatType" value={initialInterest?.flatType ?? ""} />
      <input type="hidden" name="tier" value={initialInterest?.tier ?? ""} />
      <input type="hidden" name="priceRange" value={initialInterest?.priceRange ?? ""} />

      {/* Honeypot. Hidden from users and from screen readers; only bots fill it. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" defaultValue="" />

      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input id="name" name="name" required placeholder="Your name" autoComplete="name" aria-invalid={!!fieldErrors?.name} />
        <FieldError message={fieldErrors?.name} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
        {/* type=tel + inputMode=numeric brings up the number pad on mobile, which is a
            real completion-rate difference on the one field that matters most. */}
        <Input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" required placeholder="98765 43210" aria-invalid={!!fieldErrors?.phone} />
        <FieldError message={fieldErrors?.phone} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="city" className="text-sm font-medium">City</label>
        <Input id="city" name="city" required placeholder="Noida" autoComplete="address-level2" aria-invalid={!!fieldErrors?.city} />
        <FieldError message={fieldErrors?.city} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Service</label>
        <Select name="service" defaultValue="Interior Design">
          <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Interior Design">Interior Design</SelectItem>
            <SelectItem value="Renovation">Renovation</SelectItem>
            <SelectItem value="Consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <Textarea id="message" name="message" rows={4} placeholder="Tell us about your project..." />
      </div>
      <SubmitBtn pending={pending} />
      {state.ok && <div className="text-green-600 text-sm">Thanks! We&apos;ll reach out shortly.</div>}
      {!state.ok && state.error && <div className="text-red-600 text-sm">{state.error}</div>}
    </form>
  )
}
