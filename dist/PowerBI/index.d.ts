export declare function lineToMap(line: unknown[], propertys: string[]): Record<string, unknown>;
export default class PowerBI {
    lineLength: number;
    headers: any[];
    headerPropertys: string[];
    formatMap: Record<string, string>;
    extractResponseData(data: any): Record<string, unknown>[];
    getEmptyLine(): (string | null)[];
    seatDecode(dmItem: Record<string, number>, key: string): string[] | undefined;
    decodeListDM(dm: any[], dicts: any[]): Record<string, unknown>[];
    setHeaders(data: any[]): void;
    dictsDecode(indexs: (string | null)[], dicts: any[]): (string | null)[];
}
//# sourceMappingURL=index.d.ts.map