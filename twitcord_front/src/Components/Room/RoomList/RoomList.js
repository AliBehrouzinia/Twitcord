import {Divider, TextField, Typography} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
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
import PropTypes from 'prop-types';
/* eslint-disable */


const RoomList = (props) => {
  const [open, setOpen] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [roomTitle, setRoomTitle] = useState('');
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const optionIds = [];
  const userGeneralInfo = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  );

  useEffect(() => {
    API.getRoomsList({id: userGeneralInfo.pk})
        .then((response) => {
          const rooms = response.data.results;
          setRooms(rooms);
        })
        .catch((error) => {
        });

    API.getFollowersList({id: userGeneralInfo.pk})
        .then((response) => {
          const followers = response.data.results.map((item) => {
            return {value: item.id, label: item.username};
          });

          followers
              .map((item) => {
                options.push(item);
                optionIds.push(item.value);
              });
          setOptions(options);
        });
  }, []);

  const openCreateRoomModal = () => {
    setOpen(true);
    setPostButtonDisabled(true);
  };

  const closeCreateRoomModal = () => {
    setOpen(false);
    setRoomTitle('');
    setSelectedOptionIds([]);
    setSelectedOption(null);
  };

  const handlePostClick = () => {
    const data = {
      owner: userGeneralInfo.pk,
      title: roomTitle,
      users: selectedOptionIds,
    };

    API.createRoom(data)
        .then((response) => {
          closeCreateRoomModal();
          setRooms([...rooms, {
            id: response.data.id,
            title: response.data.title,
            owner: response.data.owner,
            users: response.data.users,
            number_of_members: response.data.number_of_members,
          }]);
        })
        .catch((error) => {
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

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptionIds(selectedOptions.map((so) => so.value));
    setSelectedOption(selectedOptions);
  };

  const roomsList = rooms.filter(room => (room.owner.id == userGeneralInfo.pk) || !props.self)
    .map((room) => <div key={room.id}>
      <RoomItem title={room.title} membersCount={room.number_of_members}/>
      <Divider/>
    </div>);

  return (
    <div className="rl-root">
      {roomsList}
      {!props.self && <Fab
        className="rl-fab"
        color="primary"
        aria-label="add"
        onClick={openCreateRoomModal}>
        <AddIcon />
      </Fab>}
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
              onChange={
                (selectedOptions) => handleSelectChange(selectedOptions)
              }
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

RoomList.propTypes = {
  self: PropTypes.bool,
};

export default RoomList;
