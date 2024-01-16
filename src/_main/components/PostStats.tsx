import React, { useState, useEffect } from "react";
import { Models } from "appwrite";
import {
  useDeleteDownloadedPost,
  useDownloadPost,
  useLikePost,
} from "@/lib/reactquery/q&m";
import { userDetails } from "@/details/details";
type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const { mutate: likePost } = useLikePost();
  const { mutate: downloadPost } = useDownloadPost();
  const { mutate: deleteDownloadedPost } = useDeleteDownloadedPost();
  const { data: currentUser } = userDetails();

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/like.svg"
          alt="like"
          height={22}
          width={22}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex gap-2 ">
        <img
          src="/assets/downloads.svg"
          alt="downloads"
          height={15}
          width={15}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
