import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpValidation } from "@/lib/validate/validation";
import Loader from "@/components/ui/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useMutationSignIn,
  useMutationUserAccount,
} from "@/lib/reactquery/q&m";
import { userDetails } from "@/details/details";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser } = userDetails();
  const { mutateAsync: createNewUser, isPending: creatingUser } =
    useMutationUserAccount();
  const { mutateAsync: signInAccount } = useMutationSignIn();
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signUpValidation>) {
    const addUser = await createNewUser(values);
    if (!addUser) {
      return toast({
        title: "Sign Up Failed . Please try again",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Sign In Failed . Please try again",
      });
    }
    const LoggedIn = await checkAuthUser();
    if (LoggedIn) {
      form.reset();
      navigate("/");
    }
  }

  return (
    <Form {...form}>
      <div className="bg-gray-100 p-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-md shadow-md space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border p-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border p-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional Fields */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="border p-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="border p-2 w-full focus:outline-none focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End of Additional Fields */}

          <Button
            type="submit"
            className=" bg-blue-500   flex gap-2 !important text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out"
          >
            {creatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
                ...Loading
              </div>
            ) : (
              "SignUp"
            )}
          </Button>
          <p>
            Already have an account ?
            <Link to="/SignIn" className="text-primary-500 ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
