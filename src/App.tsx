import { Routes, Route } from "react-router-dom";
import SignIn from "./_authentication/login/SignIn";
import SignUp from "./_authentication/login/SignUp";
import AuthLayout from "./_authentication/AuthLayout";
import MainLayout from "./_main/MainLayout";
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  Post,
  Profile,
  UpdatePost,
  UpdateProfile,
} from "./_main/components";
// import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import Downloads from "./_main/components/Downloads";

export default function App() {
  return (
    <main className="">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id/*" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}
