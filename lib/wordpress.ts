// External dependencies
import querystring from 'query-string';

// Internal dependencies
import { WPAPIError } from './error';
import { Post } from './wordpress.d';

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

export { getAllPosts };
