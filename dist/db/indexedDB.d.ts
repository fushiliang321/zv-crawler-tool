export type tableConfigItem = {
    keyPath?: string;
    options?: IDBIndexParameters;
};
export type tableConfig = string[] | Record<string, tableConfigItem>;
export default class indexedDBClass {
    _initFinishCallBackFuns: ((value?: unknown) => void)[];
    _isInitFinish: boolean;
    _db: IDBDatabase | undefined;
    _dbName: string;
    _dbversion: number;
    _tableMap: Record<string, tableConfig>;
    constructor(dbName?: string, tableMap?: {});
    initDB(): Promise<unknown>;
    getDB(): Promise<IDBDatabase | undefined>;
    awaitInit(): Promise<void>;
    closeDB(): Promise<void>;
}
//# sourceMappingURL=indexedDB.d.ts.map