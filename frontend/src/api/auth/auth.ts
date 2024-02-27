import fetcher from 'src/global/functions';
import { LoginPayload } from './payloads';

export function fetch_login(values: LoginPayload) {
  return fetcher('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}
