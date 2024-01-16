import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API;
  pagesize=6;
  state={
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/" country="in" category="general"/>}/>
        <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/general" country="in" category="general"/>}/>
        <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/sports" country="in" category="sports"/>}/>
        <Route exact path="/bussiness" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/bussiness" country="in" category="bussiness"/>}/>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/entertainment" country="in" category="entertainment"/>}/>
        <Route exact path="/health"element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/health" country="in" category="health"/>}/>
        <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/science" country="in" category="science"/>}/>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey}  pagesize={this.pagesize} key="/technology" country="in" category="technology"/>}/>        
      </Routes>
      </Router>
      </div>
    )
  }
}
