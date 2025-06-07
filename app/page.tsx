// Internal dependencies
import {
    getAllAuthors,
    getAllCategories,
    getAllPosts,
    getAllTags,
} from '@/lib/wordpress';
import Filter from '@/components/posts/filter';
import PostCard from '@/components/posts/post-card';
import { Container, Section } from '@/components/layouts';

// External dependencies
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import Search from '@/components/posts/search';

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        author?: string;
        category?: string;
        tag?: string;
        search?: string;
        page?: string;
    }>;
}) => {
    const params = await searchParams;
    const { author, category, tag, search, page: pageParam } = params;

    const [posts, categories, tags, authors] = await Promise.all([
        getAllPosts({ author, category, tag, search }),
        getAllCategories(),
        getAllTags(),
        getAllAuthors(),
    ]);

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const postsPerPage = 9;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice(
        (page - 1) * postsPerPage,
        page * postsPerPage
    );

    // Create pagination links
    const createPaginationLink = (page: number) => {
        const params = new URLSearchParams();
        if (page > 1) {
            params.set('page', page.toString());
        }
        if (category) {
            params.set('category', category);
        }
        if (tag) {
            params.set('tag', tag);
        }
        if (author) {
            params.set('author', author);
        }

        return `/${params.toString() ? `?${params.toString()}` : ''}`;
    };

    return (
        <Section>
            <Container>
                <div className='space-y-8'>
                    <div>
                        <h1>All Posts</h1>
                        <p className='my-6 text-gray-500'>
                            {posts?.length}{' '}
                            {posts.length === 1 ? 'post' : 'posts'} found
                            {search && ` for "${search}"`}
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <Search value={search} />
                        <Filter
                            categories={categories}
                            tags={tags}
                            authors={authors}
                            selectedCategory={category}
                            selectedTag={tag}
                            selectedAuthor={author}
                        />
                    </div>

                    {paginatedPosts?.length && (
                        <div className='grid md:grid-cols-3 gap-4'>
                            {paginatedPosts.map((post) => (
                                <PostCard post={post} key={post.id} />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem className='before:content-none  mb-0'>
                                    <PaginationPrevious
                                        className={
                                            page <= 1
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        }
                                        href={createPaginationLink(page - 1)}
                                    ></PaginationPrevious>
                                </PaginationItem>
                                <PaginationItem className='before:content-none mb-0'>
                                    <PaginationLink>{page}</PaginationLink>
                                </PaginationItem>
                                <PaginationItem className='before:content-none mb-0'>
                                    <PaginationNext
                                        className={
                                            page >= totalPages
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        }
                                        href={createPaginationLink(page + 1)}
                                    ></PaginationNext>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </Container>
        </Section>
    );
};

export default Page;
