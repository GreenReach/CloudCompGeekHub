import React, { Component } from 'react';
import "./contentSummary.css"
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

class ContentSummary extends React.Component {

    

    render() {
        return (
            <div className="summary-box">
                Title: {this.props.item["title"]}
                <br />
                Type: {this.props.item["contentType"]}
                <br />
                Tags: {this.props.item["tags"]}
                <Link to={"/viewContent?id=" + this.props.item["_id"]["$oid"]}>view</Link>
            </div>
        );
    }
}

export default ContentSummary;