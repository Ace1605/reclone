import { SearchForm } from "@/components/form/SearchForm";
import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "@/context/AppContext";
import { useSearchGitHub } from "@/hooks/api/useSearchGitHub";
import { Loader } from "@/components/modules/Loader";
import { Empty } from "@/components/Empty/Empty";
import { useRouter } from "next/router";
import { List } from "@/components/modules/List";
import { ActionEnum, SearchType } from "@/types";
import { Header } from "@/components/modules/Header";

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, searchType } = state;
  const { data, isLoading, isError } = useSearchGitHub({
    query,
    searchType,
  });

  // Sync the URL query parameters with the local state on component mount or url update
  useEffect(() => {
    if (router.query.query) {
      dispatch({
        type: ActionEnum.SetQuery,
        payload: router.query.query as string,
      });
      dispatch({
        type: ActionEnum.SetSearchType,
        payload: router.query.searchType as SearchType,
      });
    }
  }, [router.query]);

  return (
    <div className="web-container pb-4">
      <div className="sticky top-0 z-10 bg-white pt-10 768:pt-16">
        <Header />
        <SearchForm />
      </div>
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
