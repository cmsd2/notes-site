import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { withAuth } from "../Auth";
import * as Api from "../Api";
import "./Home.css";

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);

    this.api = new Api.Notes(props.auth);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  notes() {
    return this.api.list();
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
        ? <ListGroupItem
      key={note.noteId}
      href={`/notes/${note.noteId}`}
      onClick={this.handleNoteClick}
      header={note.content.trim().split("\n")[0]}
        >
        {"Created: " + new Date(note.noteId.split("_")[0]).toLocaleString()}
        </ListGroupItem>
        : <ListGroupItem
      key="new"
      href="/notes/new"
      onClick={this.handleNoteClick}
        >
        <h4>
        <b>{"\uFF0B"}</b> Create a new note
        </h4>
        </ListGroupItem>
    )
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Notes</h1>
        <p>A simple note-taking app</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
        {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.auth.isAuthenticated() ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated()) {
      return;
    }

    try {
      const results = await this.notes();
      this.setState({notes: results.data});
    } catch (e) {
      alert(e);
    }

    this.setState({
      isLoading: false
    });
  }
})

