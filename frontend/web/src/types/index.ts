export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ContactEmailResponse {
  id: number;
  email: string;
  label: string;
}

export interface ContactPhoneResponse {
  id: number;
  phoneNumber: string;
  label: string;
}

export interface ContactResponse {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  emails: ContactEmailResponse[];
  phones: ContactPhoneResponse[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface CreateContactEmailRequest {
  email: string;
  label: string;
}

export interface CreateContactPhoneRequest {
  phoneNumber: string;
  label: string;
}

export interface CreateContactRequest {
  firstName: string;
  lastName?: string;
  title?: string;
  emails?: CreateContactEmailRequest[];
  phones?: CreateContactPhoneRequest[];
}
