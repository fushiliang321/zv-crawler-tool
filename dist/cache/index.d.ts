export declare function setName(name: string): void;
export declare function has(key: string): Promise<boolean>;
export declare function get<T>(key: string): Promise<T | undefined>;
export declare function getAll(): Promise<unknown[]>;
export declare function set(key: string, value: unknown): Promise<false | IDBValidKey>;
export declare function del(key: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map