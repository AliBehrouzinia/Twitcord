import {Divider} from '@material-ui/core';
import React from 'react';
import RoomItem from '../RoomItem/RoomItem';
import './RoomList.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const RoomList = () => {
  const rooms = [1, 2, 3].map((room) => <div key={room}>
    <RoomItem/>
    <Divider/>
  </div>);
  return (
    <div className="rl-root">
      {rooms}
      <Fab className="rl-fab" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default RoomList;
