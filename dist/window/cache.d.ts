export declare const localStorage1: {
    get(key: string): Promise<string>;
    key(index: number): Promise<string | null>;
    remove(key: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
    clear(): Promise<void>;
};
export declare const sessionStorage: {
    get(key: string): Promise<string | null>;
    key(index: number): Promise<string | null>;
    remove(key: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
    clear(): Promise<void>;
};
//# sourceMappingURL=cache.d.ts.map