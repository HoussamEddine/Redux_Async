import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import glamorous from "glamorous";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from 'react-redux';
import ReduxThunk from "redux-thunk";
import 'babel-polyfill';

// Components 
import Input from "./components/Input.component";
import User from "./components/User.component";

// reducers
import globalReducer from './components/reducers/reducers';

// actions 
import { simpleAction, fetchingData } from './components/actions/actions';


const store = createStore(globalReducer, applyMiddleware(ReduxThunk));

const Section = glamorous.section({
	display: "flex",
	justifyContent: "center",
	flexWrap: "wrap",
	width: "80vw",
	marginTop: "10%",
	padding: "50px",
	background: "linear-gradient(to right, #f3f3f3 0%, #f1f1f1 100%)",
	boxShadow: "0px 2px 10px 0px #999"

});


class App extends React.Component {
	constructor() {
		super();
		this.changeHandler = this.changeHandler.bind(this);
		this.getValue = this.getValue.bind(this);
	}
	getValue(ip) {
		this.inputValue = ip.trim();
	}
	changeHandler() {
		const getu = async () => {
			this.props.isError(false);
			await this.props.getUserData(this.inputValue);
			if (this.inputValue !== "undefined" && this.inputValue !== "") {
				if (this.props.error.isError) {
					this.props.isDataReady(false);
				} else {
					this.props.isDataReady(true);
					this.props.isError(false);
				}
			}
			else {
				this.props.isDataReady(false);
				this.props.isError(false);
			}
			if (this.props.error.isError) {
				this.props.isDataReady(false);
			}
		}
		getu()
	}

	render() {
		const userData = this.props.data;
		const data = {
			url: userData.avatar_url,
			alt: userData.gravatar_id,
			followers: userData.followers,
			following: userData.following,
			publicRepos: userData.public_repos,
			company: userData.company
		}
		const text = this.props.error.isError ? "USER NOT FOUND" : "TYPE A GITHUB USER";
		return (
			<Section>
				<Input changeHandler={this.changeHandler} callbackParent={(input) => this.getValue(input)} />
				<User dataReady={this.props.dataReady} text={text} {...data} />
			</Section>
		);
	}
}
App.propTypes = {
	dataReady: PropTypes.bool,
	error: PropTypes.shape({
		isError: PropTypes.bool,
		message: PropTypes.string
	}),
	getUserData: PropTypes.func,
	isDataReady: PropTypes.func,
	isError: PropTypes.func,
	data: PropTypes.shape({
		url: PropTypes.string,
		alt: PropTypes.string,
		followers: PropTypes.number,
		following: PropTypes.number,
		publicRepos: PropTypes.string,
		company: PropTypes.string
	})
}
const mapStateToProps = (state) => (
	{
		dataReady: state.dataReady,
		error: state.error,
		data: state.data
	}
);
const mapDispatchToProps = (dispatch) => (
	{
		getUserData: (user) => dispatch(fetchingData(user)),
		isDataReady: (isReady) => dispatch(simpleAction("DATA_READY", isReady)),
		isError: (isError) => dispatch(simpleAction("ERROR", isError))

	}

);

App = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>
	, document.getElementById("root"));