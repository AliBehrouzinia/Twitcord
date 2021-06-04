/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {Send} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import React, {useState} from 'react';
import './Chat.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Grid, Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as API from '../../Utils/API/index';
const Chat = () => {
  const [Chatmessages, setChatmessages] = useState([{}]);
  const counter = 1;

  useEffect(() => {
    API.getmessages({id: 1})
        .then((response) => {
          setChatmessages(response.results);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  function fetchMoreData(c) {
    API.getmessages({id: c})
        .then((response) => {
          Chatmessages.push(response.results);
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
          <InfiniteScroll
            dataLength={Chatmessages.length()}
            next={() => fetchMoreData(counter + 1)}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {Chatmessages.map((postdetail, index) => {
              return (
                <div key={index}>
                  {Chatmessages.is_sent_by_me === false ? (
                  <div className="incoming_msg">
                    <div className="incoming_msg_img">
                      <Avatar src={Avatar}alt="sunil" />
                      {/* <img src={avatar} alt="sunil" /> */}
                    </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{Chatmessages.content}</p>
                        {/* <span class="time_date"> ساعت | تاریخ</span> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="outgoing_msg">
                    <div className="sent_msg">
                      <p>{Chatmessages.content}</p>
                      {/* <span class="time_date"> 11:01 AM | Today</span>{" "} */}
                    </div>
                  </div>
                )}
                </div>
              );
            })}
          </InfiniteScroll>
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
