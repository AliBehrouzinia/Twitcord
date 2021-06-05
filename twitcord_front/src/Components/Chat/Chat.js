/* eslint-disable prefer-const */

/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {Send} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import React, {useEffect} from 'react';
import './Chat.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Grid, Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import * as API from '../../Utils/API/index';
const Chat = () => {
  const [ChatMessages, setChatMessages] = React.useState([{}]);
  const [RoomInfo, setRoomInfo] = React.useState([{}]);
  const counter = 1;
  let count = 0;
  for (let k in RoomInfo.members) if (RoomInfo.members.hasOwnProperty(k)) count++;

  useEffect(() => {
    API.getmessages({id: 1})
        .then((response) => {
          setChatMessages(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    API.getroominfo({id: 3})
        .then((response) => {
          setRoomInfo(response.data.results[0]);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  function fetchMoreData(c) {
    API.getmessages({id: c})
        .then((response) => {
          Chatmessages.push(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div className="mesgs" style={{fontFamily: 'BZar'}}>
      <Grid className= "group_info">
        <Grid className="info_pic">
          <Avatar className="ch_avatar" />
        </Grid>
        <Grid className="info">
          <Typography className="group_name"> {RoomInfo.title}</Typography>
          {console.log(typeof(RoomInfo.members))}
          <Typography className="group_members">{count} members</Typography>
        </Grid>
        <Grid className="back_arrow">
          <ArrowBackIosIcon/>
          <Typography>rooms</Typography>
        </Grid>
      </Grid>

      <InfiniteScroll
        dataLength={ChatMessages.length}
        next={fetchMoreData(counter + 1)}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="msg_history">
          {ChatMessages.map((postdetail, index) => {
            return (
              <div key={index}>
                {!postdetail.is_sent_by_me ? (
                  <div className="incoming_msg">
                    {console.log('here')}
                    {console.log(postdetail.content)}
                    <div className="incoming_msg_img">
                      <Avatar src={Avatar}alt="sunil" />
                      {/* <img src={avatar} alt="sunil" /> */}
                    </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{postdetail.content}</p>
                        {/* <span class="time_date"> ساعت | تاریخ</span> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="outgoing_msg">
                    <div className="sent_msg">
                      <p>{postdetail.content}</p>
                      <div/>
                      {/* <span class="time_date"> 11:01 AM | Today</span>{" "} */}
                    </div>
                  </div>
                )}

              </div>
            );
          }).reverse()}
        </div>
      </InfiniteScroll>


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
