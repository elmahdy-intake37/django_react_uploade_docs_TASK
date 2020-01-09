import React, { Component } from 'react';
import './App.css';
import NavComponent from './Components/NavComponent';
import DocComponent from './Components/document/DocComponent';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const base_url = window.SERVER_ADDRESS

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			 logged_in : cookies.get('token') ? true : false,
			 username : '',
			 displayed_form : '',
			 data: ''
		}
	}

	componentDidMount(){
		console.log(cookies.get('token'))
		if(this.state.logged_in){
			console.log(cookies.get('token'))
			fetch(base_url + 'api/v1/document', {
				method : 'GET',
				headers : {
					Authorization : `Token ${cookies.get('token')}`
				}
			})
			.then(res => res.json())
			.then(resp => {
				const docs = resp.results.map(obj => ({id: obj.id,
					title: obj.title, terms: obj.terms, document_path:obj.document_path}));
			 	this.setState({ data: docs })
				})
			.catch(err => console.log(err));
		}
	}

	display_form = (formName) => {
        this.setState({
            displayed_form : formName
        });
    }

	handleLoginChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
	}

	handleLogout = () => {
		cookies.remove('token');
		this.setState({logged_in : false, username : ''})
	}

	handleLogin = (e, data) => {
		e.preventDefault();
		console.log(data)
		fetch(base_url + 'api/v1/auth/login', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			cookies.set('token', json.auth_token);
			cookies.set('users', json.users);
			this.setState({
				logged_in : true,
				username : json.username
			})
		})
		.catch(error => {
			console.log(error)
		})
		this.setState({
			displayed_form : ''
		})
	}

	render() {
		const {data, logged_in, username, displayed_form } = this.state;
		return (
			<div>
				<NavComponent
				logged_in = {logged_in}
				handleLogin = {this.handleLogin}
				handleLoginChange = {this.handleLoginChange}
				handleLogout = {this.handleLogout}
				username = {username}
				displayed_form = {displayed_form}
				display_form = {this.display_form}
				 />
				<h3>{
					this.state.logged_in
					? <DocComponent
					data={data} />
					: 'Please log in'
				}</h3>
			</div>
		)
	}
}

export default App;
