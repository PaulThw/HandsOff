'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, QrCode, User } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  function Item({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`flex flex-col items-center justify-center px-4 py-2 text-sm ${
          active ? 'text-apricot-400' : 'text-gray-300'
        }`}
      >
        <Icon className="h-5 w-5 mb-1" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur border-t border-border">
      <div className="mx-auto max-w-screen-md grid grid-cols-4">
        <Item href="/" label="Home" icon={Home} />
        <Item href="/dolmetscher" label="Suche" icon={Search} />
        <Item href="/qr-scan" label="QR" icon={QrCode} />
        <Item href="/login" label="Login" icon={User} />
      </div>
    </nav>
  );
}
