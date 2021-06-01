/* eslint-disable no-unused-vars */
import React from 'react';
import ProfileUserinfo from './ProfileUserinfo';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, configure} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import tweetReducer from '../../redux/Reducers/TweetReducer';
import * as Actions from '../../redux/Actions/index';

configure({adapter: new Adapter()});

describe('ProfileUserinfo', () => {
  it('should renders without crashing', () => {
    const wrapper = mount( <Provider store={store}>
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
          },
        },
        Actions.setProfileInfo({
          bio: 'bio',
          birthday: date,
          date_joined: date,
          firstName: 'yuno',
          lastName: 'sykk',
          website: 'www.google.com',
          username: 'jm1243',
          isPublic: false,
          email: 'hanakariman@yahoo.com',
        }),
    )).toEqual({profileInfo: {
      bio: 'bio',
      birthday: date,
      date_joined: date,
      firstName: 'yuno',
      lastName: 'sykk',
      website: 'www.google.com',
      username: 'jm1243',
      isPublic: false,
      email: 'hanakariman@yahoo.com',

    }});
  });
});

