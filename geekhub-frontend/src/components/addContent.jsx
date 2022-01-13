import react from 'react';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './endpoints'

var contentTypeRadioButtons = [];
class AddContent extends React.Component {
    state = {
        title: '',
        description: '',
        userId: '61d3abf24d64a2c1202c9b8a',
        contentType: '',
        tags: [],
        allContentTypes: [],
        allTags: [],
        currentTypeTags: [],
        contentFile: null,
        newContentId: null,
        dataIsLoaded: false,
        redirectToList:false
    };



    change = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onContentTypeChange = (event) => {
        this.setState({
            contentType: event.target.value
        });
        console.log(this.state.allTags)
        this.setState({ currentTypeTags: [...this.state.allTags['common'], ...this.state.allTags[event.target.value]] })
    }

    onTagChange = (event) => {
        console.log(event.target.value)
        let newTypeTags = [...this.state.tags];
        if (!newTypeTags.includes(event.target.value)) {
            newTypeTags.push(event.target.value)
        }
        else {
            let index = newTypeTags.indexOf(event.target.value);
            newTypeTags.splice(index, 1);
        }

        this.setState({ tags: newTypeTags });

    }

    submitContent() {
        var time = new Date()
        var datetime = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "T" + time.getHours() + ":" + time.getMinutes()

        var formdata = new FormData();
        formdata.append("title", this.state.title);
        formdata.append("userId", this.state.userId);
        formdata.append("description", this.state.description);
        formdata.append("contentType", this.state.contentType);
        formdata.append("tags", this.state.tags.toString());
        formdata.append("creationDate", datetime);

        const requestOptions = {
            method: "POST",
            body: formdata
        }
        fetch(routes['contentInfo'] + 'contentInfo', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ "newContentId": JSON.parse(data['result'])['$oid'] })

                var contentForm = new FormData();
                contentForm.append("contentFile", this.state.contentFile);
                contentForm.append("contentId", this.state.newContentId);
                requestOptions.body = contentForm;
                fetch(routes['file'] + 'fileStorage', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.setState({"redirectToList":true})
                    });
            });

    }

    onChangeHandler = event => {
        this.setState({ "contentFile": event.target.files[0] })
    }

    componentDidMount() {
        fetch(routes['contentInfo'] + 'detailsInfo')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allContentTypes: data['content_types'],
                    allTags: data['tags'],
                    dataIsLoaded: true
                })
            });
    }

    render() {
        if (!this.state.dataIsLoaded)
            return <div>LOADING</div>;

        return (
            <div>
                <h1>Add your creation</h1>
                <br />
                <br />
                <br />

                <form >
                    <label>
                        Title:
                        <br />
                        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.change} />
                    </label>
                    <br />
                    <br />
                    <label>
                        Description
                        <br />
                        <textarea id='description-textbox' rows="10" cols="100" name="description" placeholder="Description" value={this.state.description} onChange={this.change} />
                    </label>

                    <br />
                    <br />
                    Type of creation
                    {this.state.allContentTypes.map((contentType) => (
                        <label key={contentType}>
                            <br />
                            <input
                                type="radio"
                                value={contentType}
                                checked={this.state.contentType === contentType}
                                onChange={this.onContentTypeChange}
                            />
                            {contentType}
                        </label>
                    ))}

                    <br />
                    <br />

                    <input type="file" name="file" onChange={this.onChangeHandler} />

                    <br />
                    <br />
                    Tags
                    {this.state.currentTypeTags.map((tag) => (
                        <label key={tag}>
                            <br />
                            <input
                                type="radio"
                                value={tag}
                                checked={this.state.tags.includes(tag)}
                                onClick={this.onTagChange}
                                readOnly
                            />
                            {tag}
                        </label>
                    ))}
                </form>
                <button onClick={() => this.submitContent()}>Submit</button>
                {this.state.redirectToList ? (<Navigate to="/contentList" />) : null}
            </div>
        );
    }



}

export default AddContent;