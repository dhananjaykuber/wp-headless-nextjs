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

export { Post };
