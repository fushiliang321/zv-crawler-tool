export default class pool {
    #private;
    status: boolean;
    concurrencyNum: number;
    constructor(num?: number);
    setConcurrencyNum(num: number): void;
    push(): void;
    pop(): Promise<void>;
    pause(): void;
    continue(): void;
    close(): void;
    open(): void;
    add(task: () => Promise<any>): Promise<void>;
    awaitAll(): Promise<void>;
}
export declare function New(num?: number): pool;
//# sourceMappingURL=index.d.ts.map