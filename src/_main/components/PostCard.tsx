import React from "react";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3  text-slate-100">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imgUrl || "/public/assets/react.svg"}
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p> {post.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {timeAgo(post.$createdAt)}
              </p>
              -
              <p className="sublt-semibold lg:small-regular">{post.location}</p>
            </div>
          </div>
        </div>
        <Link to={`/update-post/${post.$id}`}>
          <img src="" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
