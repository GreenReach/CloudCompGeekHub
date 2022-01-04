import React, { Component } from 'react';


class Test extends React.Component {
    state = {
        count: 0,
        tags: ['a','b','c','d']
    };

    styles = {
        fontSize : 10,
        fontWeight: "bold"
    };

    render() {
        return (
            <div>
                <p style={this.styles}>Olla from Test</p>
                <p style={{fontSize:30}}>{this.state.count}</p>

                <p>{this.testFun()}</p>

                {this.state.tags.length > 0 && <p>There are some tags</p>}
                <ul>
                    {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>

                <button onClick={() => this.clickEvent(5)}>My button</button>
            </div>
        );
    }

    clickEvent = (x) => {
        //when button is pressed this happens
        this.state.count+=x;
        this.setState({ count: this.state.count})
    }

    testFun(){
        return this.state.count ===0 ? 'Zero' : 'More than 0';
    }
}

export default Test;