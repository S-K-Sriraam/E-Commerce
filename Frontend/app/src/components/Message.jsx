import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

function Message({ variant = "info", children, onClose }) {
  useEffect(() => {
    if (!onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;