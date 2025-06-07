'use client';

// Next.js dependencies
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// External dependencies
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ value }: { value?: string }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Handle search input with debouncing
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Input
            type='text'
            name='search'
            placeholder='Search posts...'
            defaultValue={value}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
};

export default Search;
