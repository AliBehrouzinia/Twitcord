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
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default RoomList;
