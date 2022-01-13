import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './endpoints'

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

        fetch(routes['contentInfo'] + 'contentInfo', requestOptions)
            .then(response => response.json())
            .then(data => {

                var formdata = new FormData();
                formdata.append("id", this.state.item["_id"]["$oid"]);
                const requestOptions = {
                    method: "DELETE",
                    body: formdata
                }

                fetch(routes['file'] + 'fileStorage', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ redirect: true }))
                
            });
    }


    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        let contentId = queryParams.get("id")
        if (contentId != null)
            fetch(routes['contentInfo'] + 'contentInfo?id=' + contentId)
                .then(response => response.json())
                .then(data => {
                    const result = JSON.parse(data["item"]);
                    this.setState({
                        item: result,
                        dataIsLoaded: true
                    });
                    console.log(this.state)

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
                <button onClick={() => window.open(routes['file'] + 'fileStorage?contentId=' + this.state.item["_id"]["$oid"], "_blank")}>DOWNLOAD</button>
                <br /><br /><br />
                <button onClick={() => this.deleteContent()}>DELETE</button>
                {this.state.redirect ? (<Navigate to="/contentList" />) : null}


            </div>
        );
    }


}

export default ContentInfo;