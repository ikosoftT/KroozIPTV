'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { Menu, X, Play, ArrowUpRight } from 'lucide-react';
import { WhatsAppButton } from './whatsapp';
const links = [
  ['Home', '/'],
  ['Pricing', '/pricing'],
  ['Channels', '/channels'],
  ['Free Trial', '/free-trial'],
  ['Blog', '/blog'],
  ['Setup', '/setup'],
  ['FAQ', '/faq'],
];
export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="KroozIPTV home">
      <span className="brand-symbol">
        <Play size={19} fill="currentColor" />
      </span>
      <span>
        Krooz<span className="brand-light">IPTV</span>
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
export function Navbar() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  function close() {
    dialog.current?.close();
    document.body.style.overflow = '';
    opener.current?.focus();
  }
  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              className={pathname === href ? 'active' : ''}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/free-trial" className="nav-trial">
            Free Trial
          </Link>
          <WhatsAppButton className="primary nav-buy" source="navbar">
            Get KroozIPTV
          </WhatsAppButton>
          <button
            ref={opener}
            className="icon-button menu-button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = 'hidden';
            }}
          >
            <Menu />
          </button>
        </div>
      </div>
      <dialog
        className="mobile-dialog"
        aria-label="Site navigation"
        ref={dialog}
        onClose={() => {
          document.body.style.overflow = '';
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-panel">
          <div className="mobile-head">
            <span className="wordmark">KroozIPTV.</span>
            <button className="icon-button" onClick={close} aria-label="Close navigation">
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <WhatsAppButton className="primary" source="mobile-menu">
            Get KroozIPTV
          </WhatsAppButton>
          <p>Entertainment, on your terms.</p>
        </div>
      </dialog>
    </header>
  );
}
