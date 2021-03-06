import React, { Component } from 'react';
import ContentSummary from './contentSummary';
import {routes} from './endpoints'

class ContentList extends React.Component {

    state = {
        dataIsLoaded: false,
        items: [],
        searchField: "creationDate",
        orderKey: "ASCENDING",
        numberOfResults: 10
    }


    componentDidMount() {
        let endpoint = routes['contentInfo'] + '/contentsInfo?searchField=' + this.state.searchField +
            "&orderKey=" + this.state.orderKey + "&numberOfResults=" + this.state.numberOfResults;
        
        fetch(endpoint, {headers:{'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(data => {
                console.log(data)
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