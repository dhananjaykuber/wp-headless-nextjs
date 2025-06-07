// Next.js dependencies
import Image from 'next/image';
import Link from 'next/link';

// Internal dependencies
import { Article, Container, Section } from '@/components/layouts';
import {
    getAllPosts,
    getAuthorById,
    getCategoryById,
    getFeaturedImageById,
    getPostBySlug,
} from '@/lib/wordpress';

// External dependencies
import Balancer from 'react-wrap-balancer';

export const generateStaticParams = async () => {
    // Fetch all posts to generate static paths
    const posts = await getAllPosts({});

    return posts.map((post) => ({
        slug: post.slug,
    }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const post = await getPostBySlug(slug);
    const featuredImage = post?.featured_media
        ? await getFeaturedImageById(post.featured_media)
        : null;
    const author = await getAuthorById(post?.author);
    const date = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const category = await getCategoryById(post.categories[0]);

    return (
        <Section>
            <Container>
                <div className='space-y-6 mb-10'>
                    <Balancer>
                        <h1
                            dangerouslySetInnerHTML={{
                                __html: post.title?.rendered,
                            }}
                        ></h1>
                    </Balancer>
                    <div className='flex items-center justify-between'>
                        <h5>
                            Published {date} by{' '}
                            {author.name && (
                                <span>
                                    <Link
                                        href={`/?author=${author.id}`}
                                        className='underline'
                                    >
                                        {author.name}
                                    </Link>
                                </span>
                            )}
                        </h5>

                        <Link
                            href={`/?category=${category.id}`}
                            className='border rounded-full text-xs px-2 py-0.5 font-semibold'
                        >
                            {category?.name}
                        </Link>
                    </div>

                    {featuredImage?.source_url && (
                        <div className='h-96 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/30'>
                            <Image
                                className='w-full h-full object-cover'
                                src={featuredImage.source_url}
                                alt={featuredImage.alt_text || 'Featured Image'}
                                width={800}
                                height={400}
                                loading='lazy'
                                decoding='async'
                            />
                        </div>
                    )}
                </div>

                <Article
                    dangerouslySetInnerHTML={{
                        __html:
                            post.content?.rendered || 'No content available',
                    }}
                />
            </Container>
        </Section>
    );
};

export default Page;
