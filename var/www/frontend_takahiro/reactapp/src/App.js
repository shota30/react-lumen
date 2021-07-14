import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
//import { forwardRef } from 'react/cjs/react.development';

//開いたら呼び出される関数
function App() {
  //表示される部分
  return (
    <div className="App">
        <Textbox />
    </div>
  );
}
//Textboxの動き
class Textbox extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',comment:'',password:'',info:[],tasks:[]
    };
    //bindを使うことで、どのthisかを指定する。
    this.handleChange=this.handleChange.bind(this);
    this.handleComment=this.handleComment.bind(this);
    this.handlePass=this.handlePass.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    //Stateを新しくsetする、nameを切り替える、event.target.value=handleChangeを呼び出しているところで実行する
    this.setState({name:event.target.value});
  }
  handleComment(event){
    this.setState({comment:event.target.value});
  }
  handlePass(event){
    this.setState({password:event.target.value});
  }
  handleSubmit(event){
    this.setState({data:this.state.info.concat("名前："+this.state.name,"コメント："+this.state.comment)})

    //alert("投稿されました");
    event.preventDefault();//ページの更新を防ぐ

    axios
      .get('http://localhost:8080/api/v1/tests')
      .then(results => {
        const data = results.data;
        console.log(data);
        this.setState({
          tasks: [...data]
        });
      });
  }
  //classが表示される部分
  render(){
    const tasks = this.state.tasks.map(task => {
      return <li key={task.id}>{task.title}</li>;
    });
    return(
      <Fragment>
      <div>
        <form onSubmit={this.handleSubmit}>
          <br/>
          <span className="user">投稿フォーム</span><br/>
          名前<br/>
          <input type="text" value={this.state.name} onChange={this.handleChange}/><br/>
          コメント<br/>
          <input type="text" value={this.state.comment} onChange={this.handleComment}/><br/>
          パスワード<br/>
          <input type="text" value={this.state.password} onChange={this.handlePass}/><br/>
          <input type="submit" value={"送信"}/>
          <br/><br/>
          {this.state.info.map((nameinfo)=>(<a>{nameinfo}<br/></a>))}<br/>
        </form>
        <ul>
            {tasks}
        </ul>
      </div>
      </Fragment>
    );
  }
}
//他のファイルでもAppとして使えるためにexportしておく
export default App;
