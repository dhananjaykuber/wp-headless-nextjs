'use client';

// Next.js dependencies
import { useRouter } from 'next/navigation';

// External dependencies
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Author {
    id: number;
    name: string;
}

interface FilterProps {
    categories: Category[];
    tags: Tag[];
    authors: Author[];
    selectedCategory?: string;
    selectedTag?: string;
    selectedAuthor?: string;
}

const Filter = ({
    categories,
    tags,
    authors,
    selectedCategory,
    selectedTag,
    selectedAuthor,
}: FilterProps) => {
    const router = useRouter();

    // Handle filter change
    const handleFilterChange = (type: string, value: string) => {
        const param = new URLSearchParams(window.location.search);
        param.delete('page'); // Clear page param on filter change

        if (value === 'all') {
            param.delete(type);
        } else {
            param.set(type, value);
        }

        router.push(`/?${param.toString()}`);
    };

    // Handle clear filter
    const handleClearFilter = () => {
        router.push('/');
    };

    const hasTags = tags.length > 0;
    const hasCategories = categories.length > 0;
    const hasAuthors = authors.length > 0;

    return (
        <div className='grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-2'>
            <Select
                value={selectedCategory || 'all'}
                onValueChange={(value) => handleFilterChange('category', value)}
            >
                <SelectTrigger className='w-full'>
                    {hasCategories ? (
                        <SelectValue placeholder='All Categories' />
                    ) : (
                        'No Categories Available'
                    )}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={selectedTag || 'all'}
                onValueChange={(value) => handleFilterChange('tag', value)}
            >
                <SelectTrigger className='w-full'>
                    {hasTags ? (
                        <SelectValue placeholder='All Tags' />
                    ) : (
                        'No Tags Available'
                    )}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All Tags</SelectItem>
                    {tags.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id.toString()}>
                            {tag.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={selectedAuthor || 'all'}
                onValueChange={(value) => handleFilterChange('author', value)}
            >
                <SelectTrigger className='w-full'>
                    {hasAuthors ? (
                        <SelectValue placeholder='All Authors' />
                    ) : (
                        'No Authors Available'
                    )}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All Authors</SelectItem>
                    {authors.map((author) => (
                        <SelectItem
                            key={author.id}
                            value={author.id.toString()}
                        >
                            {author.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button variant='outline' onClick={handleClearFilter}>
                Clear Filter
            </Button>
        </div>
    );
};

export default Filter;
