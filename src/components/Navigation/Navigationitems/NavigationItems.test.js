import React from 'react';
import {configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter: new Adapter()});

describe('<<<<<<Navigation Items >>>>>>>', () =>{
    let wrapper;
    beforeEach(() =>{
        wrapper  = shallow(<NavigationItems/>);
    })

    it('Should Render 2 Items if not Authenticated :',() =>{
      
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should Render 3 Items if not Authenticated :',() =>{
          wrapper.setProps({isAuthenticated : true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Should Render 3 Items if not Authenticated :',() =>{
        wrapper.setProps({isAuthenticated : true});
      expect(wrapper.contains(<NavigationItem link="/logout"> Logout</NavigationItem>)).toEqual(true);
  });
})

 