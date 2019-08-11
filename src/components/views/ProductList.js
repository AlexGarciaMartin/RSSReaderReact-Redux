import React, { Component } from 'react';
import { Button, Glyphicon, FormControl, Form, InputGroup} from 'react-bootstrap';
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import * as uiActionCreators from '../../store/ui';
import * as RSSParser from 'rss-parser';

const styles = {
  products: {
    display: 'flex',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  product: {
    width: '220px',
    marginLeft: 10,
    marginRight: 10
  }
};

let parser = new RSSParser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class ProductList extends Component {
  constructor() {
    super();
    this.addToRSS = this.addToRSS.bind(this);

    this.state = {
      rssPages: [],
      newsPanel: []
    }
  }

  render() {
    return (
      <div className="container">
        <span>Añade una URL</span>
        <form onSubmit={e=> {e.preventDefault()}}>
        <input
        type="text" 
        value={this.state.rssPages}  
        onChange={this.onChangeText} />
        <input
        type="button"
        value="+"
        onClick={() => this.addToRSS()}/>
        <div>
        <span>RSS en la Store añadidos</span>
        {/* {this.props.rssPages.map((item) => (
        <div>{item}</div>
        ))} */}
        <div id="myDiv">
        {this.state.newsPanel}
        </div>
        </div>
        </form>
      </div>
    );
  }

  addToRSS() {
     this.props.addRss(this.state.rssPages)
     let feed = parser.parseURL(CORS_PROXY + this.state.rssPages,  (err,feed) => { 
       feed !== undefined ?
      feed.items.map((entry) => {
        console.log(entry)
        console.log(this.state.newsPanel)
        this.setState({newsPanelNumber: this.state.newsPanel.push(<div><h4>{entry.title}</h4><a href={entry.link}>{entry.link}</a></div>)})
      }) : ''
    })
    return feed;
  }
  onChangeText = event => {
    this.setState({rssPages: event.target.value})
  }
}

export default connect(state=>({...state.uiState}),
    dispatch=>bindActionCreators(({...uiActionCreators.actionCreators}), dispatch))(ProductList)