import React from "react";
import { Models } from "@/types/models";
import { userDetails } from "@/details/details";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
type GridPostListProps = {
  posts: Models.Documents[];
  showUser?: boolean;
  showStats?: boolean;
};
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = userDetails();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/post/${post.$id}`} className="grid-post_link">
            <img
              src={post.image}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2  flex-1">
                <img
                  src={post.creator.imgUrl}
                  alt="creator"
                  className="h-10 w-10 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
