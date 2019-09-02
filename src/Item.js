/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Switch, Tag, Popconfirm } from 'antd';

class Item extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  handleSwitchChange(id) {
    this.props.onSwitchChange(id);
  }

  handleDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const list = this.props.list;
    return (
      <div>
        {list.map((v, k) => {
          return (
            <div key={k} className='list'>
              <div className='item item-left'>
                <Switch defaultChecked={v.finshed} onChange={() => this.handleSwitchChange(v.id)} style={{ marginRight: '20px' }} /> <span style={v.finshed ? { textDecoration: 'line-through' } : {}}>{v.item}</span>
              </div>
              <div className='item item-right'>
                <Tag color={v.finshed ? 'blue' : ''}>{v.date}</Tag>
                <Popconfirm title='Are you sure delete this task?' onConfirm={() => this.handleDelete(v.id)} okText='Yes' cancelText='No'>
                  <Tag color='#f50'>
                    <a href='#'>Delete</a>
                  </Tag>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Item;
