'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Globe, GitFork, ExternalLink, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { profile } from '@/lib/data'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CopyButton } from '@/components/ui/CopyButton'
import { ErrorPanel } from '@/components/ui/ErrorPanel'

const contactEndpoints = [
  { method: 'GET', endpoint: '/contact/email', value: profile.email, icon: Mail, label: 'Email', link: undefined as string | undefined },
  { method: 'GET', endpoint: '/contact/phone', value: profile.phone, icon: Phone, label: 'Phone', link: undefined },
  { method: 'GET', endpoint: '/contact/linkedin', value: 'linkedin.com/in/moin-shariff', icon: Globe, label: 'LinkedIn', link: profile.linkedin },
  { method: 'GET', endpoint: '/contact/github', value: 'github.com/moinshariff26', icon: GitFork, label: 'GitHub', link: profile.github },
]

const curlText = 'curl https://moinshariff.vercel.app/api/profile'

interface FormFields {
  name: string
  email: string
  message: string
}

export function ContactSection() {
  const [form, setForm] = useState<FormFields>({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setError('EmailJS is not configured. Add env vars to get started.')
      return
    }

    setSending(true)
    setError(null)

    try {
      await emailjs.send(serviceId, templateId, form as unknown as Record<string, unknown>, publicKey)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <SectionWrapper id="contact" label="06 / CONTACT API">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-3">
            {contactEndpoints.map((ep) => (
              <div
                key={ep.endpoint}
                className="glass-card px-4 py-3 flex items-center gap-3"
              >
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20 shrink-0 uppercase leading-none">
                  {ep.method}
                </span>
                <code className="font-mono text-xs text-text-secondary shrink-0 hidden sm:block">
                  {ep.endpoint}
                </code>
                <div className="flex-1 min-w-0">
                  {ep.link ? (
                    <a
                      href={ep.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-text-primary hover:text-accent transition-colors truncate"
                    >
                      <span className="truncate">{ep.value}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                  ) : (
                    <span className="text-sm text-text-primary truncate block">{ep.value}</span>
                  )}
                </div>
                {!ep.link && <CopyButton text={ep.value} label={ep.label} />}
              </div>
            ))}
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                Example: cURL
              </span>
              <CopyButton text={curlText} />
            </div>
            <pre className="font-mono text-xs text-text-secondary bg-bg-secondary p-3 rounded-lg overflow-x-auto">
              <code>{curlText}</code>
            </pre>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <span className="font-mono text-[10px] px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20 uppercase leading-none">POST</span>
            <code className="font-mono text-xs text-text-secondary">/contact/message</code>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle size={40} className="text-success mb-4" />
              <p className="text-sm text-text-primary font-medium">Message delivered.</p>
              <p className="text-xs text-text-muted mt-1">Expect a response within 24h.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-text-muted mb-1.5">
                  name <span className="text-error">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs text-text-muted mb-1.5">
                  email <span className="text-error">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-mono text-xs text-text-muted mb-1.5">
                  message <span className="text-error">*</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {error && (
                <ErrorPanel status="400" source="Contact Form" reason={error} />
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-medium hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
