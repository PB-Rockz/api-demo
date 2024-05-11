import { z } from "zod"
 
export const userSearchSchema = z.object({
  username: z.string().min(2).max(50),
})