import { Input } from "@/components/ui/input";
import { useState } from "react";
import SearchResults from "./SearchResults";
import GridPostList from "./GridPostList";
import { useGetPosts, useSearchPosts } from "@/lib/reactquery/q&m";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/ui/Loader/Loader";

const Explore = () => {
  const { data: posts } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);
  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);
  return (
    <div className="explore-container text-slate-100">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full"> Search</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-1">
          <img src="/assets/search.svg" width={30} height={40} />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer ">
          <p className="small-medium md-base-medium text-slate-100">All</p>
          <p>
            <img src="/assets/filter.svg" alt="filter" height={20} width={20} />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents || []}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents || []} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
