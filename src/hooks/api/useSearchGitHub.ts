import { SearchResult, SearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';


interface UseSearchGitHubParams {
  query: string;
  searchType: SearchType;
}

export const useSearchGitHub = ({ query, searchType }: UseSearchGitHubParams) => {
  const fetchSearchResults = async () => {
    try {
      // Determine the search type for the API query (either user or organization)
      const type = searchType === 'organizations' ? 'org' : 'user';

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?q=${query}+type:${type}`);

      if (response?.status !== 200) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();

      return data.items;

    } catch (error) {

      throw new Error(`Something went wrong while fetching search results. ${error}`);
    }
  };

  // Use React Query's useQuery hook to fetch search results based on the query and search type
  return useQuery<SearchResult[]>({
    queryKey: ['search', query, searchType],
    queryFn: fetchSearchResults,
    enabled: !!query, // Only fetch if there's a query
  });
};
