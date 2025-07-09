import { z } from "zod";


export const UserProfileSchema = z.object({
  firstName: z.string(),
  lastName:  z.string(),
  email:     z.string().email().optional(),

});


export type UserProfileRequest = z.infer<typeof UserProfileSchema>;

// interface UserProfileRequest{
//     firstName: string,
//     lastName: string,
//     age? : number;
// }