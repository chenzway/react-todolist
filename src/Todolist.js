import React, { Component } from 'react';
import { Input, Tabs, message } from 'antd';
import dayjs from 'dayjs';
import './Todolist.css';
import Item from './Item';

const { TabPane } = Tabs;

export default class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsKey: '1',
      inputVal: '',
      list: JSON.parse(localStorage.getItem('list')) || []
    };
  }

  // 随机生成 ID
  generateId() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  // input 双向绑定
  handleChange = e => {
    this.setState({
      inputVal: e.target.value
    });
  };

  // 添加回车事件
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      if (!this.state.inputVal) {
        message.error('请输入内容！');
      }
      this.handleAddItem();
    }
  };

  // 添加数据
  handleAddItem() {
    const item = {
      id: this.generateId(),
      item: this.state.inputVal,
      finshed: false,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };

    // setState 使用回调函数的方式
    this.setState(preState => {
      localStorage.setItem('list', JSON.stringify([...preState.list, item]));
      return {
        inputVal: '',
        tabsKey: '1',
        list: [...preState.list, item]
      };
    });
    console.log(this.state);
  }

  // 开关事件切换是否完成
  handleSwitchChange(id) {
    let tmpList = this.state.list;
    tmpList.find(v => {
      if (v.id === id) {
        v.finshed = !v.finshed;
      }
      return false;
    });
    this.setState({ list: tmpList });
    localStorage.setItem('list', JSON.stringify(tmpList));
  }

  // 根据 ID 删除所选的数据
  handleDelete(id) {
    let tmpList = this.state.list;
    let index = tmpList.findIndex(v => {
      return v.id === id;
    });
    tmpList.splice(index, 1);
    this.setState({ todolists: tmpList });
    localStorage.setItem('list', JSON.stringify(tmpList));
    message.success('删除成功！');
  }

  render() {
    let list = this.state.list;
    let done = list.filter(v => v.finshed);
    let todo = list.filter(v => !v.finshed);
    return (
      <div className='Todolist'>
        <h1 className=''>TodoList</h1>
        <Input placeholder='请添加待办事项(回车添加)' value={this.state.inputVal} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
        
        <Tabs defaultActiveKey={this.state.tabsKey}>
          <TabPane tab={`All(${list.length})`} key='1'>
            <Item list={list} onSwitchChange={id => this.handleSwitchChange(id)} onDelete={id => this.handleDelete(id)} />
          </TabPane>
          <TabPane tab={`Todo(${todo.length})`} key='2'>
            <Item list={todo} onSwitchChange={id => this.handleSwitchChange(id)} onDelete={id => this.handleDelete(id)} />
          </TabPane>
          <TabPane tab={`Done(${done.length})`} key='3'>
            <Item list={done} onSwitchChange={id => this.handleSwitchChange(id)} onDelete={id => this.handleDelete(id)} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
