declare enum logType {
    info = 0,
    error = 1
}
type log = {
    type: logType;
    data: any;
};
export default class logs {
    limit: number;
    list: log[];
    constructor(limit?: number);
    push(log: log): void;
    info(data: any): void;
    error(data: any): void;
}
export {};
//# sourceMappingURL=index.d.ts.map