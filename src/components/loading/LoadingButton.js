import React from "react";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

const LoadingButton = ({
  loading,
  children,
  onClick,
  variant = "primary",
  size,
  className = "",
  disabled = false,
  spinnerSize = "sm",
  type = "button",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`${className} ${loading ? "position-relative" : ""}`}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size={spinnerSize}
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          <span>Processing...</span>
        </>
      )}
      {!loading && children}
    </Button>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  spinnerSize: PropTypes.string,
  type: PropTypes.string,
};

export default LoadingButton;
