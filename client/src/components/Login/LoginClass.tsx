import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'

export default class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false,
            address: ""
        }
    }
}