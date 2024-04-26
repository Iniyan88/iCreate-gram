import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNewUser,
  createPost,
  deleteDownloadedPost,
  deletePost,
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  getUserById,
  getUsers,
  postDownloads,
  postLikes,
  searchPosts,
  signInAccount,
  signOutAccount,
  updatePost,
} from "../validate/appwrite/Apis";
import { INewUser, INewPost, IUpdatePost } from "@/model/data";
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
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => postLikes(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDownloadPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      postDownloads(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteDownloadedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (DownloadedId: string) => deleteDownloadedPost(DownloadedId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imgId }: { postId: string; imgId: string }) =>
      deletePost(postId, imgId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam }) => getInfinitePosts({ pageParam }),
    getNextPageParam: (lastPage: any) => {
      if (!lastPage || !lastPage.documents || lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: 0,
  });
};
export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};
export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
