import { Button } from "@/components/ui/button";
import { userDetails } from "@/details/details";
import { useMutationSignOut } from "@/lib/reactquery/q&m";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { mutate: signOut, isSuccess } = useMutationSignOut();
  const navigate = useNavigate();
  const { user } = userDetails();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <div className="sticky top-0 z-50 md:hidden bg-dark-2 w-full">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center"></Link>
        <div className="flex gap-4 text-slate-100">
          <Button variant="ghost" onClick={() => signOut()}>
            Logout
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imgUrl || "/assets/react.png"}
              className="h-8 w-8 rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
