import React, { useState, useEffect } from "react";
import { Models } from "appwrite";
import {
  useDeleteDownloadedPost,
  useDownloadPost,
  useGetCurrentUser,
  useLikePost,
} from "@/lib/reactquery/q&m";
import { checkIsLiked } from "@/lib/utils";
import { set } from "react-hook-form";
import Loader from "@/components/ui/Loader/Loader";
import { get } from "http";
import { getCurrentUser } from "@/lib/validate/appwrite/Apis";
type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: downloadPost, isPending: isDownloadingPost } =
    useDownloadPost();
  const { mutate: deleteDownloadedPost, isPending: isDeletingDownloadedPost } =
    useDeleteDownloadedPost();
  const { data: currentUser } = useGetCurrentUser();
  const handlePostLikes = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const DownloadedPost = currentUser?.download.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsDownloaded(!!DownloadedPost);
  }, [currentUser]);
  const handlePostDownloads = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (DownloadedPost) {
      setIsDownloaded(false);
      deleteDownloadedPost(DownloadedPost.$id);
      return;
    } else {
      downloadPost({ postId: post.$id, userId });
      setIsDownloaded(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/liked.svg"
              : "/assets/like.svg"
          }
          alt="like"
          height={22}
          width={22}
          onClick={handlePostLikes}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isDeletingDownloadedPost || isDownloadingPost ? (
          <Loader />
        ) : (
          <img
            src={
              isDownloaded ? "/assets/downloaded.svg" : "/assets/downloads.svg"
            }
            alt="downloads"
            height={15}
            width={15}
            onClick={handlePostDownloads}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
