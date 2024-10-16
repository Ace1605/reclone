import { Action, ActionEnum, State } from "@/types";

export const initialState: State = {
  query: "",
  searchType: "users",
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionEnum.SetQuery:
      return { ...state, query: action.payload };
    case ActionEnum.SetSearchType:
      return { ...state, searchType: action.payload };
    default:
      return state;
  }
}
