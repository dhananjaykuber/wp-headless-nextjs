// External dependencies
import querystring from 'query-string';

// Internal dependencies
import { WPAPIError } from './error';
import { Author, Category, FeaturedImage, Post, Tag } from './wordpress.d';

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;

if (!baseUrl) {
    throw new Error('WORDPRESS_API_URL environment variable is not set');
}

// Interact with the WordPress REST API
const wpFetch = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new WPAPIError(
            `WP API request failed: ${response.statusText}`,
            response.status,
            url
        );
    }

    return response.json();
};

// Construct the full URL for the WordPress API
const getUrl = (path: string, query?: Record<string, any>) => {
    const params = query ? querystring.stringify(query) : null;
    return `${baseUrl}${path}${params ? `?${params}` : ''}`;
};

const getAllPosts = async (filter: {
    author?: string;
    category?: string;
    tag?: string;
    search?: string;
}) => {
    const query: Record<string, any> = {
        _embed: true,
        per_page: 100,
    };

    if (filter?.search) {
        query.search = filter.search;
    }

    if (filter?.author) {
        query.author = filter.author;
    }

    if (filter?.category) {
        query.categories = filter.category;
    }

    if (filter?.tag) {
        query.tags = filter.tag;
    }

    const url = getUrl('/wp-json/wp/v2/posts', query);
    return wpFetch<Post[]>(url);
};

// Get a single post by ID
const getPostById = async (id: string) => {
    const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
    return wpFetch<Post>(url);
};

// Get all categories
const getAllCategories = async () => {
    const url = getUrl('/wp-json/wp/v2/categories');
    return wpFetch<Category[]>(url);
};

// Get category by ID
const getCategoryById = async (id: number) => {
    const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
    return wpFetch<Category>(url);
};

// Get all tags
const getAllTags = async () => {
    const url = getUrl('/wp-json/wp/v2/tags');
    return wpFetch<Tag[]>(url);
};

// Get tag by ID
const getTagById = async (id: number) => {
    const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
    return wpFetch<Tag>(url);
};

// Get all authors
const getAllAuthors = async () => {
    const url = getUrl('/wp-json/wp/v2/users');
    return wpFetch<Author[]>(url);
};

// Get author by ID
const getAuthorById = async (id: string) => {
    const url = getUrl(`/wp-json/wp/v2/users/${id}`);
    return wpFetch<Author>(url);
};

// Get featured image by ID
const getFeaturedImageById = async (id: number) => {
    const url = getUrl(`/wp-json/wp/v2/media/${id}`);
    return wpFetch<FeaturedImage>(url);
};

export {
    getAllPosts,
    getPostById,
    getAllCategories,
    getCategoryById,
    getAllTags,
    getTagById,
    getAllAuthors,
    getAuthorById,
    getFeaturedImageById,
};
