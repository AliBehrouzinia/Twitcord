import React, {useState} from 'react';
import "./Follow.css";
import { Modal } from '@material-ui/core';
/* eslint-disable require-jsdoc */
const Follow = () => {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div className="paper">
        <h2 id="simple-modal-title">Text in a modal</h2>
      </div>
    );
    return(
        <div>
        <button type="button" onClick={handleOpen}>
          Open Modal
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
        >
          {body}
        </Modal>
      </div>
    );
};
export default Follow;