import IDBProxy from "./IDBProxy"

export default class Table{
    db
    tableName = '' //表名称

    constructor(db, tableName = 'tableName') {
        this.db = db
        this.tableName = tableName
    }

    async store(mode) {
        const db = await this.db.getDB()
        if(!db) {
            return undefined
        }
        const store = db.transaction(this.tableName, mode).objectStore(this.tableName)
        return IDBProxy(store)
    }

    /**
     * 添加数据
     * @param value
     * @param key
     * @returns
     */
    async add(value, key) {
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        return await store.add(value, key)
    }

    /**
     * 更新数据
     * @param value
     * @param key
     * @returns
     */
    async put(value, key, replace) {
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        if (key) {
            const record = await store.get(key)
            if (record?.id) {
                if (replace) {
                    //替换数据
                    return await store.put(record ? {
                        id: record.id,
                        ...value,
                    } : value)
                }
                return await store.put({
                    ...record,
                    ...value,
                })
            }
        }
        return await store.put(value, key)
    }

    /**
     * 通过索引更新数据
     * @param indexKey
     * @param indexValue
     * @param data
     * @param replace
     * @returns
     */
    async putByIndex(indexKey, indexValue, data, replace){
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        const record = await store.index(indexKey).get(indexValue)
        if(record?.id) {
            if (replace) {
                //替换数据
                return await store.put(record ? {
                    id: record.id,
                    ...data,
                } : data)
            }
            return await store.put({
                ...record,
                ...data,
            })
        }
        return await store.add(data)
    }

    // 查询数据
    async getAll(query, count) {
        const res = await (await this.store())?.getAll(query, count)
        if(!res) {
            return []
        }
        return res
    }

    // 通过主键读取数据
    async get(query){
        return await (await this.store())?.get(query)
    }

    // 通过索引读取数据
    async getByIndex(key, query){
        return (await (await this.store())?.index(key).get(query))
    }

    // 读取索引全部数据
    async getAllByIndex(key, query, count) {
        return (await (await this.store())?.index(key).getAll(query, count)) ?? []
    }

    // 统计指定索引的数据行数
    async countByIndex(key, query){
        return (await (await this.store())?.index(key).count(query)) ?? 0
    }

    // 删除数据
    async delete(query) {
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        store.delete(query)
        return true
    }

    // 通过索引删除数据
    async deleteByIndex(indexKey, query, count) {
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        const keys = await store.index(indexKey).getAllKeys(query, count)
        if (keys && keys.length) {
            const awaits = []
            keys.forEach(async key => {
                awaits.push(store.delete(key))
            })
            await Promise.all(awaits)
        }
        return true
    }

    // 清空表数据
    async clearDB(){
        const store = await this.store('readwrite')
        if (!store) {
            return false
        }
        await store.clear()
        return true
    }
}