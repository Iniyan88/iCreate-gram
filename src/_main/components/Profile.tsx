import { Button } from "@/components/ui/button";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import GridPostList from "./GridPostList";
import { useGetCurrentUser, useGetUserById } from "@/lib/reactquery/q&m";
interface StatBlockProps {
  value: string | number;
  label: string;
}
const Profile = () => {
  const currentUser = useGetCurrentUser();
  console.log(currentUser.data);
  const { id } = useParams();
  const user = useGetUserById(id || "");
  console.log(user.data);

  const { pathname } = useLocation();
  const StatBlock = ({ value, label }: StatBlockProps) => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={user.data?.imgUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {user.data?.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{user.data?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={user.data?.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              <p>Nee vithaitha vithai ellam vinai arukka kaathirukum</p>
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div
              className={`${
                user.data?.id !== currentUser.data?.$id && "hidden"
              }`}
            >
              <Link
                to={`/update-profile/${currentUser.data?.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.data?.id !== currentUser.data?.$id && "hidden"
                }`}
              >
                <img src={"/edit.svg"} alt="edit" width={20} height={20} />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.data?.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.data?.id === user.data?.id && (
        <div className="flex max-w-5xl w-full text-slate-100">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/downloads.svg"}
              alt="posts"
              width={18}
              height={18}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img src={"/assets/like.svg"} alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={user.data?.posts} showUser={false} />}
        />
        {/* {currentUser.data?.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )} */}
      </Routes>
      <Outlet />
    </div>
  );
};
export default Profile;
