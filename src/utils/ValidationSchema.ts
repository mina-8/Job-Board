import { z } from "zod";

export const Searchjobs = z.object({
    job : z.string().min(1 , {message : "Job is Required"}),
    location : z.string().optional().nullable(),
})
export const CreateJob = z.object({
    title: z.string().min(1, { message: "Required title" }),
    location: z.string().min(1, { message: "Required location" }),
    description: z.string().min(1, { message: "Required description" }),
    salary: z.number().min(1, { message: 'Required salary' }),
    type: z.enum(['full-time', 'part-time', 'temporary'], {
        errorMap: () => ({ message: 'Please select a valid job type' }),
    }),
});
