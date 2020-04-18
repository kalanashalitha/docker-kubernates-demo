import React from 'react';
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {name : props.name};
    }
    render() {
        return (<div>aaaaaaaaaaaaaaaaaaaaaaaaaa
    Name : <input type="text" value={this.state.name} /><br />
            <button>save</button>
        </div>);
    }
}

export default LoginForm;