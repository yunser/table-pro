import React, { Component } from 'react'
// import classes from './Renamer.module.less'
// import './Renamer.module.scss'
import classes from './Renamer.module.scss'
import Button from '@material-ui/core/Button'
// import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

function Modal(props) {
    return (
        <div className={classes.modal}>
            {props.children}
        </div>
    )
}
// className={classes\.([^}]+)}
// className="$1"

// className="(.+)"
// className={classes.$1}

function fileUseFilter(files, rule) {
    return files.map(_item => {
        let item = {
            ..._item
        }

        if (!_item.enable) {
            return item
        }

        console.log('item', item)
        console.log('rule', rule)

        let fileName = item.name
        let idx = fileName.indexOf('.')
        let simpleName = fileName.substring(0, idx)
        let ext = fileName.substring(idx + 1, fileName.length)
        console.log('asd', simpleName, ext)
        let attr = rule.attr
        if (rule.type === 'insert') {
            let { text, position, ignoreExtension } = attr
            if (position === 'start') {
                item.name = text + fileName
                return item
            }
            if (position === 'end') {
                if (ignoreExtension) {
                    item.name = fileName + text
                    return item
                } else {
                    item.name = simpleName + text + '.' + ext
                    return item
                }
            }
        }
        if (rule.type === 'fill') {
            let { length, text } = attr
            if (fileName.length < length) {
                item.name = fileName.padStart(length, text)
                return item
            }
            return item
        }
        if (rule.type === 'case') {
            // console
            item.name = simpleName.toUpperCase() + '.' + ext
            return item
        }
        return item
    })
}





function rename(files, rules) {
    let result = files
    for (let rule of rules) {
        if (rule.enable) {
            result = fileUseFilter(result, rule)
            console.log('result', result)
        }
    }
    return result
}

function getDescription(rule) {
    if (rule.type === 'insert') {
        return `插入“${rule.attr.text}”作为前缀`
    }

    // {
    //     type: 'insert',
    //     name: '插入',
    //     description: '插入“2019_”作为前缀',
    //     attr: {
    //         text: '2019_',
    //         position: 'start', // start end
    //         ignoreExtension: false
    //     },
    //     enable: true
    // },
    if (rule.type === 'fill') {
        return `用字符“${rule.attr.text}”来添加文本，填充长度${rule.attr.length}，左侧，忽略拓展名`
    }
    if (rule.type === 'case') {
        return '每个单词大写（忽略拓展名），拓展名小写'
    }
    // {
    //     type: 'case',
    //     name: '大小写',
    //     description: '每个单词大写（忽略拓展名），拓展名小写',
    //     attr: {
    //         text: 'yunser_',
    //     }
    // },
}
// console.log('classes', classes)
class About extends Component {

    state = {
        ruleModalVisible: false,
        ruleForm: {},
        ruleEditIndex: 0,
        rules: [
            {
                type: 'insert',
                name: '插入',
                description: '插入“2019_”作为前缀',
                attr: {
                    text: '2019_',
                    position: 'start', // start end
                    ignoreExtension: false
                },
                enable: true
            },
            {
                type: 'fill',
                name: '填充',
                description: '规则2',
                attr: {
                    length: 10,
                    text: '-',
                },
                enable: false
            },
            {
                type: 'case',
                name: '大小写',
                description: '每个单词大写（忽略拓展名），拓展名小写',
                attr: {
                    text: 'yunser_',
                },
                enable: false
            },
        ]
    }

