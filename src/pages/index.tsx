import { SearchForm } from "@/components/form/SearchForm";
import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "@/context/AppContext";
import { useSearchGitHub } from "@/hooks/api/useSearchGitHub";
import { Loader } from "@/components/modules/Loader";
import { Empty } from "@/components/Empty/Empty";
import { useRouter } from "next/router";
import { List } from "@/components/modules/List";
import { ActionEnum } from "@/types";
import { Header } from "@/components/modules/Header";

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, searchType } = state;
  const { data, isLoading, isError } = useSearchGitHub({
    query,
    searchType,
  });

  // Sync the URL query parameters with the local state on component mount or when the URL changes
  useEffect(() => {
    if (router.query.query) {
      dispatch({
        type: ActionEnum.SetQuery, // Dispatch action to update the query in the state
        payload: router.query.query as string, // Set query from the URL query string
      });
      dispatch({
        type: ActionEnum.SetSearchType, // Dispatch action to update the search type in the state
        payload: router.query.searchType as "users" | "organizations", // Set search type from the URL query string
      });
    }
  }, [router.query]);

  return (
    <div className="web-container pb-4">
      <div className="sticky top-0 z-10 bg-white pt-10 768:pt-16">
        <Header />
        <SearchForm />
      </div>
      {/* Conditional rendering for API states: error, loading, empty, or results */}
      {isError ? (
        <Empty isError={isError} />
      ) : isLoading ? (
        <Loader />
      ) : data?.length === 0 || data === undefined ? (
        <Empty />
      ) : (
        data?.map((user) => {
          return <List key={user.id} user={user} />;
        })
      )}
    </div>
  );
}
