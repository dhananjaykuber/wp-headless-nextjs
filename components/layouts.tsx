// External dependencies
import { cn } from '@/lib/utils';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Main = ({ children, className, id }: LayoutProps) => {
    return (
        <main className={className} id={id}>
            {children}
        </main>
    );
};

const Section = ({ children, className, id }: LayoutProps) => {
    return (
        <section className={cn('py-8 md:py-12', className)} id={id}>
            {children}
        </section>
    );
};

const Container = ({ children, className, id }: LayoutProps) => {
    return (
        <div className={cn('max-w-5xl mx-auto sm:p-8', className)} id={id}>
            {children}
        </div>
    );
};

export { Main, Section, Container };
