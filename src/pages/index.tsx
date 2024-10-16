import { SearchForm } from "@/components/form/SearchForm";
import { GitHub } from "@/components/svgs/General";
import Image from "next/image";
import asset from "/public/assets/aku-image.svg";
import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "@/context/AppContext";
import { useSearchGitHub } from "@/hooks/api/useSearchGitHub";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/Empty/Empty";
import { useRouter } from "next/router";
import { List } from "@/components/List";
import { ActionEnum } from "@/types";

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, searchType } = state;

  const { data, isLoading, isError } = useSearchGitHub({
    query,
    searchType,
  });

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionEnum.SetSearchType,
      payload: e.target.value as "users" | "organizations",
    });

    router.push(
      {
        pathname: "/",
        query: {
          query,
          searchType: e.target.value as "users" | "organizations",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const queryValue = formData.get("query") as string;
    const searchValue = formData.get("searchType") as "users" | "organizations";
    dispatch({ type: ActionEnum.SetQuery, payload: queryValue });
    dispatch({ type: ActionEnum.SetSearchType, payload: searchValue });
    router.push(
      {
        pathname: "/",
        query: { query: queryValue, searchType },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (router.query.query) {
      dispatch({
        type: ActionEnum.SetQuery,
        payload: router.query.query as string,
      });
      dispatch({
        type: ActionEnum.SetSearchType,
        payload: router.query.searchType as "users" | "organizations",
      });
    }
  }, [router.query]);

  return (
    <div className="web-container pb-4">
      <div className="sticky top-0 z-10 bg-white pt-10 768:pt-16">
        <div className="flex items-baseline gap-2">
          <Image
            src={asset}
            alt="main_logo"
            width={80}
            priority
            className="object-contain h-auto"
          />
          <GitHub className="w-5 h-5" />
        </div>
        <SearchForm
          searchType={searchType}
          onChange={handleSearchTypeChange}
          onSubmit={handleSubmit}
        />
      </div>
      {isError ? (
        <Empty isError={isError} />
      ) : isLoading ? (
        <Loader />
      ) : data?.length === 0 || data === undefined ? (
        <Empty type={searchType} search={query} />
      ) : (
        data?.map((user) => {
          return <List key={user.id} user={user} />;
        })
      )}
    </div>
  );
}
