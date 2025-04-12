export type AppDomain = 'reader' | 'almanac' | 'publications' | 'lectionary' | 'finder';

export interface DomainConfig {
  subdomain: string;
  port: number;
  title: string;
  description: string;
}

export const domains: Record<AppDomain, DomainConfig> = {
  reader: {
    subdomain: 'reader',
    port: 3001,
    title: 'UB Reader',
    description: 'Read The Urantia Book online',
  },
  almanac: {
    subdomain: 'almanac',
    port: 3002,
    title: 'Master Universe Almanac',
    description: 'Explore the cosmology and personalities of the Urantia Book',
  },
  publications: {
    subdomain: 'publications',
    port: 3000,
    title: 'UB Publications',
    description: 'Publications and articles related to The Urantia Book',
  },
  lectionary: {
    subdomain: 'lectionary',
    port: 3003,
    title: 'UB Lectionary',
    description: 'Lectionary readings from The Urantia Book',
  },
  finder: {
    subdomain: 'finder',
    port: 3004,
    title: 'Paradise Finder',
    description: 'Interactive tool to conceptualize and locate Paradise',
  },
};

export function getDomainUrl(
  domain: AppDomain,
  isProduction = process.env.NODE_ENV === 'production'
): string {
  const config = domains[domain];

  if (isProduction) {
    return `https://${config.subdomain}.masteruniverse.org`;
  }

  return `http://localhost:${config.port}`;
}

export function getLocalizedUrl(
  domain: AppDomain,
  language: string = 'en',
  path: string = '/',
  isProduction = process.env.NODE_ENV === 'production'
): string {
  const baseUrl = getDomainUrl(domain, isProduction);
  const langPath = language === 'en' ? '' : `/${language}`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${langPath}${normalizedPath}`;
}
