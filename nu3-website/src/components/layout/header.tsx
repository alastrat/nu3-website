'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, Heart, MapPin, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CtaButton } from '@/components/ui/cta-button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

// Social media links from nu3.co
const SOCIAL_LINKS = [
    { href: 'https://www.facebook.com/nu3Colombia', icon: 'facebook', label: 'Facebook' },
    { href: 'https://twitter.com/nu3Colombia', icon: 'twitter', label: 'Twitter' },
    { href: 'https://www.instagram.com/nu3colombia/', icon: 'instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/@nu3Colombia', icon: 'youtube', label: 'YouTube' },
    { href: 'https://www.tiktok.com/@nu3colombia', icon: 'tiktok', label: 'TikTok' },
] as const;

const navItems = [
    { href: '/quienes-somos', key: 'about' },
    { href: '/programas', key: 'programs' },
    { href: '/huertas-productivas', key: 'gardens' },
    { href: '/unidades-productivas', key: 'units' },
    { href: '/apadrina', key: 'sponsor' },
    { href: '/empresas', key: 'partners' },
    { href: '/blog', key: 'blog' },
    { href: '/contacto', key: 'contact' },
] as const;

// Social media icon components
function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function TwitterIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
    );
}

function YouTubeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

function getSocialIcon(icon: string, className?: string) {
    switch (icon) {
        case 'facebook':
            return <FacebookIcon className={className} />;
        case 'twitter':
            return <TwitterIcon className={className} />;
        case 'instagram':
            return <InstagramIcon className={className} />;
        case 'youtube':
            return <YouTubeIcon className={className} />;
        case 'tiktok':
            return <TikTokIcon className={className} />;
        default:
            return null;
    }
}

export function Header() {
    const t = useTranslations('nav');
    const tCta = useTranslations('cta');
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Handle sticky header on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="relative z-50">
            {/* Top Bar */}
            <div className="bg-[#1E252F] text-white">
                <div className="max-w-[96vw] mx-auto flex items-center justify-between">
                    {/* Left side - Address */}
                    <div className="flex items-center">
                        <div className="relative flex items-center gap-2 py-3 pr-6 text-sm font-medium">
                            {/* Orange background pill */}
                            <div className="absolute inset-0 -left-8 bg-[#EB5310] rounded-r-full -z-10" />
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="hidden sm:inline">Cra. 9E #137-21, Barranquilla, Colombia</span>
                            <span className="sm:hidden">Barranquilla, Colombia</span>
                        </div>
                    </div>

                    {/* Right side - Social links */}
                    <div className="flex items-center gap-4 py-3">
                        <span className="text-sm font-medium hidden md:inline">Síguenos:</span>
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.icon}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#EB5310] transition-colors"
                                    aria-label={social.label}
                                >
                                    {getSocialIcon(social.icon, 'w-4 h-4')}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header / Navigation */}
            <div
                className={cn(
                    'transition-all duration-300',
                    isSticky
                        ? 'fixed top-0 left-0 right-0 bg-white shadow-lg'
                        : 'bg-white'
                )}
            >
                <div className="max-w-[96vw] mx-auto flex items-center justify-between gap-8 py-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <Image
                            src="/nu3_logo.svg"
                            alt="Fundación nu3"
                            width={120}
                            height={48}
                            className="h-12 w-auto"
                            priority
                        />
                        <span className="text-xl font-bold text-[#1E252F] hidden sm:inline">
                            Fundación nu3
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 flex-grow justify-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={cn(
                                    'text-sm font-semibold py-6 transition-colors hover:text-[#EB5310]',
                                    pathname === item.href
                                        ? 'text-[#EB5310]'
                                        : 'text-[#1E252F]'
                                )}
                            >
                                {t(item.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        {/* Donate button - Desktop */}
                        <CtaButton
                            href="/dona"
                            variant="primary"
                            size="sm"
                            className="hidden sm:inline-flex"
                        >
                            {tCta('donate')}
                        </CtaButton>

                        {/* Mobile menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-[#1E252F]">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 bg-white">
                                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                                <div className="flex flex-col gap-6 pt-6">
                                    {/* Mobile logo */}
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Image
                                            src="/nu3_logo.svg"
                                            alt="Fundación nu3"
                                            width={100}
                                            height={40}
                                            className="h-10 w-auto"
                                        />
                                    </Link>

                                    {/* Mobile nav items */}
                                    <nav className="flex flex-col">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    'py-3 text-base font-semibold border-b border-gray-100 transition-colors hover:text-[#EB5310]',
                                                    pathname === item.href
                                                        ? 'text-[#EB5310]'
                                                        : 'text-[#1E252F]'
                                                )}
                                            >
                                                {t(item.key)}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Mobile donate button */}
                                    <CtaButton
                                        href="/dona"
                                        variant="primary"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {tCta('donate')}
                                    </CtaButton>

                                    {/* Mobile social links */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">Síguenos:</span>
                                        <div className="flex items-center gap-3">
                                            {SOCIAL_LINKS.map((social) => (
                                                <a
                                                    key={social.icon}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#1E252F] hover:text-[#EB5310] transition-colors"
                                                    aria-label={social.label}
                                                >
                                                    {getSocialIcon(social.icon, 'w-5 h-5')}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
