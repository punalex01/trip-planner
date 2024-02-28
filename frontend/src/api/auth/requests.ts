import fetcher from 'src/global/functions';
import { RegisterPayload, LoginPayload } from './payloads';

export function post_register(values: RegisterPayload) {
  return fetcher('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function post_login(values: LoginPayload) {
  return fetcher('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function post_logout() {
  return fetcher('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
