// Next.js dependencies
import Link from 'next/link';
import Image from 'next/image';

// External dependencies
import { cn } from '@/lib/utils';

// Internal dependencies
import Logo from '@/public/site-logo.svg';
import { siteConfig } from '@/site.config';
import { menuConfig } from '@/menu.config';
import { Button } from './ui/button';

const Navbar = () => {
    return (
        <nav className={cn('sticky top-0 z-50 bg-background border-b')}>
            <div className='max-w-5xl mx-auto py-4 px-6 sm:px-8 flex items-center justify-between'>
                <Link
                    href='/'
                    className='hover:opacity-75 transition-all flex gap-4 items-center'
                >
                    <Image
                        src={Logo}
                        alt='Site Logo'
                        loading='eager'
                        className='dark:invert'
                        width={38}
                        height={38}
                    />
                    <h2 className='text-sm font-medium'>
                        {siteConfig.site_name}
                    </h2>
                </Link>

                <div>
                    {Object.entries(menuConfig).map(([key, href]) => (
                        <Button key={href} asChild variant='ghost' size='sm'>
                            <Link href={href}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
