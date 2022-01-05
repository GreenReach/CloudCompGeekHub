import React, { Component } from 'react';
import ContentSummary from './contentSummary';

class ContentList extends React.Component {

    state = {
        dataIsLoaded: false,
        items: [],
        searchField: "creationDate",
        orderKey: "ASCENDING",
        numberOfResults: 2
    }


    componentDidMount() {
        let endpoint = 'http://127.0.0.1:5000/contentsInfo?' + "searchField=" + this.state.searchField +
            "&orderKey=" + this.state.orderKey + "&numberOfResults=" + this.state.numberOfResults;
        console.log(endpoint)
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data["items"]))
                this.setState({
                    items: JSON.parse(data["items"]),
                    dataIsLoaded: true
                })
            });
    }

    render() {
        if (!this.state.dataIsLoaded)
            return (<div>Loading...</div>);

        return (
            <div>
                {this.state.items.map((item)=>(
                    <div key={item["_id"]["$oid"]}>
                    <ContentSummary item={item} ></ContentSummary>
                    <br />
                    </div>
                ))}
            </div>
        );
    }
}

export default ContentList;