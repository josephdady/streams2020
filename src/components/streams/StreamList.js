import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  Icon,
  Segment,
  Header,
  Container,
} from "semantic-ui-react";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";
import StreamDelete from "./StreamDelete";

class StreamList extends React.Component {
  state = { modalOpen: false, modalStream: null, modalAction: null };

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId && this.props.isSignedIn) {
      return (
        <div className="right floated content">
          <Button.Group size="mini">
            <Button as={Link} to={`/streams/edit/${stream.id}`} primary>
              <Icon name="edit outline" />
              Edit
            </Button>
            <Button.Or />

            <Button negative onClick={() => this.handleOpen(stream, "delete")}>
              <Icon name="trash alternate" />
              Delete
            </Button>
          </Button.Group>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <List.Item key={stream.id}>
          {this.renderAdmin(stream)}
          <List.Icon name="video" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>
              <Link to={`streams/${stream.id}`}>{stream.title}</Link>
            </List.Header>
            <List.Description>{stream.description}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  handleOpen = (stream) =>
    this.setState({
      modalOpen: true,
      modalStream: stream,
    });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Container>
        <Header as="h2" attached="top">
          Streams List
        </Header>
        <Segment attached>
          <List divided relaxed>
            {this.renderList()}
          </List>
        </Segment>
        <StreamDelete
          open={this.state.modalOpen}
          handleClose={() => this.handleClose()}
          stream={this.state.modalStream}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
