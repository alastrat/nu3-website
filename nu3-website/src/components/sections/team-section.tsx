import { useTranslations } from 'next-intl';
import { TeamCard } from '@/components/ui/team-card';
import { Users } from 'lucide-react';
import { Link } from '@/i18n/routing';

const DEMO_TEAM = [
    {
        id: '1',
        slug: 'maria-gonzalez',
        image: '/images/member-1.jpg',
        socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            instagram: '#',
        },
    },
    {
        id: '2',
        slug: 'carlos-rodriguez',
        image: '/images/member-2.jpg',
        socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            instagram: '#',
        },
    },
    {
        id: '3',
        slug: 'ana-martinez',
        image: '/images/member-3.jpg',
        socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            instagram: '#',
        },
    },
    {
        id: '4',
        slug: 'juan-lopez',
        image: '/images/member-4.jpg',
        socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            instagram: '#',
        },
    },
];

export function TeamSection() {
    const t = useTranslations();

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                    <div className="flex-1">
                        <span className="inline-block px-4 py-2 bg-nu3-green/10 text-nu3-green rounded-full text-sm font-semibold mb-4">
                            {t('team.section.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {t('team.section.title')}
                        </h2>
                    </div>

                    <Link
                        href="/equipo"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-nu3-orange text-white rounded-full font-semibold hover:bg-nu3-orange-dark transition-colors group"
                    >
                        <Users className="w-4 h-4" />
                        {t('team.section.joinUs')}
                    </Link>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEMO_TEAM.map((member) => (
                        <TeamCard
                            key={member.id}
                            slug={member.slug}
                            name={t(`team.members.${member.slug}.name`)}
                            role={t(`team.members.${member.slug}.role`)}
                            image={member.image}
                            socials={member.socials}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
