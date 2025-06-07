// Next.js dependencies
import Image from 'next/image';
import Link from 'next/link';

// Internal dependencies
import { Post } from '@/lib/wordpress.d';
import { getCategoryById, getFeaturedImageById } from '@/lib/wordpress';

const PostCard = async ({ post }: { post: Post }) => {
    const featuredImage = post.featured_media
        ? await getFeaturedImageById(post.featured_media)
        : null;
    const category = post.categories?.[0]
        ? await getCategoryById(post.categories[0])
        : null;
    const date = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            href={`/${post.slug}`}
            className={
                'border rounded-lg p-4 group flex justify-between flex-col gap-8 hover:bg-accent/50 transition-all'
            }
        >
            <div className='flex flex-col gap-4'>
                <div className='h-48 w-full relative overflow-hidden rounded-md border bg-muted flex items-center justify-center'>
                    {featuredImage?.source_url ? (
                        <Image
                            className='w-full h-full object-cover group-hover:scale-105 transition-all'
                            loading='lazy'
                            decoding='async'
                            src={featuredImage.source_url}
                            alt={featuredImage.alt_text || post.title.rendered}
                            width={400}
                            height={200}
                        />
                    ) : (
                        <div className='flex items-center justify-center w-full h-full text-muted-foreground text-sm'>
                            No Image Available
                        </div>
                    )}
                </div>

                <h4
                    dangerouslySetInnerHTML={{
                        __html: post.title?.rendered || 'Untitled Post',
                    }}
                    className='group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all'
                ></h4>
                <div
                    dangerouslySetInnerHTML={{
                        __html: post.excerpt?.rendered
                            ? post.excerpt.rendered
                                  .split(' ')
                                  .slice(0, 12)
                                  .join(' ')
                                  .trim() + '...'
                            : 'No excerpt available',
                    }}
                    className='text-sm'
                ></div>
            </div>

            <div className='flex justify-between items-center text-xs border-t-1 pt-4'>
                <span>{category?.name || 'Uncategorized'}</span>
                <span>{date}</span>
            </div>
        </Link>
    );
};

export default PostCard;
