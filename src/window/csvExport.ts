import { postMessage } from "./index"

const defaultFileName = 'data.csv'

export function string(data: string, filename = defaultFileName): Promise<any> {
  return postMessage({
    funName: 'exportData',
    arguments: arguments,
  })
}

export function arrays(data: unknown[][], filename = defaultFileName): Promise<any> {
  return postMessage({
    funName: 'exportArr',
    arguments: arguments,
  })
}

export function objects(data: (Record<string, any>)[], filename = defaultFileName): Promise<any> {
  const arr = []
  let keySet = new Set<string>()
  for (const item of data) {
    //每条数据的key可能会不一样，获取所有key
    keySet = new Set([...keySet, ...Object.keys(item)])
    const values = []
    if (!item) {
        continue
    }
    for (const key of keySet) {
        values.push(item[key] ?? '')
    }
    arr.push(values)
  }
  arr.unshift(Array.from(keySet))
  return arrays(arr, filename)
}