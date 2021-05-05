import React from 'react';
import EditProfile from './EditProfile';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount,configure} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import tweetReducer from '../../redux/Reducers/TweetReducer';
import * as Actions from '../../redux/Actions/index';

configure({adapter: new Adapter()});

describe('EditProfile', () => {
    it('should renders without crashing', () => {
        const wrapper = mount( <Provider store={store}><EditProfile /></Provider>);
      });

    it('should set profileInfo in store', () => {
      let date = new Date()
      expect(tweetReducer(
          { 
            profileInfo: {
              bio: '',
              birthday: null,
              firstName: '',
              lastName: '',
              website: '',
              username: '',
              isPublic: null,
            }
          },
          Actions.setProfileInfo({ 
              bio: 'bio',
              birthday: date,
              firstName: 'john',
              lastName: 'molcovich',
              website: 'www.google.com',
              username: 'jm1243',
              isPublic: false,
          })
        )).toEqual({ profileInfo: {
          bio: 'bio',
          birthday: date,
          firstName: 'john',
          lastName: 'molcovich',
          website: 'www.google.com',
          username: 'jm1243',
          isPublic: false,
       }});
    });
});

