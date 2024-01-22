import Loader from "@/components/ui/Loader/Loader";
import { Button } from "@/components/ui/button";
import { userDetails } from "@/details/details";
import { useGetPostById } from "@/lib/reactquery/q&m";
import { timeAgo } from "@/lib/utils";
import React from "react";
import { Link, useParams } from "react-router-dom";
import PostStats from "./PostStats";

const Post = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = userDetails();
  const handleDeletePost = () => {};
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card text-slate-100">
          <img src={post?.image} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imgUrl || "/public/assets/react.png"}
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                />
                <div className="flex flex-col">
                  <p> {post?.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="sublt-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img src="/edit.svg" alt="edit" width={20} height={20} />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                  {/* del */}
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular ">
              <p>{post?.Thought}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
