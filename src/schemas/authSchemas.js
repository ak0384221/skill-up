import z from "zod";
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine((val) => /^[a-z]/.test(val), {
      message: "Email must start with a lowercase letter",
    }),
  password: z
    .string()
    .min(8, "pass must be (8-30) character")
    .max(30, "pass must be (8-30) character"),
});

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .max(20, "Name should be at most 20 characters")
      .refine((val) => /^[A-Za-z]/.test(val), {
        message: "Name must start with a letter",
      }),
    email: z.string().email("email is required"),
    password: z
      .string()
      .min(8, "pass must be (8-30) character")
      .max(30, "pass must be (8-30) character"),

    confirmPassword: z.string().min(8, " (8-30) character").max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // <- Error will show under confirmPassword
  });

export { loginSchema, signupSchema };
