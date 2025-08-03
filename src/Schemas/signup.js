import z from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .max(20, "Name should be at most 20 characters")
      .refine((val) => /^[A-Za-z]/.test(val), {
        message: "Name must start with a letter",
      }),
    email: z.string().email("email is required"),
    password: z
      .string()
      .min(8, "password should be 8-30 character long")
      .max(30),
    confirmPassword: z
      .string()
      .min(8, "password should be 8-30 character long")
      .max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // <- Error will show under confirmPassword
  });
