import React from 'react';
import ProfileUserinfo from './ProfileUserinfo';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, configure} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import tweetReducer from '../../redux/Reducers/TweetReducer';
import * as Actions from '../../redux/Actions/index';


configure({adapter: new Adapter()});

describe('ProfileUserinfo', () => {
    it('should renders without crashing', () => {
        const wrapper = mount( <Provider store={store}><ProfileUserinfo /></Provider>);
      });


    it('should set profileInfo in store', () => {
      let date = new Date()
      expect(tweetReducer(
          { 
            profileInfo: {
                username: '',
                bio: '',
                date_joined: '',
                followers: 0,
                following: 0,
                birthday: '',
                firstName: '',
                lastName: '',
                website: '',
                isPublic: false,
            }
          },
          Actions.setProfileInfo({ 
              bio: 'bio',
              birthday: date,
              followers: 2,
              following: 3,
              date_joined: date,
              firstName: 'yuno',
              lastName: 'sykk',
              website: 'www.google.com',
              username: 'jm1243',
              isPublic: false,
          })
        )).toEqual({ profileInfo: {
          bio: 'bio',
          birthday: date,
          followers: 2,
          following: 3,
          date_joined: date,
          firstName: 'yuno',
          lastName: 'sykk',
          website: 'www.google.com',
          username: 'jm1243',
          isPublic: false,
          
       }});
    });
});

