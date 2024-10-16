import { ActionEnum, SearchType } from "@/types";
import React, { useEffect, useReducer, useState } from "react";
import { radioInputs } from "./constants";
import { initialState, reducer } from "@/context/AppContext";
import { useRouter } from "next/router";

export const SearchForm: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState<string>("");
  const { searchType } = state;

  // Handle changes to the search type (users/organizations)
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionEnum.SetSearchType,
      payload: e.target.value as SearchType,
    });

    router.push(
      {
        pathname: "/",
        query: {
          query,
          searchType: e.target.value as SearchType,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ActionEnum.SetQuery, payload: query });

    router.push(
      {
        pathname: "/",
        query: { query, searchType },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (router.query.query) {
      setQuery(router.query.query as string);
    }
  }, [router.query]);

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <div className="mb-4 flex flex-col 768:flex-row items-center gap-4">
        <input
          type="text"
          name="query"
          placeholder="Search GitHub"
          className="w-full border focus:border-none focus:ring-primary-main focus:outline-none border-neutral-200 p-2 bg-neutral-50 text-black rounded-[10px] h-[48px] ring-0.5 px-5"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary-main text-white py-2 px-6 w-full 768:w-auto font-medium rounded-[10px] h-[48px]"
        >
          Search
        </button>
      </div>
      <div className="mb-4 flex items-center gap-4">
        {radioInputs?.map((radio) => {
          return (
            <label
              key={radio.value}
              className="text-black flex items-center gap-2"
            >
              <input
                type="radio"
                name="searchType"
                value={radio.value}
                checked={searchType === radio.value}
                onChange={handleSearchTypeChange}
                className="text-primary-main focus:ring-primary-main"
              />
              {radio.label}
            </label>
          );
        })}
      </div>
    </form>
  );
};
