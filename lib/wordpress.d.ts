interface WPEntity {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: 'publish' | 'draft' | 'pending' | 'private';
    link: string;
}

interface RenderedTitle {
    rendered: string;
}

interface RenderedContent {
    rendered: string;
    protected: boolean;
}

interface Taxonomy {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    meta: Record<string, unknown>;
}

interface Post extends WPEntity {
    title: RenderedTitle;
    content: RenderedContent;
    excerpt: RenderedContent;
    author: number;
    featured_media: number;
    comment_status: 'open' | 'closed';
    ping_status: 'open' | 'closed';
    sticky: boolean;
    template: string;
    format:
        | 'standard'
        | 'aside'
        | 'chat'
        | 'gallery'
        | 'link'
        | 'image'
        | 'quote'
        | 'status'
        | 'video'
        | 'audio';
    categories: number[];
    tags: number[];
    meta: Record<string, unknown>;
}

interface Category extends Taxonomy {
    taxonomy: 'category';
    parent: number;
}

interface Tag extends Taxonomy {
    taxonomy: 'post_tag';
}

interface Author {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: Record<string, string>;
    meta: Record<string, unknown>;
}

export { Post, Category, Tag, Author };
