import React from "react";
import { Models } from "@/types/models";
import Loader from "@/components/ui/Loader/Loader";
import GridPostList from "./GridPostList";
type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Documents[];
};
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return (
    <p className="text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};
export default SearchResults;
