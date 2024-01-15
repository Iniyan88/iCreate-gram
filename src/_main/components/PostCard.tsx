import React from "react";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3  text-slate-100">
          {/* <Link to={`/profile/${post.creator.$id}`}></Link> */}
          <img
            src={post?.creator?.imgUrl || "/public/assets/react.svg"}
            alt="creator"
            className="rounded-full w-12 lg:h-12"
          />
          <div className="flex flex-col">
            <p> {post.creator.name}</p>
            <div>
              <p>{post.$createdAt}</p>
            </div>
            -<div>{post.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
