import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from './navbar';
const groups = [
  {
    title: 'Explore',
    links: [
      ['Plans & pricing', '/pricing'],
      ['Free trial', '/free-trial'],
      ['Channels', '/channels'],
      ['Devices', '/devices'],
    ],
  },
  {
    title: 'Get set up',
    links: [
      ['All setup guides', '/setup'],
      ['Fire TV & Fire Stick', '/setup/firestick'],
      ['Smart TV', '/setup/smart-tv'],
      ['iPhone & iPad', '/setup/iphone-ipad'],
    ],
  },
  {
    title: 'Here to help',
    links: [
      ['IPTV guides', '/blog'],
      ['FAQs', '/faq'],
      ['Contact us', '/contact'],
      ['About KroozIPTV', '/about'],
    ],
  },
  {
    title: 'The details',
    links: [
      ['Privacy policy', '/privacy-policy'],
      ['Terms of service', '/terms'],
      ['Refund policy', '/refund-policy'],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Wordmark />
          <p>
            Entertainment, on your terms. KroozIPTV brings flexible IPTV plans and practical setup
            guidance together in one place. Explore viewing categories, check compatibility with the
            devices you already use, and talk to us before choosing your plan. From your first trial
            request to finding your way around a new player, there’s a clear place to start.
          </p>
          <Link href="/contact" className="text-link">
            Let’s talk on WhatsApp
            <ArrowUpRight size={16} />
          </Link>
        </div>
        {groups.map((g) => (
          <div className="footer-column" key={g.title}>
            <h2>{g.title}</h2>
            {g.links.map(([title, href]) => (
              <Link href={href} key={href}>
                {title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} KroozIPTV. All rights reserved.</span>
        <span>
          Made for your kind of entertainment.
          <span className="status-dot" />
        </span>
      </div>
      <div className="container footer-disclaimer">
        Content and device compatibility vary. Confirm availability before purchasing. Referenced
        trademarks belong to their respective owners.
      </div>
    </footer>
  );
}
