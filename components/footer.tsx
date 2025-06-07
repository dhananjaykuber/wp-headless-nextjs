import { siteConfig } from '@/site.config';

const Footer = () => {
    return (
        <footer className='py-8 px-6 sm:px-8 flex items-center justify-center border-t text-xs'>
            <p>{siteConfig.site_name}</p>
        </footer>
    );
};

export default Footer;
