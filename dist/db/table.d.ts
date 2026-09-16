import { AsyncIDBObjectStore } from "./IDBProxy";
import indexedDBClass from "./indexedDB";
export default class Table {
    db: indexedDBClass;
    tableName: string;
    constructor(db: indexedDBClass, tableName?: string);
    store(mode?: IDBTransactionMode): Promise<AsyncIDBObjectStore | undefined>;
    /**
     * 添加数据
     * @param value
     * @param key
     * @returns
     */
    add(value: any, key?: IDBValidKey): Promise<IDBValidKey | false>;
    /**
     * 更新数据
     * @param value
     * @param key
     * @returns
     */
    put(value: any, key: IDBValidKey, replace: boolean): Promise<IDBValidKey | false>;
    /**
     * 通过索引更新数据
     * @param indexKey
     * @param indexValue
     * @param data
     * @param replace
     * @returns
     */
    putByIndex(indexKey: string, indexValue: IDBValidKey | IDBKeyRange, data: any, replace: boolean): Promise<IDBValidKey | false>;
    getAll<T extends any>(query?: IDBValidKey | IDBKeyRange, count?: number): Promise<T[]>;
    get<T extends any>(query: IDBValidKey | IDBKeyRange): Promise<T | undefined>;
    getByIndex<T extends any>(key: string, query: IDBValidKey | IDBKeyRange): Promise<T | undefined>;
    getAllByIndex<T extends any>(key: string, query?: IDBValidKey | IDBKeyRange, count?: number): Promise<T[]>;
    countByIndex(key: string, query?: IDBValidKey | IDBKeyRange): Promise<number>;
    delete(query: IDBValidKey | IDBKeyRange): Promise<boolean>;
    deleteByIndex(indexKey: string, query?: IDBValidKey | IDBKeyRange, count?: number): Promise<boolean>;
    clearDB(): Promise<boolean>;
}
//# sourceMappingURL=table.d.ts.map