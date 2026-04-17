import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Link, routing } from '@/i18n/routing';
import { Heart, Users, ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        es: 'Contacto - Fundación nu3',
        en: 'Contact - nu3 Foundation',
        fr: 'Contact - Fondation nu3',
    };

    return {
        title: titles[locale] || titles.es,
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'contact' });

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
                    <div className="container mx-auto px-4">
                        <FadeIn className="mx-auto max-w-3xl text-center">
                            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                {t('title')}
                            </h1>
                            <p className="mt-6 text-xl text-primary font-medium">
                                {t('subtitle')}
                            </p>
                            <p className="mt-4 text-lg text-muted-foreground">
                                {t('description')}
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Contact form and info */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 lg:grid-cols-2">
                            {/* Form */}
                            <FadeIn direction="left">
                                <div className="rounded-2xl border bg-card p-8">
                                    <h2 className="text-2xl font-bold text-foreground mb-6">
                                        {locale === 'es' ? 'Envíanos un mensaje' : locale === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                                    </h2>
                                    <form className="space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">{t('form.name')}</Label>
                                                <Input id="name" placeholder={t('form.name')} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">{t('form.email')}</Label>
                                                <Input id="email" type="email" placeholder={t('form.email')} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t('form.phone')}</Label>
                                            <Input id="phone" type="tel" placeholder={t('form.phone')} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">{t('form.subject')}</Label>
                                            <Input id="subject" placeholder={t('form.subject')} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">{t('form.message')}</Label>
                                            <Textarea id="message" placeholder={t('form.message')} rows={5} />
                                        </div>
                                        <Button type="submit" className="w-full">
                                            {t('form.submit')}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </FadeIn>

                            {/* Info */}
                            <FadeIn direction="right">
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-4">
                                            {locale === 'es' ? 'Información de contacto' : locale === 'fr' ? 'Informations de contact' : 'Contact information'}
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <Phone className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">+57 1 800 0000</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {locale === 'es' ? 'Lunes a Viernes, 8am - 5pm' : locale === 'fr' ? 'Lundi à Vendredi, 8h - 17h' : 'Monday to Friday, 8am - 5pm'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <Mail className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">info@nu3.co</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {locale === 'es' ? 'Respuesta en 24 horas' : locale === 'fr' ? 'Réponse sous 24 heures' : 'Response within 24 hours'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Cards */}
                                    <div className="space-y-4">
                                        <div className="rounded-xl border bg-primary/5 p-6">
                                            <Heart className="h-8 w-8 text-primary mb-3" />
                                            <h3 className="font-semibold text-foreground">
                                                {locale === 'es' ? '¿Quieres donar?' : locale === 'fr' ? 'Vous voulez faire un don?' : 'Want to donate?'}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {locale === 'es' ? 'Tu aporte transforma vidas.' : locale === 'fr' ? 'Votre contribution transforme des vies.' : 'Your contribution transforms lives.'}
                                            </p>
                                            <Button asChild size="sm" className="mt-4">
                                                <Link href="/dona">
                                                    {locale === 'es' ? 'Donar ahora' : locale === 'fr' ? 'Faire un don' : 'Donate now'}
                                                </Link>
                                            </Button>
                                        </div>

                                        <div className="rounded-xl border bg-secondary/5 p-6">
                                            <Users className="h-8 w-8 text-secondary mb-3" />
                                            <h3 className="font-semibold text-foreground">
                                                {locale === 'es' ? '¿Eres empresa?' : locale === 'fr' ? 'Vous êtes une entreprise?' : 'Are you a company?'}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {locale === 'es' ? 'Conoce nuestras alianzas corporativas.' : locale === 'fr' ? 'Découvrez nos partenariats.' : 'Learn about our corporate partnerships.'}
                                            </p>
                                            <Button asChild size="sm" variant="secondary" className="mt-4">
                                                <Link href="/empresas">
                                                    {locale === 'es' ? 'Ver más' : locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
