// import { useFieldArray, useForm } from 'react-hook-form';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// import { EmailFields } from './email-fields';
// import { PhoneFields } from './phone-fields';

// type FormValues = {
//   firstName: string;
//   lastName: string;
//   title: string;

//   emails: {
//     label: string;
//     email: string;
//   }[];

//   phones: {
//     label: string;
//     phoneNumber: string;
//   }[];
// };

// export function ContactForm() {
//   const form = useForm<FormValues>({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       title: '',
//       emails: [{ label: '', email: '' }],
//       phones: [{ label: '', phoneNumber: '' }],
//     },
//   });

//   const emails = useFieldArray({
//     control: form.control,
//     name: 'emails',
//   });

//   const phones = useFieldArray({
//     control: form.control,
//     name: 'phones',
//   });

//   const onSubmit = (values: FormValues) => {
//     console.log(values);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
//       <div className="space-y-4 px-2">
//         <h3 className="font-semibold">Basic Information</h3>

//         <div className="space-y-2">
//           <Label>First Name</Label>

//           <Input {...form.register('firstName')} className="rounded-xl" />
//         </div>

//         <div className="space-y-2">
//           <Label>Last Name</Label>

//           <Input {...form.register('lastName')} className="rounded-xl" />
//         </div>

//         <div className="space-y-2">
//           <Label>Title</Label>

//           <Input
//             {...form.register('title')}
//             placeholder="Software Engineer"
//             className="rounded-xl"
//           />
//         </div>
//       </div>

//       <EmailFields
//         fields={emails.fields}
//         register={form.register}
//         append={() =>
//           emails.append({
//             label: '',
//             email: '',
//           })
//         }
//         remove={emails.remove}
//       />

//       <PhoneFields
//         fields={phones.fields}
//         register={form.register}
//         append={() =>
//           phones.append({
//             label: '',
//             phoneNumber: '',
//           })
//         }
//         remove={phones.remove}
//       />

//       <Button type="submit" size="lg" className="w-full rounded-xl">
//         Save Contact
//       </Button>
//     </form>
//   );
// }

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmailFields } from './email-fields';
import { PhoneFields } from './phone-fields';
import { contactsApi } from '@/api/contactsApi';
import { queryKeys } from '@/lib/queryKeys';
import {
  contactFormSchema,
  ContactFormValues,
} from '@/lib/schemas/contactSchemas';

interface Props {
  onSuccess: () => void;
}

export function ContactForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      emails: [{ label: '', email: '' }],
      phones: [{ label: '', phoneNumber: '' }],
    },
  });

  const emails = useFieldArray({ control: form.control, name: 'emails' });
  const phones = useFieldArray({ control: form.control, name: 'phones' });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await contactsApi.create({
        firstName: values.firstName,
        lastName: values.lastName,
        title: values.title,
        emails: values.emails.length > 0 ? values.emails : undefined,
        phones: values.phones.length > 0 ? values.phones : undefined,
      });
      // Invalidate contacts list so grid refreshes
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.lists() });
      form.reset();
      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        'Failed to create contact. Please try again.';
      form.setError('root', { message });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
      <div className="space-y-4 px-2">
        <h3 className="font-semibold">Basic Information</h3>

        <div className="space-y-2">
          <Label>First Name</Label>
          <Input {...form.register('firstName')} className="rounded-xl" />
          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input {...form.register('lastName')} className="rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            {...form.register('title')}
            placeholder="Software Engineer"
            className="rounded-xl"
          />
        </div>
      </div>

      <EmailFields
        fields={emails.fields}
        register={form.register}
        errors={errors.emails}
        append={() => emails.append({ label: '', email: '' })}
        remove={emails.remove}
      />

      <PhoneFields
        fields={phones.fields}
        register={form.register}
        errors={errors.phones}
        append={() => phones.append({ label: '', phoneNumber: '' })}
        remove={phones.remove}
      />

      {errors.root && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Contact'}
      </Button>
    </form>
  );
}
