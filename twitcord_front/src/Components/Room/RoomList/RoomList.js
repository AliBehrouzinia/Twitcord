import {Divider} from '@material-ui/core';
import React from 'react';
import RoomItem from '../RoomItem/RoomItem';
import './RoomList.css';

const RoomList = () => {
  const rooms = [1, 2, 3].map((room) => <div key={room}>
    <RoomItem/>
    <Divider/>
  </div>);
  return (
    <div>
      {rooms}
    </div>
  );
};

export default RoomList;
