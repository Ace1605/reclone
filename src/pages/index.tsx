import { SearchForm } from "@/components/form/SearchForm";
import { GitHub } from "@/components/svgs/General";
import clsx from "clsx";
import Image from "next/image";
import asset from "/public/assets/aku-image.svg";
import { useReducer } from "react";
import { initialState, reducer } from "@/context/AppContext";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, searchType, results, loading, error } = state;
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_SEARCH_TYPE",
      payload: e.target.value as "users" | "organizations",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const queryValue = formData.get("query") as string;
    dispatch({ type: "SET_QUERY", payload: queryValue });
    dispatch({ type: "SEARCH_START" });
  };

  return (
    <div className="web-container pt-20 768:pt-32">
      <div className="flex items-baseline gap-2">
        <Image
          src={asset}
          alt="main_logo"
          width={80}
          height={80}
          priority
          className="object-contain"
        />
        <GitHub className="w-5 h-5" />
      </div>
      <SearchForm
        searchType={searchType}
        onChange={handleSearchTypeChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
