/* eslint-disable @typescript-eslint/no-explicit-any */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function updateOptions(options: any) {
  const update = { ...options };
  if (localStorage.token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.token}`,
    };
  }
  return update;
}

export default function fetcher(url: string | URL | Request, options: any) {
  return fetch(url, updateOptions(options));
}
