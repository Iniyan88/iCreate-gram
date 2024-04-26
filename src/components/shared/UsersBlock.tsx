import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UsersBlock = ({ user }: UserCardProps) => {
  console.log(user);
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imgUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center ">{user.name}</p>
        <p className="small-regular text-light-3 text-center ">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UsersBlock;
