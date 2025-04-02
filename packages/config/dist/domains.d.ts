export type AppDomain = 'reader' | 'almanac' | 'publications' | 'lectionary' | 'finder';
export interface DomainConfig {
    subdomain: string;
    port: number;
    title: string;
    description: string;
}
export declare const domains: Record<AppDomain, DomainConfig>;
export declare function getDomainUrl(domain: AppDomain, isProduction?: boolean): string;
export declare function getLocalizedUrl(domain: AppDomain, language?: string, path?: string, isProduction?: boolean): string;
