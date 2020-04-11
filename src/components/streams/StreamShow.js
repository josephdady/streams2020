import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import { Segment, Header, Container, Icon } from "semantic-ui-react";

class StreamShow extends React.Component {
  componentDidMount() {
    return this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;

    return (
      <Container>
        <Header as="h2" attached="top">
          <Icon name="video" />
          {title}
        </Header>
        <Segment attached>{description}</Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
