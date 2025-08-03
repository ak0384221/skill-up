import z from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine((val) => /^[a-z]/.test(val), {
      message: "Email must start with a lowercase letter",
    }),
  password: z.string().min(8, "password must be atleast 8 character"),
});
