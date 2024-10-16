import { SearchResult } from '@/types';
import { useQuery } from '@tanstack/react-query';


interface UseSearchGitHubParams {
  query: string;
  searchType: 'users' | 'organizations';
}

export const useSearchGitHub = ({ query, searchType }: UseSearchGitHubParams) => {
  const fetchSearchResults = async () => {
    const type = searchType === 'organizations' ? 'org' : 'user';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?q=${query}+type:${type}`);
    if (response?.status !== 200) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data.items;
  };

return useQuery<SearchResult[]>({
  queryKey: ['search', query, searchType],
  queryFn: fetchSearchResults,
  enabled: !!query,
});
};
