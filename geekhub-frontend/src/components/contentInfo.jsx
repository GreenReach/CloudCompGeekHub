import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ContentInfo extends React.Component {
    state = {
        item: [],
        dataIsLoaded: false,
        redirect: false
    }

    deleteContent = () => {
        //TODO check if it is the owner
        var formdata = new FormData();
        formdata.append("id", this.state.item["_id"]["$oid"]);
        const requestOptions = {
            method: "DELETE",
            body: formdata
        }

        fetch('http://127.0.0.1:5000/contentInfo', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        
        // TODO: Still needs work, dosen't refresh the contentList
        //this.setState({ redirect: true })
    }


    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        let contentId = queryParams.get("id")

        fetch('http://127.0.0.1:5000/contentInfo?id=' + contentId)
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data["item"]);
                this.setState({
                    item: result,
                    dataIsLoaded: true
                });

            });

    }

    render() {
        if (!this.state.dataIsLoaded)
            return <div>Loading...</div>;

        return (
            <div>
                <h1>{this.state.item['title']} </h1>
                <h4>Type: {this.state.item['contentType']}</h4>
                <p>Tags: {this.state.item['tags']}</p>
                <p>{this.state.item['description']}</p>
                <p>Creation Date: {this.state.item['creationDate']}</p>
                <button onClick={() => this.deleteContent()}>DELETE</button>
                { this.state.redirect ? (<Navigate to="/contentList"/>) : null }
            </div>
        );
    }


}

export default ContentInfo;