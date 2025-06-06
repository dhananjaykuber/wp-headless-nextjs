// Internal dependencies
import { getAllPosts } from '@/lib/wordpress';

// External dependencies
import { Input } from '@/components/ui/input';

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        author?: string;
        category?: string;
        tag?: string;
        search?: string;
    }>;
}) => {
    const params = await searchParams;
    const { author, category, tag, search } = params;

    const posts = await getAllPosts({ author, category, tag, search });

    return (
        <section className='py-8 md:py-12'>
            <div className='max-w-5xl mx-auto sm:p-8'>
                <h1 className='text-3xl font-medium'>All Posts</h1>
                <p className='my-6 text-gray-500'>
                    {posts?.length} posts found
                </p>

                <div>
                    <Input
                        type='search'
                        name='search'
                        placeholder='Search posts...'
                        defaultValue={search || ''}
                        className='px-4 py-5'
                    />
                </div>
            </div>
        </section>
    );
};

export default Page;
