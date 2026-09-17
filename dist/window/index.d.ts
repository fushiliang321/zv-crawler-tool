export declare function postMessage(data: {
    taskId?: string;
    arguments?: IArguments | unknown[];
    funName: string;
}): Promise<any>;
export declare function fetch<T extends any>(input: RequestInfo | URL, init?: RequestInit): Promise<T>;
export declare function exportArr(data: unknown[][], filename?: string): Promise<any>;
export declare function exportData(data: string, filename?: string): Promise<any>;
export declare function win(key: string): any;
//# sourceMappingURL=index.d.ts.map