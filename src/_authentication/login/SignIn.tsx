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
import { signInValidation } from "@/lib/validate/validation";
import Loader from "@/components/ui/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutationSignIn } from "@/lib/reactquery/q&m";
import { userDetails } from "@/details/details";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, Loading: userLoading } = userDetails();
  const { mutateAsync: signInAccount } = useMutationSignIn();
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInValidation>) {
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
      toast({
        title: "Sign In Successfull",
      });
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In Failed . Please try again",
      });
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
            {userLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                ...Loading
              </div>
            ) : (
              "SignIn"
            )}
          </Button>
          <p>
            Dont have an account ?
            <Link to="/SignUp " className="text-primary-500 ml-1">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