    render() {
        let setState = data => {
            this.setState(data)
        }

        let { ruleModalVisible, ruleForm, ruleEditIndex, rules } = this.state

        const files = [
            {
                enable: true,
                name: '1.png',
            },
            {
                enable: true,
                name: '1.TXT',
            },
            {
                enable: true,
                name: '1.zip',
            },
            {
                enable: true,
                name: '2.txt',
            },
            {
                enable: true,
                name: '2.zip',
            },
            {
                enable: false,
                name: '3.txt',
            },
        ]
        let renamedFiles = rename(files, rules)
        console.log('renamedFiles', renamedFiles)

        const types = [
            {
                name: '插入',
                value: 'insert',
            },
            {
                name: '删除',
                value: 'remove',
            },
            {
                name: '替换',
                value: 'replace',
            },
            {
                name: '拓展名',
                value: 'ext',
            },
            {
                name: '大小写',
                value: 'case',
            },
            {
                name: '随机',
                value: 'random',
            },
            {
                name: '随机',
                value: 'random',
            },
            {
                name: '填充',
                value: 'fill',
            },

        ]

        function editRule(item, index) {
            setState({
                ruleModalVisible: true,
                ruleForm: item,
                ruleEditIndex: index
            })
        }

        function removeRule(item, index) {
            console.log('删除', rules)
            rules.splice(index, 1)
            setState({
                rules,
            })
        }



        function RuleItem(item, index) {
            return (
                <tr key={index}>
                    <td>
                        <Checkbox
                            checked={item.enable}
                            // onChange={handleChange('checkedA')}
                            value=""
                        />
                        {index + 1}
                    </td>
                    <td>{item.name}</td>
                    <td>{getDescription(item)}</td>
                    <td>
                        <a onClick={e => editRule(item, index)}>编辑</a>
                        <a onClick={e => removeRule(item, index)}>删除</a>
                    </td>
                </tr>
                // <div className={classes.item} key={index}>{item}</div>
            )
        }

        function RuleList() {
            return (
                <div className={classes.ruleList}>
                    <div>
                        添加
                        移除
                        上移
                        下移
                    </div>
                     <table className={classes.table}>
                        <tr>
                            <th>#</th>
                            <th>规则</th>
                            <th>说明</th>
                            <th>操作</th>
                        </tr>
                        {rules.map(RuleItem)}
                    </table>

                </div>
            )
        }

        function FileItem(item, index) {
            return (
                <tr className={classes.item} key={index}>
                    <td>
                        <Checkbox
                            checked={item.enable}
                            // onChange={handleChange('checkedA')}
                            value=""
                        />
                        {item.enable ? 'ok' : 'notOk'}
                        {index + 1}
                    </td>
                    <td>{files[index].name}</td>
                    <td>{item.name}</td>
                </tr>
            )
        }
        function FileList() {
            console.log('files', files)
            return (
                <div className={classes.fileList}>
                    <table className={classes.table}>
                        <tr>
                            <th>#</th>
                            <th>名称</th>
                            <th>新名称</th>
                        </tr>
                        {renamedFiles.map(FileItem)}
                    </table>
                </div>
            )
        }

        function TypeItem(item, index) {
            return (
                <div className={classes.item}>
                    {item.name}
                </div>
            )
        }
        function RuleModal() {
            return (
                <div className={classes.ruleModal}>
                    {types.map(TypeItem)}
                </div>
            )
        }

        function onRuleModalClose() {
            setState({
                ruleModalVisible: false
            })
        }

        function handleChange(name, event) {
            console.log('handleChange', name, event.target.value)
            ruleForm.attr[name] = event.target.value
            setState({
                ruleForm
            })
        }

        function closeRuleModal() {
            setState({
                ruleModalVisible: false,
            })
        }

        function ruleModalOk() {
            // ruleEditIndex: index
            rules[ruleEditIndex].attr = ruleForm.attr
            console.log('编辑', rules[ruleEditIndex].attr, ruleForm.attr)
            console.log('rules', rules)
            setState({
                rules,
                ruleModalVisible: false,
            })
        }

        return (
            <div>
                <div className={classes.file}>

                </div>

                <RuleList />
                <FileList />
                <RuleModal />
                <a href="https://project.yunser.com/products/d20e4300d2be11e9a6b1b7d4e5355289" target="_blank">帮助</a>
                <Button className={classes.btn} variant="contained" color="primary">测试</Button>
                {ruleModalVisible &&
                    <Modal
                        open={true}
                        // onClose={onRuleModalClose}
                    >
                        {
                            ruleForm.type === 'insert' &&
                                <TextField
                                    label="插入"
                                    className={classes.textField}
                                    value={ruleForm.attr.text}
                                    onChange={e => handleChange('text', e)}
                                    margin="normal"
                                />
                        }
                        {
                            ruleForm.type === 'fill' &&
                                <TextField
                                    label="填充"
                                    className={classes.textField}
                                    value={ruleForm.attr.text}
                                    onChange={e => handleChange('text', e)}
                                    margin="normal"
                                />
                        }
                        <div>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={ruleModalOk}>确认</Button>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={closeRuleModal}>关闭</Button>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default About
