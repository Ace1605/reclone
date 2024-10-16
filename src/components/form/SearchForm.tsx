import { SearchFormProps } from "@/types";
import React from "react";

export const SearchForm: React.FC<SearchFormProps> = ({
  searchType,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="py-4">
      <div className="mb-4 flex flex-col 640:flex-row items-center gap-4">
        <input
          type="text"
          name="query"
          placeholder="Search GitHub"
          className="w-full border focus:border-none focus:ring-primary-main focus:outline-none border-neutral-200 p-2 bg-neutral-50 text-black rounded-[10px] h-[48px] ring-0.5 px-5"
          required
        />
        <button
          type="submit"
          className="bg-primary-main text-white py-2 px-6 w-full 640:w-auto font-medium rounded-[10px] h-[48px]"
        >
          Search
        </button>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label className="text-black flex items-center gap-2">
          <input
            type="radio"
            name="searchType"
            value="users"
            checked={searchType === "users"}
            onChange={onChange}
            className="text-primary-main focus:ring-primary-main"
          />
          Users
        </label>
        <label className="text-black flex items-center gap-2">
          <input
            type="radio"
            name="searchType"
            value="organizations"
            checked={searchType === "organizations"}
            onChange={onChange}
            className="text-primary-main focus:ring-primary-main"
          />
          Organizations
        </label>
      </div>
    </form>
  );
};
