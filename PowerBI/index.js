//已知的md键值
const knownMDKeys = ['C','R','Ø','S']

//解码出空位
const seatDecode = {
	"Ø": (v,len) => {
		//标记出空数据
		const line = Array(len)
		const vline = v.toString(2).split("").reverse()
		for (let i = 0; i < len; i++) {
			line[i] = vline[i]==='1' ? "-1" : "0"
		}
		return line
	},
	"R": (v,len) => {
		//标记出可以复用的数据
		const line = Array(len)
		const vline = v.toString(2).split("").reverse()
		for (let i = 0; i < len; i++) {
			line[i] = vline[i]==='1' ? "1" : "0"
		}
		return line
	},
}

//行数据转为字典数据
export function lineToMap(line, propertys) {
	const mapData = {}
	for (const i in propertys) {
		mapData[propertys[i]] = line[i]
	}
	return mapData
}

export default class PowerBI {
	lineLength = 0
	headers = []
	headerPropertys = []

	async extractResponseData(data) {
		const DM = data.results[0].result.data.dsr.DS[0].PH[0].DM0
		const valueDicts = data.results[0].result.data.dsr.DS[0].ValueDicts
		this.headerPropertys.length = 0
		for (let key of data.results[0].result.data.descriptor.Expressions.Primary.Groupings[0].Keys) {
			this.headerPropertys.push(key.Source.Property)
		}
		return this.decodeListDM(DM, valueDicts)
	}

	getEmptyLine() {
		const emptyLine = []
		for (var i = 0; i < this.lineLength; i++) {
			emptyLine.push('')
		}
		return emptyLine
	}

	//解码出空位
	seatDecode(dmItem, key) {
		seatDecode[key](dmItem[key], this.headers.length)
	}

	async decodeListDM(dm,dicts) {
		const listData = []

		let lastLineIndexs = [] //上一行的字典索引
		for (const item of dm) {
			let vacancys = []

			if (lastLineIndexs.length === 0) {
				for (const v of item.C) {
					vacancys.push(String(v))
				}
			}

			item.S && this.setHeaders(item.S) //设置表头

			for (const key in seatDecode) {
				if (!item.hasOwnProperty(key)) {
					continue
				}

				const keyVacancys = seatDecode[key](item[key], this.headers.length)
				for (const i in keyVacancys) {
					if(!vacancys.hasOwnProperty(i) || keyVacancys[i]!=='0') {
						vacancys[i] = keyVacancys[i]
					}
				}
			}

			const lineIndexs = this.getEmptyLine() //当前行的字典索引

			let cIndex = 0
			let x=false
			for (const i in vacancys) {
				switch (vacancys[i]){
					case '0':
						//有空位
						lineIndexs[i] = item.C[cIndex++]
						break;
					case '1':
						//复用上一行的数据
						lineIndexs[i] = lastLineIndexs[i]
						break;
					case '-1':
						//空数据
						x = true
						lineIndexs[i] = null
						break;
					default:
						lineIndexs[i] = item.C[cIndex++]
				}
			}
			lastLineIndexs = lineIndexs
			const line = this.dictsDecode(lineIndexs,dicts)
			const mapData = lineToMap(line, this.headerPropertys)

			for (const k in item) {
				if(!knownMDKeys.includes(k)){
					console.debug(item, mapData)
				}
			}
			listData.push(mapData)
		}
		return listData
	}

	//设置表头
	setHeaders(data) {
		this.headers = data
		this.lineLength = this.headers.length
	}

	//字典转码
	dictsDecode(indexs,dicts) {
		const line = Array(this.headers.length)
		for (const i in this.headers) {
			switch (this.headers[i].T) {
				case 1:
					if(typeof indexs[i] === 'number'){
						line[i] = dicts[this.headers[i].DN][indexs[i]]
					}else{
						line[i] = indexs[i]
					}
					break;
				case 7:
					line[i] = indexs[i]
					break;

				default:
					console.log('未知的T', this.headers[i].T)
					break;
			}

		}
		return line
	}
}
