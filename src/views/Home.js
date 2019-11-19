import React from 'react'
import Button from '@material-ui/core/Button'
import classes from './Home.module.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { HotTable } from '@handsontable/react'

const saveAs = window.saveAs

function AddDialog(props) {
    const { state, setState } = props
    const { activeRule, rules, allRules, addDialogVisible } = state

    function RuleItem(item, index) {
        function selectRule(item) {
            setState({
                activeRule: _.cloneDeep(item)
            })
        }
        return (
            <div className={classnames(classes.item, {[classes.active]: item.type === activeRule.type})}
                key={'ruleItem' + index}
                onClick={e => selectRule(item)}>{ item.name }</div>
        )
    }

    function handleInputChange2(name, e, type) {
        if (type === 'number') {
            activeRule.attr[name] = parseInt(e.target.value)
        } else {
            activeRule.attr[name] = e.target.value
        }
        setState({
            activeRule
        })
    }

    function handleDialogClose() {
        setState({
            addDialogVisible: false,
        })
    }

    function handleOk() {
        let rule = _.cloneDeep(activeRule)
        rule.desc = allRules.find(_ => _.type === activeRule.type).getDesc(activeRule.attr)
        rules.push(rule)
        setState({
            addDialogVisible: false,
        })
    }

    return (
        <Dialog onClose={handleDialogClose} open={addDialogVisible}>
            <DialogTitle>添加规则</DialogTitle>
            <DialogContent>
                <div className={classes.addBox}>
                    <div className={classes.left}>
                        <div className={classes.typeList}>
                            {allRules.map(RuleItem)}
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.ruleBox}>
                            <div className={classes.ruleName}>{activeRule.name}</div>
                            <div className={classes.ruleBody}>
                                {activeRule.type === 'prefix' &&
                                    <div>
                                        <TextField
                                            label="文本"
                                            // className={classes.textField}
                                            value={activeRule.attr.text}
                                            onChange={e => handleInputChange2('text', e)}
                                            // margin="normal"
                                        />
                                    </div>
                                }
                                {activeRule.type === 'suffix' &&
                                    <div>
                                        <TextField
                                            label="文本"
                                            // className={classes.textField}
                                            value={activeRule.attr.text}
                                            onChange={e => handleInputChange2('text', e)}
                                            // margin="normal"
                                        />
                                    </div>
                                }
                                {activeRule.type === 'upper' &&
                                    <div>
                                        <div>英文单词全部转成大写</div>
                                    </div>
                                }
                                {activeRule.type === 'lower' &&
                                    <div>
                                        <div>英文单词全部转成小写</div>
                                    </div>
                                }
                                {activeRule.type === 'index' &&
                                    <div>
                                        <div>添加行号</div>
                                        <div>
                                            从
                                            <TextField
                                                className={classes.smInput}
                                                label=""
                                                type="number"
                                                // className={classes.textField}
                                                value={activeRule.attr.initNum}
                                                onChange={e => handleInputChange2('initNum', e, 'number')}
                                                // margin="normal"
                                            />
                                            开始，每次加<TextField
                                                className={classes.smInput}
                                                label=""
                                                type="number"
                                                // className={classes.textField}
                                                value={activeRule.attr.addNum}
                                                onChange={e => handleInputChange2('addNum', e, 'number')}
                                                // margin="normal"
                                            />
                                            不足<TextField
                                                className={classes.smInput}
                                                label=""
                                                type="number"
                                                // className={classes.textField}
                                                value={activeRule.attr.fillNum}
                                                onChange={e => handleInputChange2('fillNum', e, 'number')}
                                                // margin="normal"
                                            />位靠
                                            <Select
                                                value={activeRule.attr.direction}
                                                onChange={e => handleInputChange2('direction', e)}
                                                >
                                                <MenuItem value={'left'}>左</MenuItem>
                                                <MenuItem value={'right'}>右</MenuItem>
                                            </Select>

                                            {/* <select value={activeRule.attr.direction} onChange={e => handleInputChange2('direction', e)}>
                                                <option value="left">左</option>
                                                <option value="right">右</option>
                                            </select> */}
                                            补<TextField
                                            label=""
                                            // className={classes.textField}
                                            value={activeRule.attr.fillText}
                                            onChange={e => handleInputChange2('fillText', e)}
                                            // margin="normal"
                                        />
                                        </div>
                                    </div>
                                }
                                {activeRule.type === 'fill' &&
                                    <div>
                                        <div>
                                            在
                                            <Select
                                                value={activeRule.attr.direction}
                                                onChange={e => handleInputChange2('direction', e)}
                                                >
                                                <MenuItem value={'left'}>左</MenuItem>
                                                <MenuItem value={'right'}>右</MenuItem>
                                            </Select>
                                            边填充
                                            <TextField
                                                label=""
                                                // className={classes.textField}
                                                value={activeRule.attr.text}
                                                onChange={e => handleInputChange2('text', e)}
                                                // margin="normal"
                                            />
                                            至
                                            <TextField
                                                className={classes.smInput}
                                                label=""
                                                type="number"
                                                // className={classes.textField}
                                                value={activeRule.attr.num}
                                                onChange={e => handleInputChange2('num', e, 'number')}
                                                // margin="normal"
                                            />
                                            个字符
                                        </div>
                                    </div>
                                }
                                {activeRule.type === 'remove' &&
                                    <div>
                                        <div>
                                            在
                                            <Select
                                                value={activeRule.attr.direction}
                                                onChange={e => handleInputChange2('direction', e)}
                                                >
                                                <MenuItem value={'left'}>左</MenuItem>
                                                <MenuItem value={'right'}>右</MenuItem>
                                            </Select>
                                            边删除
                                            <TextField
                                                className={classes.smInput}
                                                label=""
                                                type="number"
                                                // className={classes.textField}
                                                value={activeRule.attr.num}
                                                onChange={e => handleInputChange2('num', e, 'number')}
                                                // margin="normal"
                                            />个字符
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    取消
                </Button>
                <Button onClick={handleOk} color="primary">
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default class Home extends React.Component {

    state = {
        tableData: [
            ['', 'Tesla', 'Mercedes', 'Toyota', '', 'Volvo'],
            ['2019', '10', '11', '12', '', '13'],
            ['2020', '20', '11', '14', '', '13'],
            ['2021', '30', '15', '12', '', '13'],
            ['2022', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['2023', '30', '15', '12', '', '13'],
        ],
        //
        text: `1
22
333
4444
Hello
World
This is Cat`,
        result: '',
        formData: {
            prefix: '123',
            suffix: 'aaa',
        },

        addDialogVisible: false,

        count: 0,
        count2: 0,
        open: false,
        teamName: '',
        teamNameA: 'A',
        teamNameB: 'B',
        editTeamName: '',
        rules: [
            // {
            //     type: 'prefix',
            //     attr: {
            //         text: '这是前缀'
            //     }
            // },
            // {
            //     type: 'suffix',
            //     attr: {
            //         text: '这是后缀'
            //     }
            // }
        ],
        allRules: [
            {
                type: 'prefix',
                name: '前缀',
                attr: {
                    text: ''
                },
                getDesc(attr) {
                    return `插入「${attr.text}」作为前缀`
                },
                handler(text, attr) {
                    return attr.text + text
                },
            },
            {
                type: 'suffix',
                name: '后缀',
                attr: {
                    text: ''
                },
                getDesc(attr) {
                    return `插入「${attr.text}」作为后缀`
                },
                handler(text, attr) {
                    return text + attr.text
                },
            },
            {
                type: 'upper',
                name: '大写',
                attr: {
                },
                getDesc(attr) {
                    return `英文大写`
                },
                handler(text, attr) {
                    return text.toUpperCase()
                },
            },
            {
                type: 'lower',
                name: '小写',
                attr: {
                },
                getDesc(attr) {
                    return `英文小写`
                },
                handler(text, attr) {
                    return text.toLowerCase()
                },
            },
            {
                type: 'index',
                name: '行号',
                attr: {
                    initNum: 1,
                    addNum: 1,
                    fillNum: 1,
                    fillText: '0',
                    direction: 'left',
                },
                getDesc(attr) {
                    return `添加行号，从 ${attr.initNum} 开始，每次加 ${attr.addNum}`
                },
                handler(text, attr, index) {
                    console.log('index', index)
                    let num = '' + (attr.initNum + attr.addNum * index)
                    if (attr.direction === 'left') {
                        num = num.padStart(attr.fillNum, attr.fillText)
                    } else {
                        num = num.padEnd(attr.fillNum, attr.fillText)
                    }
                    return num + text.toLowerCase()
                },
            },
            {
                type: 'remove',
                name: '删除',
                attr: {
                    num: 1,
                    direction: 'left',
                },
                getDesc(attr) {
                    let map = {
                        left: '左',
                        right: '右',
                    }
                    return `删除字符，在${map[attr.direction]}边删除${attr.num}个字符`
                },
                handler(text, attr, index) {
                    console.log('index', index)
                    if (text.length <= attr.num) {
                        return ''
                    }
                    return text.substring(attr.num)
                },
            },
            {
                type: 'trim',
                name: '删除首尾空格',
                attr: {
                },
                getDesc(attr) {
                    return `删除首尾空格`
                },
                handler(text, attr) {
                    return text.replace(/^\s+/, '').replace(/\s+$/, '')
                },
            },
            {
                type: 'removeBlank',
                name: '删除空白符',
                attr: {
                },
                getDesc(attr) {
                    return `删除空白符`
                },
                handler(text, attr) {
                    return text.replace(/\s+/g, '')
                },
            },
            {
                type: 'fill',
                name: '填充',
                attr: {
                    text: '#',
                    num: 20,
                    direction: 'left',
                },
                getDesc(attr) {
                    let map = {
                        left: '左',
                        right: '右',
                    }
                    return `在${map[attr.direction]}边填充「${attr.text}」 ${attr.num} 个字符`
                },
                handler(text, attr, index) {
                    if (attr.direction === 'left') {
                        return text.padStart(attr.num, attr.text)
                    } else {
                        return text.padEnd(attr.num, attr.text)
                    }
                },
            },
        ],
        activeRule: {
            type: 'prefix',
            name: '前缀',
            attr: {
                text: '123'
            }
        }
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // var data = [
        //     ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
        //     ['2017', 10, 11, 12, 13],
        //     ['2018', 20, 11, 14, 13],
        //     ['2019', 30, 15, 12, 13]
        //   ];

        //   var container = document.getElementById('example');
        //   var hot = new window.Handsontable(container, {
        //     data: data,
        //     rowHeaders: true,
        //     colHeaders: true,
        //     filters: true,
        //     dropdownMenu: true,
        //     key: 'non-commercial-and-evaluation',
        //   })
    }

    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        const { tableData, text, result, formData, rules, allRules, activeRule, addDialogVisible } = state


        let dealedResult = text.split('\n').filter(item => item).map((item, index) => {
            let itemResult = item

            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i]
                itemResult = allRules.find(_ => _.type === rule.type).handler(itemResult, rule.attr, index)
            }
            // if (formData.prefix) {
            //     itemResult = formData.prefix + itemResult
            // }
            // if (formData.suffix) {
            //     itemResult = itemResult + formData.suffix
            // }

            return itemResult
        }).join('\n')

        function handerTextChange(e) {
            console.log('value', e.target.value)
            setState({
                text: e.target.value
            })
        }

        function handleInputChange(name, event) {
            console.log('handleChange', name, event.target.value)
            formData[name] = event.target.value
            setState({
                formData
            })
        }

        function addRule() {
            setState({
                addDialogVisible: true,
                activeRule: _.cloneDeep(allRules[0])
            })
        }

        function Rules() {

            function RuleItem(item, index) {

                function getTypeName(type) {
                    let map = {
                        prefix: '前缀',
                        suffix: '后缀',
                    }
                    return map[type]
                }

                function getDesc(item) {
                    let { type, attr } = item
                    if (type === 'prefix') {
                        return `插入「${attr.text}」作为前缀`
                    }
                    if (type === 'suffix') {
                        return `插入「${attr.text}」作为后缀`
                    }
                    return '--'
                }

                function removeItem(item, index) {
                    rules.splice(index, 1)
                    setState({
                        rules,
                    })
                }

                return (
                    <tr key={'tableItem' + index}>
                        <td>{ index + 1 }</td>
                        <td>{ item.name }</td>
                        <td>{ item.desc }</td>
                        <td>
                            <a href="javascript:;" onClick={e => removeItem(item, index)}>删除</a>
                        </td>
                    </tr>
                )
            }

            return (
                <div>


                    <div className={classes.sectionTitle}>规则</div>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>规则</th>
                                <th>说明</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rules.map(RuleItem)}
                        </tbody>
                    </table>
                </div>
            )
        }

        console.log('tableData', tableData)

        function test() {
            console.log('tableData', tableData)
            tableData[0][0] = '这是什么'
            setState({
                tableData,
            })
        }

        function importData() {
            let file = document.getElementById('file').files[0]
            let reader = new FileReader()
            reader.onload = e => {
                let content = e.target.result
                let data = []
                let rowDatas = content.split('\n')
                rowDatas.forEach(rowData => {
                    data.push(rowData.split(','))
                })
                setState({
                    tableData: data
                })
                // this.data = data
                // this.tableEditor.loadData(this.data)
            }
            reader.readAsText(file, 'utf-8')
        }

        function exportData() {
            let content = tableData.map(item => item.join(', ')).join('\n')
            let blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
            saveAs(blob, 'tableex.yunser.com.csv')
        }

        function sort() {
            console.log('tableData', tableData)
            function sort(table) {
                return table.sort((a, b) => {
                    console.log('a[0]', a[0])
                    return ('' + a[0]).localeCompare('' + b[0])
                })
            }
            let newTableData = sort(tableData)
            // console.log('result', sort(this.data))
            // this.setData()
            setState({
                tableData: newTableData,
            })
        }

        function sort2() {
            console.log('tableData', tableData)
            function sort(table) {
                return table.sort((a, b) => {
                    console.log('a[0]', a[0])
                    return -1 * ('' + a[0]).localeCompare('' + b[0])
                })
            }
            let newTableData = sort(tableData)
            // console.log('result', sort(this.data))
            // this.setData()
            setState({
                tableData: newTableData,
            })
        }

        function sort3() {
            console.log('tableData', tableData)
            function sort(table) {
                return table.sort((a, b) => {
                    return 1 * ('' + a[1]).localeCompare('' + b[1])
                })
            }
            let newTableData = sort(tableData)
            // console.log('result', sort(this.data))
            // this.setData()
            setState({
                tableData: newTableData,
            })
        }

        function removeFirst() {
            tableData.splice(0, 1)
            setState({
                tableData,
            })
        }

        function removeBlankRow() {
            let newTableData = tableData.filter((item, index) => {
                return item.join('') !== ''
            })
            setState({
                tableData: newTableData,
            })
        }

        function removeBlankCol() {
            let blankArr = []
            for (let i = 0; i < tableData[0].length; i++) {
                blankArr[i] = true
            }
            for (let row = 0; row < tableData.length; row++) {
                for (let col = 0; col < tableData[row].length; col++) {
                    if (tableData[row][col]) {
                        blankArr[col]  = false
                    }
                }
            }
            let newTableData = tableData.map((item, index) => {
                return item.filter((item, index) => {
                    return !blankArr[index]
                })
            })
            setState({
                tableData: newTableData,
            })
        }

        function removeCol() {
            let newTableData = tableData.map((item, index) => {
                return item.splice(0, 1)
            })
            setState({
                tableData: newTableData,
            })
        }

        function removeCol2() {
            let newTableData = tableData.map((item, index) => {
                return item.filter((item, index) => {
                    return index !== 0 && index !== 2
                })
            })
            setState({
                tableData: newTableData,
            })
        }

        function remove2() {
            let newTableData = tableData.filter((item, index) => {
                return index !== 0 && index !== 2
            })
            setState({
                tableData: newTableData,
            })
        }

        function remove8() {
            let newTableData = tableData.filter((item, index) => {
                return item[1]
            })
            setState({
                tableData: newTableData,
            })
        }

        function remove9() {
            let newTableData = tableData.filter((item, index) => {
                return item[2] !== '11'
            })
            setState({
                tableData: newTableData,
            })
        }

        function view9() {
            let newTableData = tableData.filter((item, index) => {
                return item[2] === '11'
            })
            setState({
                tableData: newTableData,
            })
        }

        let randomArr = [12, 8, 20, 9, 14, 13, 10, 1, 6, 23, 5, 22, 4, 7, 18, 17, 24, 15, 3, 16, 11, 2, 19, 21]
        console.log('time', randomArr[new Date().getHours()])

        return (
            <Page title="表格+" menu={[
                // {
                //     label: '重置',
                //     click() {
                //         setState({
                //             // count: 0,
                //             // count2: 0,
                //             // teamNameA: 'A',
                //             // teamNameB: 'B',
                //         })
                //     }
                // },
            ]}>
                <div className={classes.container}>
                    <div class="common-container container">
                        <div id="example"></div>
                        <HotTable data={tableData} licenseKey="non-commercial-and-evaluation" colHeaders={true} rowHeaders={true} width="600" height="300" />
                    </div>
                    <input className={classes.btn} id="file" type="file" variant="contained" />
                    <Button className={classes.btn} variant="contained" onClick={importData}>导入 CSV</Button>
                    <Button className={classes.btn} variant="contained" onClick={exportData}>导出 CSV</Button>
                    {/* <Button className={classes.btn} variant="contained" onClick={test}>测试</Button> */}
                    <div className={classes.sectionHeader}>过滤</div>
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={view9}>第三列为11</Button>
                    </div>

                    <div className={classes.sectionHeader}>排序</div>
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={sort}>排序</Button>
                        <Button className={classes.btn} variant="contained" onClick={sort2}>倒序排序</Button>
                        <Button className={classes.btn} variant="contained" onClick={sort3}>根据第二列排序</Button>
                    </div>

                    <div className={classes.sectionHeader}>统计</div>
                    <div className={classes.actions}>
                    </div>

                    <div className={classes.sectionHeader}>分组</div>
                    <div className={classes.actions}>
                    </div>

                    <div className={classes.sectionHeader}>操作</div>
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={removeFirst}>还原</Button>
                    </div>

                    <div className={classes.sectionHeader}>删除行</div>
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={removeFirst}>删除第一行</Button>
                        <Button className={classes.btn} variant="contained" onClick={remove2}>删除第一行和第三行</Button>
                        <Button className={classes.btn} variant="contained" onClick={removeBlankRow}>删除空行</Button>
                        <Button className={classes.btn} variant="contained" onClick={remove8}>删除第二列为空的行</Button>
                        <Button className={classes.btn} variant="contained" onClick={remove9}>删除第三列为11的行</Button>
                    </div>

                    <div className={classes.sectionHeader}>删除列</div>
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={removeCol2}>删除第一列和第三列</Button>
                        <Button className={classes.btn} variant="contained" onClick={removeCol}>删除第一列</Button>
                        <Button className={classes.btn} variant="contained" onClick={removeBlankCol}>删除空列</Button>
                    </div>

                    {/* <Rules /> */}

{/*
                    <br />

                    <br />
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={addRule}>添加规则</Button>
                    </div> */}
                    {/* <textarea className={classes.textarea} value={dealedResult} placeholder="结果" /> */}
                    {/* <Button className={classes.btn} variant="contained" onClick={reset}>重置</Button> */}
                    {/* <Button className={classes.btn} variant="contained" onClick={record}>记录</Button> */}
                    {/* <AddDialog {
                        ...{
                            state,
                            setState
                        }
                    } /> */}

                </div>
            </Page>
        )
    }
}

