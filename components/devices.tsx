import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { devices } from '@/data/devices';
import { DeviceIcon } from './ui';
export function DeviceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="device-grid">
      {(compact ? devices.filter((d) => d.type !== 'player') : devices).map((d) => (
        <Link className="device-card" key={d.slug} href={`/setup/${d.slug}`}>
          <DeviceIcon type={d.type} />
          <span>{d.shortName}</span>
          <small>View setup guide ↗</small>
        </Link>
      ))}
    </div>
  );
}
export function SetupLinks() {
  return (
    <div className="guide-links">
      {devices.slice(0, 6).map((d) => (
        <Link key={d.slug} href={`/setup/${d.slug}`}>
          <DeviceIcon type={d.type} />
          <span>{d.shortName}</span>
          <ArrowUpRight />
        </Link>
      ))}
    </div>
  );
}
