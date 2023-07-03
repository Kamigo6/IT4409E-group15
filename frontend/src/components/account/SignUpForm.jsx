import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";

const SignUpForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      {/* Required Fields */}
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="username"
            type="text"
            label="Username"
            component={renderFormField}
            placeholder="Username"
            validate={[required]}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="password"
            type="password"
            label="Password"
            component={renderFormField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="lastName"
            type="text"
            label="Last Name"
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>

      {/* Optional Fields */}
      <Field
        name="mobileNo"
        type="number"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="Mobile no without country code"
        icon={IconPhone}
        validate={[maxLengthMobileNo, minLengthMobileNo, digit]}
        max="999999999999999"
        min="9999"
        className="mb-3"
        required={true}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormField}
        placeholder="Email"
        required={true}
      />
      <Field
        name="gender"
        type="text"
        label="Gender"
        component={renderFormField}
        placeholder="Female/Male/Other"
        required={true}
      />
      <Field
        name="birthday"
        type="date"
        label="Birthday"
        component={renderFormField}
        placeholder="Birthday"
        required={true}
      />
      <Field
        name="address"
        type="text"
        label="Address"
        component={renderFormField}
        placeholder="Address"
        required={true}
      />
      <Field
        name="district"
        type="text"
        label="District"
        component={renderFormField}
        placeholder="District"
        required={true}
      />
      <Field
        name="city"
        type="text"
        label="City"
        component={renderFormField}
        placeholder="City"
        required={true}
      />
      <Field
        name="country"
        type="text"
        label="Country"
        component={renderFormField}
        placeholder="Country"
        required={true}
      />

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sign In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
