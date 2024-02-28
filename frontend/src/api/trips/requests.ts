import fetcher from 'src/global/functions';
import { LoginPayload } from './payloads';

export function get_trips() {
  return fetcher('/trips/');
}

export function post_trips(values: LoginPayload) {
  return fetcher('/trips/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}
