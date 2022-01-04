import React, { Component } from 'react';


class ContentInfo extends React.Component {

    state = {
        title: "title",
        description: "desc",
        test: null

    }

    render() {
        return (
            <div>
                Test
                <div>{this.state.test}</div>
            </div>
        );
    }

    componentDidMount() {
        const testId = '61d3abf24d64a2c1202c9b8a';
        fetch('http://127.0.0.1:5000/contentInfo?id=61d3abf24d64a2c1202c9b8a')
            .then(response => response.json())
            .then(data => {
                const result =JSON.parse(data)
                this.setState({ test: result["title"] })
            });

    }
}

export default ContentInfo;