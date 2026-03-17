"use client"

import { useActionState } from "react"
import { sendContact } from "@/app/actions/send-contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { pushEvent } from "@/lib/ga"
import { useEffect } from "react"
import { toast } from "sonner"

function SubmitBtn({ pending }: { pending: boolean }) {
  return <Button disabled={pending}>{pending ? "Sending..." : "Send"}</Button>
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      const payload = {
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        city: String(formData.get("city") || ""),
        service: String(formData.get("service") || ""),
        message: String(formData.get("message") || ""),
      }
      const res = await sendContact(payload)
      return res
    },
    { ok: false } as any,
  )

  useEffect(() => {
    if (state?.ok) {
      pushEvent("contact_form_submit", { method: "server_action" })
      toast.success("Mail sent successfully")
    }
  }, [state?.ok])

  return (
    <form action={formAction} className="grid gap-4 max-w-xl">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" name="name" required placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <Input id="phone" name="phone" required placeholder="+91..." />
      </div>
      <div className="grid gap-2">
        <label htmlFor="city" className="text-sm font-medium">
          City
        </label>
        <Input id="city" name="city" required placeholder="Noida" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Service</label>
        <Select name="service" defaultValue="Interior Design">
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Interior Design">Interior Design</SelectItem>
            <SelectItem value="Renovation">Renovation</SelectItem>
            <SelectItem value="Consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea id="message" name="message" rows={4} placeholder="Tell us about your project..." />
      </div>
      <SubmitBtn pending={pending} />
      {state?.ok && <div className="text-green-600 text-sm">Thanks! We&apos;ll reach out shortly.</div>}
      {state?.error && <div className="text-red-600 text-sm">Error: {state.error}</div>}
    </form>
  )
}
