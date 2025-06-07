import Link from 'next/link';
import { Container, Section } from '@/components/layouts';
import { Button } from '@/components/ui/button';

const NotFound = () => {
    return (
        <Section>
            <Container>
                <div className='flex flex-col items-center justify-center min-h-[55vh] text-center'>
                    <h1 className='mb-4'>404 - Page Not Found</h1>
                    <p className='mb-8'>
                        Oops! The page you are looking for does not exist or has
                        been moved.
                    </p>
                    <Button asChild className='mt-6'>
                        <Link href='/'>Go back to Home</Link>
                    </Button>
                </div>
            </Container>
        </Section>
    );
};

export default NotFound;
