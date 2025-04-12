/**
 * Search Filters Component
 *
 * This component provides filters for search results.
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Props for the SearchFilters component
 */
interface SearchFiltersProps {
  className?: string;
}

/**
 * Document type option
 */
interface TypeOption {
  value: string;
  label: string;
}

/**
 * Document type options
 */
const TYPE_OPTIONS: TypeOption[] = [
  { value: 'scientific', label: 'Scientific Documents' },
  { value: 'perplexity', label: 'Perplexity Responses' },
  { value: 'lectionary', label: 'Lectionary Content' },
  { value: 'post', label: 'Blog Posts' },
];

/**
 * Search filters component
 *
 * @param props Component props
 * @returns React component
 */
export function SearchFilters({ className = '' }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const types = searchParams?.getAll('type') || [];
    setSelectedTypes(types);
  }, [searchParams]);

  /**
   * Update filters in URL
   *
   * @param types Selected document types
   */
  const updateFilters = (types: string[]) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    // Remove existing type params
    params.delete('type');

    // Add selected types
    types.forEach(type => {
      params.append('type', type);
    });

    // Preserve search query
    const query = params.get('q');
    if (!query) {
      params.delete('q');
    }

    // Navigate to search page with updated filters
    router.push(`/search?${params.toString()}`);
  };

  /**
   * Toggle document type filter
   *
   * @param type Document type
   */
  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newTypes);
    updateFilters(newTypes);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium">Document Types</h3>

      <div className="space-y-2">
        {TYPE_OPTIONS.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={selectedTypes.includes(option.value)}
              onChange={() => toggleType(option.value)}
            />
            <span className="ml-2 text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
