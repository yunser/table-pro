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
    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        const { text, result, formData, rules, allRules, activeRule, addDialogVisible } = state


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
                        <textarea className={classes.textarea} value={text} onChange={handerTextChange} placeholder="输入要处理的文本，逐行处理" />
                    </div>
                    <Rules />


                    <br />

                    <br />
                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={addRule}>添加规则</Button>
                    </div>
                    <textarea className={classes.textarea} value={dealedResult} placeholder="结果" />
                    {/* <Button className={classes.btn} variant="contained" onClick={reset}>重置</Button> */}
                    {/* <Button className={classes.btn} variant="contained" onClick={record}>记录</Button> */}
                    <AddDialog {
                        ...{
                            state,
                            setState
                        }
                    } />

                </div>
            </Page>
        )
    }
}

