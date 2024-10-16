import { Action, State } from "@/types";

export const initialState: State = {
  query: "",
  searchType: "users",
  results: [],
  loading: false,
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };
    case "SEARCH_START":
      return { ...state, loading: true, error: null };
    case "SEARCH_SUCCESS":
      return { ...state, loading: false, results: action.payload };
    case "SEARCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
