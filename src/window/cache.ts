import { postMessage } from "./index"

export const localStorage = {
  get(key: string): Promise<string> {
    return postMessage({
      funName: 'localStorage.getItem',
      arguments: arguments,
    })
  },
  key(index: number): Promise<string|null> {
    return postMessage({
      funName: 'localStorage.key',
      arguments: arguments,
    })
  },
  remove(key: string): Promise<void> {
    return postMessage({
      funName: 'localStorage.removeItem',
      arguments: arguments,
    })
  },
  set(key: string, value: string): Promise<void> {
    return postMessage({
      funName: 'localStorage.setItem',
      arguments: arguments,
    })
  },
  clear(): Promise<void> {
    return postMessage({
      funName: 'localStorage.clear',
      arguments: arguments,
    })
  }
}

export const sessionStorage = {
  get(key: string): Promise<string|null> {
    return postMessage({
      funName: 'sessionStorage.getItem',
      arguments: arguments,
    })
  },
  key(index: number): Promise<string|null> {
    return postMessage({
      funName: 'sessionStorage.key',
      arguments: arguments,
    })
  },
  remove(key: string): Promise<void> {
    return postMessage({
      funName: 'sessionStorage.removeItem',
      arguments: arguments,
    })
  },
  set(key: string, value: string): Promise<void> {
    return postMessage({
      funName: 'sessionStorage.setItem',
      arguments: arguments,
    })
  },
  clear(): Promise<void> {
    return postMessage({
      funName: 'sessionStorage.clear',
      arguments: arguments,
    })
  }
}