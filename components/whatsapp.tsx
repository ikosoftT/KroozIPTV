'use client';
import { useRef } from 'react';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import type { Plan } from '@/lib/types';
export function WhatsAppButton({
  children,
  message = 'Hi KroozIPTV, I would like help choosing a plan.',
  source = 'general',
  plan,
  className = '',
  icon = true,
}: {
  children: React.ReactNode;
  message?: string;
  source?: string;
  plan?: string;
  className?: string;
  icon?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const url = buildWhatsAppUrl({ message, source, plan });
  if (!url)
    return (
      <>
        <button className={`button ${className}`} onClick={() => ref.current?.showModal()}>
          {children}
          {icon && <ArrowUpRight size={17} />}
        </button>
        <dialog ref={ref} className="notice-dialog">
          <button
            className="icon-button close-dialog"
            aria-label="Close"
            onClick={() => ref.current?.close()}
          >
            <X />
          </button>
          <h2>WhatsApp is being connected</h2>
          <p>
            Online ordering is currently unavailable. Please return later to request your plan or
            trial. No order or payment has been submitted.
          </p>
          <button className="button" onClick={() => ref.current?.close()}>
            Got it
          </button>
        </dialog>
      </>
    );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`button ${className}`}
      onClick={() => trackEvent('whatsapp_click', { source, ...(plan ? { plan } : {}) })}
    >
      {children}
      {icon && <ArrowUpRight size={17} />}
    </a>
  );
}
export function PlanCTA({ plan, source }: { plan: Plan; source: string }) {
  return (
    <WhatsAppButton
      message={plan.whatsappMessage}
      plan={plan.id}
      source={source}
      className={plan.highlighted ? 'primary' : 'outline'}
    >
      Choose {plan.name}
    </WhatsAppButton>
  );
}
export function FloatingWhatsApp() {
  return (
    <WhatsAppButton className="floating-whatsapp" source="floating-button" icon={false}>
      <MessageCircle size={23} />
      <span>Let’s talk</span>
      <span className="sr-only"> on WhatsApp (opens in new tab)</span>
    </WhatsAppButton>
  );
}
