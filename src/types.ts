export interface SearchFormProps {
  searchType: 'users' | 'organizations';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface Result {
  id: number;
  login: string;
  avatar_url: string;
}

export interface State {
  query: string;
  searchType: 'users' | 'organizations';
  results: Result[];
  loading: boolean;
  error: Error | null;
}

export type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SEARCH_TYPE'; payload: 'users' | 'organizations' }
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: Result[] }
  | { type: 'SEARCH_FAILURE'; payload: Error };