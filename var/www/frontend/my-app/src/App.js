import './App.css';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
//import ReactDOM from 'react-dom';

function App() {
    return (
        <div className="App">
            <InputForm />
        </div>
    );
}

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            name: '',
            comment: '',
            password: '',
            tasks: []
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeComment(event) {
        this.setState({ comment: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        this.setState({
            data: this.state.info.concat("名前：" + this.state.name,
                "コメント：" + this.state.comment)
        });
        event.preventDefault();

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

    render() {
        const tasks = this.state.tasks.map(task => {
            return <li key={task.id}>{task.title}</li>;
        });
        return (
            <Fragment>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h2>【入力フォーム】</h2>
                        <p className="title2">
                            名前
                </p>
                        <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                        <br />

                        <p className="title2">
                            コメント
                </p>
                        <input type="text" value={this.state.comment} onChange={this.handleChangeComment} />
                        <br />

                        <p className="title2">
                            パスワード
                </p>
                        <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                        <br />

                        <input type="submit" value="送信" />
                    </form>
                    {this.state.info.map((name) => (<span>{name}<br /></span>))}
                    <ul>
                        {tasks}
                    </ul>
                </div>
            </Fragment>
        );
    }
}
export default App;

