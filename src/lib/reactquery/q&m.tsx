import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNewUser,
  createPost,
  getRecentPosts,
  signInAccount,
  signOutAccount,
} from "../validate/appwrite/Apis";
import { INewUser, INewPost } from "@/model/data";
import { QUERY_KEYS } from "./queryKeys";

export const useMutationUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUser(user),
  });
};
export const useMutationSignIn = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
export const useMutationSignOut = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

///queries

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
