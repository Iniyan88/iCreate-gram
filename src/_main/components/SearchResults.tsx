import Loader from "@/components/ui/Loader/Loader";
import GridPostList from "./GridPostList";
import { Models } from "appwrite";
type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />;
  }
  return (
    <p className="text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};
export default SearchResults;
