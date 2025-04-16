import { z } from 'zod'

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>



export const noteSchema = z.object({
    id: z.number().int(),
  title: z.string(),
  content: z.string(),
  userId: z.number().int(),
  archived: z.boolean().optional(),
  categories: z.array(z.number().int()).optional() 
});

export type Note = z.infer<typeof noteSchema>;
export type NoteForm = Pick<Note, "title" | "content">;

export const categorySchema = z.object({
    id: z.number().int(),
    name: z.string().min(1, "El nombre es requerido"),
    userId: z.number().int()
  });
  
 export type Category = z.infer<typeof categorySchema>;
 export type CategoryForm = Pick<Category, "name">;
  
