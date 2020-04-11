import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Segment,
  Form,
  Container,
  Label,
  Header,
  Icon,
} from "semantic-ui-react";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const hasError = meta.error && meta.touched ? "error" : "";
    return (
      <Form.Field className={hasError}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.error && meta.touched && (
          <Label basic pointing color="red">
            {meta.error}
          </Label>
        )}
      </Form.Field>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Container>
        <Header as="h2" attached="top">
          <Icon name="video" />
          {this.props.action} a Stream
        </Header>
        <Segment attached>
          <Form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="error"
          >
            <Field
              name="title"
              component={this.renderInput}
              label="Enter Title"
            />
            <Field
              name="description"
              component={this.renderInput}
              label="Enter Description"
            />
            <div dir="rtl">
              <Button
                content="Submit"
                icon="send"
                primary
                labelPosition="right"
              />
            </div>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter Title";
  }
  if (!formValues.description) {
    errors.description = "You must enter Description";
  }

  return errors;
};

export default reduxForm({ form: "StreamForm", validate })(StreamForm);
