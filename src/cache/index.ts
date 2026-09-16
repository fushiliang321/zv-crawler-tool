import db from 'zv-crawler-tool/db'

const table = db('opensupplyhub.org_cache')

type store<T extends unknown> = {
    id: string,
    value: T
}

export async function has(key: string): Promise<boolean> {
    const res = await table.get(key) as store<unknown> | undefined;
    return (!!res && res.hasOwnProperty('value'))
}

export async function get<T>(key: string): Promise<T|undefined> {
    const res = await table.get(key) as store<T> | undefined
    return res ? res?.value : undefined
}

export async function getAll() {
    const res = await table.getAll()
    return res
}

export async function set(key: string, value: unknown) {
 return await table.put({
    id: key,
    value: value
  })
}

export async function del(key: string) {
 return await table.delete(key)
}

