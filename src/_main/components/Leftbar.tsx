import { Button } from "@/components/ui/button";
import { userDetails } from "@/details/details";
import { useMutationSignOut } from "@/lib/reactquery/q&m";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Leftbar = () => {
  const location = useLocation();
  const { mutate: signOut, isSuccess } = useMutationSignOut();
  const navigate = useNavigate();
  const { user } = userDetails();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="sticky top-0 hidden md:flex h-full px-6 py-10 flex-col min-w-[270px] bg-dark-2">
      <div className="flex flex-col gap-11 mt-11">
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imgUrl || "/assets/react.png"}
            className="h-10  w-10 rounded-full"
            alt=""
          />
          <div className="flex flex-col">
            <p className="body-bold text-slate-100">{user.name}</p>
            <p className="small-regular text-light-3 ">@{user.name}</p>
          </div>
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="flex gap-3 items-center "
        ></Link>
        <div className="flex items-center  ">
          <ul className="flex flex-col gap-6">
            <li
              className={`rounded-lg base-medium hover:bg-primary-500 transition text-slate-100 ${
                location.pathname === "/" && "bg-primary-500"
              }`}
            >
              <Link to="/" className="ml-5 flex gap-4 items-center py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  D
                  <path
                    fill="#ffffff"
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li
              className={`rounded-lg base-medium hover:bg-primary-500 transition text-slate-100 ${
                location.pathname === "/explore" && "bg-primary-500"
              }`}
            >
              <Link to="/explore" className="ml-5 flex gap-3 items-center py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  />
                </svg>
                Feed
              </Link>
            </li>
            <li
              className={`rounded-lg base-medium hover:bg-primary-500 transition text-slate-100 ${
                location.pathname == "/all-users" && "bg-primary-500"
              }`}
            >
              <Link
                to="/all-users"
                className="ml-5 flex gap-4 items-center py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#ffffff"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
                Public
              </Link>
            </li>
            <li
              className={`rounded-lg base-medium hover:bg-primary-500 transition text-slate-100 ${
                location.pathname === "/downloads" && "bg-primary-500"
              }`}
            >
              <Link
                to="downloads"
                className="ml-5 flex gap-4 items-center py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                  />
                </svg>
                Downloads
              </Link>
            </li>
            <li
              className={`rounded-lg base-medium hover:bg-primary-500 transition text-slate-100 ${
                location.pathname === "/create-post" && "bg-primary-500"
              }`}
            >
              <Link
                to="/create-post"
                className="ml-5 flex gap-4 items-center py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#ffffff"
                    d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  />
                </svg>
                Create
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex m-12">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
            <p className="text-slate-100">Logout</p>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Leftbar;
