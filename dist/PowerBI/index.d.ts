export declare function lineToMap(line: unknown[], propertys: string[]): Record<string, unknown>;
export default class PowerBI {
    lineLength: number;
    headers: any[];
    headerPropertys: string[];
    extractResponseData(data: any): Promise<Record<string, unknown>[]>;
    getEmptyLine(): (string | null)[];
    seatDecode(dmItem: Record<string, number>, key: string): void;
    decodeListDM(dm: any[], dicts: any[]): Promise<Record<string, unknown>[]>;
    setHeaders(data: any[]): void;
    dictsDecode(indexs: (string | null)[], dicts: any[]): (string | null)[];
}
//# sourceMappingURL=index.d.ts.map