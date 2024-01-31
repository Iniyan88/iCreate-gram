import * as z from "zod";
export const signUpValidation = z.object({
  username: z.string().min(2, { message: "Give a appropriate username" }),
  name: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must contain atleast 8 characters " }),
});
export const signInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must contain atleast 8 characters " }),
});
export const PostValidation = z.object({
  Thought: z
    .string()
    .min(5, { message: "string must contains atleast 5 characters" })
    .max(2000),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
