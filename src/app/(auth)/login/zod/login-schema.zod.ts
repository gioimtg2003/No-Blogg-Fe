import * as z from 'zod';

const LoginSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be at most 20 characters long'),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
export default LoginSchema;
