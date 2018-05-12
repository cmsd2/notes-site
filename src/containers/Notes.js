import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { withAuth } from "../Auth";
import config from "../config";
import * as Api from "../Api";
import "./Notes.css";

export default withAuth(class Notes extends Component {
  constructor(props) {
    super(props);

    this.api = new Api.Notes(props.auth);

    this.state = {
      isLoading: null,
      isDeleting: null,
      note: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.length < 50
      ? str
      : str.substr(0, 20) + "..." + str.substr(str.length - 20, str.length);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a smaller file");

      return;
    }

    this.setState({
      isLoading: true
    });

    try {
      if (this.file) {
        // not implemented
      }

      await this.api.put({
        ...this.state.note,
        content: this.state.content
      });

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({
        isLoading: false
      });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({
      isDeleting: true
    });

    try {
      await this.api.remove(this.props.match.params.id);
      this.props.history.push("/");
    } catch (e) {
      alert(e);

      this.setState({
        isDeleting: false
      });
    }
  }

  render() {
    return (
        <div className="Notes">
        {this.state.note &&
         <form onSubmit={this.handleSubmit}>
         <FormGroup controlId="content">
         <FormControl
         onChange={this.handleChange}
         value={this.state.content}
         componentClass="textarea"
         />
         </FormGroup>
         {this.state.note.attachment &&
          <FormGroup>
          <ControlLabel>Attachment</ControlLabel>
          <FormControl.Static>
          <a
          target="_blank"
          rel="noopener noreferrer"
          href={this.state.note.attachment}
          >
          {this.formatFilename(this.state.note.attachment)}
          </a>
          </FormControl.Static>
          </FormGroup>}
          <FormGroup controlId="file">
          {!this.state.note.attachment &&
           <ControlLabel>Attachment</ControlLabel>}
           <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
<LoaderButton
block
bsStyle="primary"
bsSize="large"
disabled={!this.validateForm()}
type="submit"
isLoading={this.state.isLoading}
text="Save"
loadingText="Saving..."
/>
<LoaderButton
block
bsStyle="danger"
bsSize="large"
isLoading={this.state.isDeleting}
onClick={this.handleDelete}
text="Delete"
loadingText="Deleting..."
/>
         </form>
        }
        </div>
    );
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const results = await this.api.get(id);
      this.setState({
        note: results.data,
        content: results.data.content
      });
    } catch (e) {
      alert(e);
    }
  }
})
