/* eslint-disable no-unused-vars */
import React from 'react';
import ProfileUserinfo from './ProfileUserinfo';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, configure, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import tweetReducer from '../../redux/Reducers/TweetReducer';
import * as Actions from '../../redux/Actions/index';

configure({adapter: new Adapter()});

describe('ProfileUserinfo', () => {
  it('should renders without crashing', () => {
    const wrapper = shallow( <Provider store={store}>
      <ProfileUserinfo />
    </Provider>);
  });


  it('should set profileInfo in store', () => {
    const date = new Date();
      expect(tweetReducer(
        { 
          profileInfo: {
            username: '',
            bio: '',
            date_joined: '',
            birthday: '',
            firstName: '',
            lastName: '',
            website: '',
            isPublic: false,
            email: '',
            has_header_img: false,
            has_profile_img: false,
            header_img: '',
            profile_img_upload_details: '',
            header_img_upload_details: '',
            followers_count: 0,
            followings_count: 0,
          }
        },
        Actions.setProfileInfo({ 
          username: 'aliii',
          bio: 'bio',
          date_joined: date,
          birthday: date,
          first_name: 'ali',
          last_name: 'behrooz',
          website: 'www.google.com',
          isPublic: false,
          email: 'ali.behroozi@gmail.com',
          has_header_img: false,
          has_profile_img: false,
          header_img: 'fake_path',
          profile_img: 'fake_path',
          profile_img_upload_details: 'details',
          header_img_upload_details: 'details',
          followers_count: 0,
          followings_count: 0,
        })
      )).toEqual({ profileInfo: {
          username: 'aliii',
          bio: 'bio',
          date_joined: date,
          birthday: date,
          firstName: 'ali',
          lastName: 'behrooz',
          website: 'www.google.com',
          isPublic: false,
          email: 'ali.behroozi@gmail.com',
          has_header_img: false,
          has_profile_img: false,
          header_img: 'fake_path',
          profile_img: 'fake_path',
          profile_img_upload_details: 'details',
          header_img_upload_details: 'details',
          followers_count: 0,
          followings_count: 0,
    }});
  });
});

