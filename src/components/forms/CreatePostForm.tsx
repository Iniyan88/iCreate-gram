import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validate/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/reactquery/q&m";
import { userDetails } from "@/details/details";
import { useToast } from "../ui/use-toast";
type PostFormProps = {
  Post?: Models.Document;
  action: "create" | "update";
};

const CreatePostForm = ({ Post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  // const { mutateAsync: createPost, isPending: isLoadingCreate } =
  //   useCreatePost();

  const { user } = userDetails();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      Thought: Post ? Post?.Thought : "",
      file: [],
      location: Post ? Post?.location : "",
      tags: Post ? Post?.tags.join(",") : "",
    },
  });
  //@ts-ignore
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (Post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
        postId: Post.$id,
        imgId: Post?.imageId,
        image: Post?.image,
      });
      if (!updatedPost) {
        toast({
          title: "Please try again",
        });
      }

      return navigate(`/post/${Post.$id}`);
    }
    const newPost = await createPost({ ...values, userId: user.id });
    if (!newPost) {
      toast({
        title: "please try again",
      });
    }
    navigate("/");
    // console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-xl text-slate-100"
      >
        <FormField
          control={form.control}
          name="Thought"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Thought</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  placeholder="What's on your mind?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={Post?.image}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , " )
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Emotion,Game,Entertainment"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-3 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || (isLoadingUpdate && "Loading...")}
            {action}Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
