export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    setToken: (key: string, token: string) => Promise<void>;
    clearToken: (key: string) => void;
}