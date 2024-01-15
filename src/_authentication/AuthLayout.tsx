import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const authenticated = false;
  return (
    <>
      {authenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          {/* <img
            src=""
            alt="logo"
            className="hidden xl:block w-1/2 object-cover bg-no-repeat"
          /> */}
        </>
      )}
    </>
  );
};

export default AuthLayout;
