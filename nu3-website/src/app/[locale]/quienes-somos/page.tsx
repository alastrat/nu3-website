import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Heart, Target, Eye, Award, Users, MapPin } from 'lucide-react';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    const titles: Record<string, string> = {
        es: 'Quiénes somos - Fundación nu3',
        en: 'About us - nu3 Foundation',
        fr: 'Qui sommes-nous - Fondation nu3',
    };

    return {
        title: titles[locale] || titles.es,
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'about' });

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

                {/* Mission & Vision */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 md:grid-cols-2">
                            <FadeIn direction="left">
                                <div className="rounded-2xl border bg-card p-8">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {t('mission')}
                                    </h2>
                                    <p className="mt-4 text-muted-foreground">
                                        {t('missionText')}
                                    </p>
                                </div>
                            </FadeIn>

                            <FadeIn direction="right">
                                <div className="rounded-2xl border bg-card p-8">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                                        <Eye className="h-6 w-6 text-secondary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {t('vision')}
                                    </h2>
                                    <p className="mt-4 text-muted-foreground">
                                        {t('visionText')}
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="bg-muted/30 py-20">
                    <div className="container mx-auto px-4">
                        <FadeIn className="mx-auto max-w-2xl text-center">
                            <h2 className="font-display text-3xl font-bold text-foreground">
                                {locale === 'es' ? 'Nuestros valores' : locale === 'fr' ? 'Nos valeurs' : 'Our values'}
                            </h2>
                        </FadeIn>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: Heart, title: locale === 'es' ? 'Compromiso' : locale === 'fr' ? 'Engagement' : 'Commitment' },
                                { icon: Users, title: locale === 'es' ? 'Solidaridad' : locale === 'fr' ? 'Solidarité' : 'Solidarity' },
                                { icon: Award, title: locale === 'es' ? 'Transparencia' : locale === 'fr' ? 'Transparence' : 'Transparency' },
                                { icon: MapPin, title: locale === 'es' ? 'Impacto local' : locale === 'fr' ? 'Impact local' : 'Local impact' },
                            ].map((value, index) => (
                                <FadeIn key={value.title} delay={index * 0.1}>
                                    <div className="rounded-xl border bg-card p-6 text-center">
                                        <value.icon className="mx-auto h-8 w-8 text-primary" />
                                        <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
