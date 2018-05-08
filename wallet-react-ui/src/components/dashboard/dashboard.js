import React, { Component } from 'react'
import {SideMenu} from './sidemenu';
import {observer, inject} from 'mobx-react';

@inject('accountStore')
@observer
export class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    render() {
      return (
        <div>
          {this.state.loading ? null: <SideMenu />}
        </div>
      )
    }
  }