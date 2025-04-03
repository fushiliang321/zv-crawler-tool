
export function download(url, fileName) {
    const a = document.createElement('a')
    a.href = url
    a.target = 'target'
    a.download = fileName
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

export function exportFile(data, filename = 'data.csv') {
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), data], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    download(url,filename)
    URL.revokeObjectURL(url)
}

export function exportArr(arr, filename){
    let text = ''
    arr.forEach(element => {
        element.forEach(e=>{
            text += '"'+ e.replaceAll('"',"'") + '",'
        })
        text += '\n'
    })
    exportFile(text, filename)
}