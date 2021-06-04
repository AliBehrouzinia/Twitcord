/* eslint-disable max-len */
import {Send} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import './Chat.css';
import {Grid, Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const Chat = () => {
  return (
    <div className="mesgs" style={{fontFamily: 'BZar'}}>
      <Grid className= "group_info">
        <Grid className="info_pic">
          <Avatar className="ch_avatar" />
        </Grid>
        <Grid className="info">
          <Typography className="group_name"> group name</Typography>
          <Typography className="group_members">group members</Typography>
        </Grid>
        <Grid className="back_arrow">
          <ArrowBackIosIcon/>
          <Typography>rooms</Typography>
        </Grid>
      </Grid>
      <div className="msg_history">
        <div>
          <div className="incoming_msg">
            <div className="incoming_msg_img">
              <Avatar src={Avatar}alt="sunil" />
              {/* <img src={avatar} alt="sunil" /> */}
            </div>
            <div className="received_msg">
              <div className="received_withd_msg">
                <p>hello</p>
                {/* <span class="time_date"> ساعت | تاریخ</span> */}
              </div>
            </div>
          </div>
          <div className="outgoing_msg">
            <div className="sent_msg">
              <p>hello back</p>
              {/* <span class="time_date"> 11:01 AM | Today</span>{" "} */}
            </div>
          </div>
        </div>
      </div>

      <form >
        <div className="type_msg">
          <div className="input_msg_write">
            <input
              id="current_message"
              className="right"
              placeholder=" ...بنویسید"
              name="current_message"
              autoComplete="off"
            />
          </div>
          <button className="msg_send_btn">
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
