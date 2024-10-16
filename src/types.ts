export type SearchType = 'users' | 'organizations'

export interface SearchFormProps {
  searchType: SearchType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface SearchResult {
  id: number;
  login: string;
  avatar_url: string;
  repos_url: string;
}


export interface State {
  query: string;
  searchType: SearchType;
}

export enum ActionEnum {
SetQuery = 'SET_QUERY',
SetSearchType = 'SET_SEARCH_TYPE',
SearchStart = 'SEARCH_START',
SearchSuccess = 'SEARCH_SUCCESS',
SearchFailure = 'SEARCH_FAILURE'
}


export type Action =
  | { type: ActionEnum.SetQuery; payload: string }
  | { type: ActionEnum.SetSearchType; payload: SearchType }
  | { type: ActionEnum.SearchStart }
  | { type: ActionEnum.SearchSuccess; payload: SearchResult[] }
  | { type: ActionEnum.SearchFailure; payload: Error };