import React from "react";
import AlertModal from "../common/AlertModal";

const AuthAlertModal = ({visible, title, message, onConfirm}) => {
    return (
        <AlertModal
          visible={visible}
          title={title}
          description={message}
          onConfirm={onConfirm}
        />
    );
};

export default AuthAlertModal;