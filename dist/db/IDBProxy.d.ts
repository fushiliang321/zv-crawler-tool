export type IDBProxy<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (...args: A) => IDBProxyReturn<R> : T[K];
};
type IDBProxyReturn<R> = R extends IDBRequest<infer U> ? Promise<U> : R extends IDBIndex ? AsyncIDBIndex : R extends IDBObjectStore ? AsyncIDBObjectStore : R extends IDBTransaction ? AsyncIDBTransaction : R extends IDBCursorWithValue ? AsyncIDBCursorWithValue : R extends IDBCursor ? AsyncIDBCursor : R;
export interface AsyncIDBObjectStore extends IDBProxy<IDBObjectStore> {
}
export interface AsyncIDBIndex extends IDBProxy<IDBIndex> {
}
export interface AsyncIDBTransaction extends IDBProxy<IDBTransaction> {
}
export interface AsyncIDBCursor extends IDBProxy<IDBCursor> {
}
export interface AsyncIDBCursorWithValue extends IDBProxy<IDBCursorWithValue> {
}
export default _default;
declare function _default<T extends IDBObjectStore | IDBIndex>(IDB: T): IDBProxy<T>;
//# sourceMappingURL=IDBProxy.d.ts.map