// Where the actual RestoPOS app (registration / login) lives.
// The marketing site sends "Try Now", "Sign in", "Get started" and
// "Register now" here.
//
// restopos.store serves THIS marketing site, so the app lives on its own
// subdomain of the same domain. The *.vercel.app URL still works and stays a
// valid fallback if the subdomain is ever detached.
export const APP_URL = 'https://app.restopos.store';
