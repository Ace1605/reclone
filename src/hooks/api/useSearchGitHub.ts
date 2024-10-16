import { SearchResult } from '@/types';
import { useQuery } from '@tanstack/react-query';


interface UseSearchGitHubParams {
  query: string;
  searchType: 'users' | 'organizations';
}

export const useSearchGitHub = ({ query, searchType }: UseSearchGitHubParams) => {
  const fetchSearchResults = async () => {
    try {
      // Determine the search type for the API query (either user or organization)
      const type = searchType === 'organizations' ? 'org' : 'user';

      // Make the API call to fetch the search results
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?q=${query}+type:${type}`);

      // Throw an error if the response is not successful
      if (response?.status !== 200) {
        throw new Error('Failed to fetch search results');
      }

      // Parse the response data into JSON
      const data = await response.json();

      // Return the list of items from the search result
      return data.items;

    } catch (error) {
      // Log and throw the error to be handled by the consumer of this hook
      console.error('Error fetching search results:', error);
      throw new Error('Something went wrong while fetching search results.');
    }
  };

  // Use React Query's useQuery hook to fetch search results based on the query and search type
  return useQuery<SearchResult[]>({
    queryKey: ['search', query, searchType],
    queryFn: fetchSearchResults,
    enabled: !!query, // Only fetch if there's a query
  });
};
