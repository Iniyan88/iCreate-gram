export type IcontextType = {
  user: IUser;
  Loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  Authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  details: string;
  imgId: string;
  imgUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  Thought: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  Thought: string;
  imgId: string;
  imgUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imgUrl: string;
  details: string;
};

export type INewUser = {
  password: string;
  name: string;
  email: string;
  username: string;
};
