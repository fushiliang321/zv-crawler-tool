function ProxyResult(result: any) {
    if (result instanceof IDBIndex ||
        result instanceof IDBObjectStore) {
        return new Proxy(result, ProxyHandler)
    }
    return result
}

const ProxyHandler: ProxyHandler<any>  = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function(...args: unknown[]) {
                const result = target[prop](...args)
                if (result instanceof IDBRequest && prop !== 'openCursor') {
                    return new Promise((resolve, reject) => {
                        result.onsuccess = event => {
                            resolve(ProxyResult(result.result))
                        }
                        result.onerror = event =>{
                            reject(event)
                        }
                    })
                }
                return ProxyResult(result)
            };
        } else {
            return ProxyResult(target[prop])
        }
    }
}

export type IDBProxy<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => IDBProxyReturn<R>
    : T[K];
};

// 返回值转换规则：
//   IDBRequest<U>   -> Promise<U>
//   IDBIndex 等 IDB 对象 -> 递归 Asyncify 后的版本
//   其它             -> 原样返回
type IDBProxyReturn<R> =
  R extends IDBRequest<infer U> ? Promise<U> :
  R extends IDBIndex ? AsyncIDBIndex :
  R extends IDBObjectStore ? AsyncIDBObjectStore :
  R extends IDBTransaction ? AsyncIDBTransaction :
  R extends IDBCursorWithValue ? AsyncIDBCursorWithValue :
  R extends IDBCursor ? AsyncIDBCursor :
  R;

// 用 interface 打破循环引用（type 别名直接互引会报循环错误）
export interface AsyncIDBObjectStore extends IDBProxy<IDBObjectStore> {}
export interface AsyncIDBIndex extends IDBProxy<IDBIndex> {}
export interface AsyncIDBTransaction extends IDBProxy<IDBTransaction> {}
export interface AsyncIDBCursor extends IDBProxy<IDBCursor> {}
export interface AsyncIDBCursorWithValue extends IDBProxy<IDBCursorWithValue> {}

export default <T extends IDBObjectStore | IDBIndex>(IDB: T): IDBProxy<T> => {
   return ProxyResult(IDB)
}