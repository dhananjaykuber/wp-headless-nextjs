// Internal dependencies
import {
    articleTypographyStyles,
    baseTypographyStyles,
    styles,
} from '@/lib/styles';

// External dependencies
import { cn } from '@/lib/utils';

interface LayoutProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
}

interface HTMLProps {
    dangerouslySetInnerHTML?: { __html: string };
}

const Layout = ({ children, className, id }: LayoutProps) => {
    return (
        <div className={cn(baseTypographyStyles, className)} id={id}>
            {children}
        </div>
    );
};

const Main = ({ children, className, id }: LayoutProps) => {
    return (
        <main className={className} id={id}>
            {children}
        </main>
    );
};

const Section = ({ children, className, id }: LayoutProps) => {
    return (
        <section className={cn(styles.layout.section, className)} id={id}>
            {children}
        </section>
    );
};

const Container = ({ children, className, id }: LayoutProps) => {
    return (
        <div className={cn(styles.layout.container, className)} id={id}>
            {children}
        </div>
    );
};

const Article = ({
    children,
    className,
    id,
    dangerouslySetInnerHTML,
}: LayoutProps & HTMLProps) => {
    return (
        <article
            className={cn(
                articleTypographyStyles,
                styles.layout.spacing,
                styles.layout.article,
                className
            )}
            id={id}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
            {children}
        </article>
    );
};

export { Layout, Main, Section, Container, Article };
