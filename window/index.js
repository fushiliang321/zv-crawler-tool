const taskSuffix = String(Math.random())
const taskMap = {}

let taskId = 0

window.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    if (!data.taskId || !taskMap[data.taskId] || !taskMap[data.taskId].resolve) {
      return
    }
    taskMap[data.taskId].resolve(data.result)
    delete taskMap[data.taskId]
})

export function postMessage(data) {
  data.taskId = String(++taskId) + taskSuffix
  if(data.arguments && data.arguments.length) {
    const args = []
    for (let i = 0; i < data.arguments.length; i++) {
      args[i] = data.arguments[i]
    }
    data.arguments = args
  }
  const promise =  new Promise((resolve, reject) => {
    taskMap[data.taskId] = {
      resolve,
      reject
    }
  })
  window.parent.postMessage(JSON.stringify(data), '*')
  return promise
}

export function fetch(input, init) {
  return postMessage({
    funName: 'fetch',
    arguments: arguments,
  })
}

export function exportArr(data, filename = 'data.csv') {
  return postMessage({
    funName: 'exportArr',
    arguments: arguments,
  })
}

export function exportData(data, filename = 'data.csv') {
  return postMessage({
    funName: 'exportData',
    arguments: arguments,
  })
}
