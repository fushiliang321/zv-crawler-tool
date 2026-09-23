import { postMessage } from "./index"

const defaultFileName = 'data.json'

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