import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  title: z.string().optional(),
  emails: z.array(
    z.object({
      id: z.number().optional(), // present on existing emails, absent on new ones
      label: z.string().min(1, 'Label is required'),
      email: z.string().email('Please enter a valid email'),
    }),
  ),
  phones: z.array(
    z.object({
      id: z.number().optional(), // present on existing phones, absent on new ones
      label: z.string().min(1, 'Label is required'),
      phoneNumber: z.string().min(1, 'Phone number is required'),
    }),
  ),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
