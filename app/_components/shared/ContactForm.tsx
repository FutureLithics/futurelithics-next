import React, { useState } from "react";
import { Form, Field } from "react-final-form";

const sender = (values: any) => {
  return fetch("/api/mailer/contact-me", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((err) => {
      return { message: err, success: false };
    });
};

interface ContactFormProps {
    setModalOpen: (open: boolean) => void,
    setResponse: (res: any) => void
}

let ContactForm: React.FC<ContactFormProps> = (props) => {
  const { setModalOpen, setResponse } = props;

  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleSubmit = async (values: any) => {
    const res = await sender(values);

    if (res.success) {
      setDisableSubmit(true);
      res.title = "Email Successful!";
      setModalOpen(true);
      setResponse(res);
    } else {
      res.title = "Email Unsuccessful.";
      setModalOpen(true);
      setResponse(res);
    }
  };

  type validatorValues = {
    firstName?: string,
    lastName?: string,
    email?:string,
    message?: string
  }

  const validators = (values: validatorValues) => {
    const errors = {} as any;
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.message) {
      errors.message = "Required";
    }
    return errors;
  };

  return (
    <Form onSubmit={handleSubmit} validate={validators}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="row mb-4 g-3">
            <Field name="firstName">
              {({ input, meta }) => (
                <div className="col">
                  <label>First Name</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                  {meta.error && meta.touched && (
                    <span className="small-text text-danger">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="lastName" className="col">
              {({ input, meta }) => (
                <div className="col">
                  <label>Last Name</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                  />
                  {meta.error && meta.touched && (
                    <span className="small-text text-danger">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>
          <Field name="email" className="col">
            {({ input, meta }) => (
              <div className="mb-4">
                <label>Email</label>
                <input
                  {...input}
                  type="text"
                  placeholder="Email"
                  className="form-control"
                />
                {meta.error && meta.touched && (
                  <span className="small-text text-danger">{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="message" className="col">
            {({ input, meta }) => (
              <div className="mb-4">
                <label>Message</label>
                <textarea
                  rows={5}
                  {...input}
                  placeholder="Provide the reason for contacting..."
                  className="form-control"
                />
                {meta.error && meta.touched && (
                  <span className="small-text text-danger">{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <div className="text-center">
            <button
              className="btn cta-button d-inline-block w-auto"
              type="submit"
              disabled={disableSubmit}
            >
              <strong className="text-warning">Submit</strong>
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default ContactForm;