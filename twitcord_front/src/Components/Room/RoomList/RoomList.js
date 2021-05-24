import {Divider, TextField, Typography} from '@material-ui/core';
import React, {useState} from 'react';
import RoomItem from '../RoomItem/RoomItem';
import './RoomList.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import * as API from '../../../Utils/API/index';
import * as Constants from '../../../Utils/Constants.js';

const options = [
  {value: 'Ali Behroozi', label: 'Ali Behroozi'},
  {value: 'SADEsGH Behroozi', label: 'SADEsdasdasdasGH Behroozi'},
  {value: 'SAaDEGH sa', label: 'asdas Basdasehroozi'},
  {value: 'SADEGsH Behroozi', label: 'SADEGH asd'},
  {value: 'Behroozi Behroozi', label: 'Behroozi Behroozi'},
];

const RoomList = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [roomTitle, setRoomTitle] = useState('');

  const userGeneralInfo = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  );

  const openCreateRoomModal = () => {
    setOpen(true);
    setPostButtonDisabled(true);
  };

  const closeCreateRoomModal = () => {
    setOpen(false);
  };

  const handlePostClick = () => {
    const data = {
      owner: userGeneralInfo.userID,
      title: roomTitle,
      users: [1],
    };
    API.createRoom(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleTextChange = (text) => {
    setRoomTitle(text);

    if (text.length > 0) {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
    }
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
          <form className="rl-paper">
            <Typography className="rl-title">Create Room</Typography>
            <Avatar className="rl-avatar" alt="room name">
              <ImageIcon className="rl-icon"/>
            </Avatar>
            <TextField
              className="rl-room-name"
              label="room name"
              required
              value={roomTitle}
              onChange={(e) => handleTextChange(e.target.value)}
            />
            <Select
              className="rl-select"
              placeholder="Select Members"
              isMulti
              value={selectedOption}
              onChange={(s) => {
                console.log(s);
                setSelectedOption(s);
              }}
              options={options}
            />
            <Button
              className="rl-create-room"
              variant="contained"
              color="primary"
              onClick={handlePostClick}
              disabled={postButtonDisabled}>create</Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default RoomList;
