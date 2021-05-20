import {Divider, TextField, Typography} from '@material-ui/core';
import React from 'react';
import RoomItem from '../RoomItem/RoomItem';
import './RoomList.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const RoomList = () => {
  const [open, setOpen] = React.useState(false);

  const openCreateRoomModal = () => {
    setOpen(true);
  };

  const closeCreateRoomModal = () => {
    setOpen(false);
  };

  const rooms = [1, 2, 3].map((room) => <div key={room}>
    <RoomItem/>
    <Divider/>
  </div>);

  return (
    <div className="rl-root">
      {rooms}
      <Fab
        className="rl-fab"
        color="primary"
        aria-label="add"
        onClick={openCreateRoomModal}>
        <AddIcon />
      </Fab>
      <Modal
        className="rl-modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeCreateRoomModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="rl-paper">
            <Typography className="rl-title">Create Room</Typography>
            <Avatar className="rl-avatar" alt="room name">
              <ImageIcon className="rl-icon"/>
            </Avatar>
            <TextField
              className="rl-room-name"
              label="room name"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default RoomList;
