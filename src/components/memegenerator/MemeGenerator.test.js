import React from 'react';
import ReactDOM from 'react-dom';
import MemeGenerator from './MemeGenerator';
import ReactTestUtils from 'react-dom/test-utils'; 


const setup = stateOverrides => {
    const state = Object.assign({
        imageCompiledUrl: '', 
        memeHead:'', 
        memeBody:'', 
        memeImageUrl:'', 
        id:null,
        list:[]
      
      
      
    }, stateOverrides);

  const div = document.createElement('div');
  const wrapper = ReactDOM.render(<MemeGenerator />, div);

  return {
      state,
      wrapper,
      div
  }
}

describe('Testing methods', () => {
    test('render', () => { 
    expect(setup().wrapper).toBeDefined();
    });

    test('compileImage()', () => {
        let noError = true;
        try{
            setup().wrapper.compileMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('compileImage() just with url', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
            wrapper.compileMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('compileImage() just with head', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeHead = 'Dummy';
            wrapper.compileMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('compileImage() just with body', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeBody = 'Dummy';
            wrapper.compileMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    
    test('compileImage() all filled', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeBody = 'Dummy';
            wrapper.state.memeHead = 'Dummy';
            wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
            wrapper.compileMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('compileImage() check publish button visibility', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.compileMeme();
        let button = wrapper.getBtnPublish();
        expect(button==='').toBe(false);
    });

    test('compileImage() check publish button invisibility', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.compileMeme();
        let button = wrapper.getBtnPublish();
        expect(button==='').toBe(true);
    });

    test('getNoImageText() check No Text === empty', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        let noImageText = wrapper.getNoImageText();
        expect(noImageText==='').toBe(true);
    });


    test('getNoImageText() check No Text !== empty', () => {
        let wrapper = setup().wrapper;
        //wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        let noImageText = wrapper.getNoImageText();
        expect(noImageText==='').toBe(false);
    });


    test('getResultItems() === empty', () => {
        let wrapper = setup().wrapper;
        let result = wrapper.getResultItems();
        expect(result.length==0).toBe(true);
    });

    test('getResultItems() === empty', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeHead = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.compileMeme();
        let result = wrapper.getResultItems();
        expect(result.length==0).toBe(true);
    });

    test('persistMeme() no errors', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeBody = 'Dummy';
            wrapper.state.memeHead = 'Dummy';
            wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
            wrapper.persistMeme();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });


    test('getResultItems() !== empty', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeHead = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.compileMeme();
        wrapper.persistMeme();
        let result = wrapper.getResultItems();
        expect(result.length>0).toBe(true);
    });

    test('getDivItem() all rigth', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeHead = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.compileMeme();
        wrapper.persistMeme();
        let result = wrapper.getResultItems();
        let divItem = wrapper.getDivItem(result[0]);
        expect(divItem).toBeDefined();
    });


    
    test('postOnLinkedin() no errors', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            wrapper.state.memeBody = 'Dummy';
            wrapper.state.memeHead = 'Dummy';
            wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
            wrapper.postOnLinkedin();
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('postOnLinkedin() json return', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeHead = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.postOnLinkedin();
        expect(wrapper.state.postlink!=null && wrapper.state.postlink!='').toBe(true);
    });

    test('getElement() as null', () => {
        let wrapper = setup().wrapper;
        expect(wrapper.getElement('dummyId')==null).toBe(true);
    });

    test('getElement() not null', () => {
        let wrapper = setup().wrapper;
        wrapper.state.memeBody = 'Dummy';
        wrapper.state.memeHead = 'Dummy';
        wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
        wrapper.compileMeme();
        wrapper.persistMeme();
        expect(wrapper.getElement(wrapper.state.id)!=null).toBe(true);
    });
    
    test('editMeme() no errors', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        try{
            
            wrapper.state.memeBody = 'Dummy';
            wrapper.state.memeHead = 'Dummy';
            wrapper.state.memeImageUrl = 'https://images.pexels.com/photos/760228/pexels-photo-760228.jpeg?h=350&auto=compress&cs=tinysrgb';
            wrapper.compileMeme();
            wrapper.persistMeme();
            wrapper.editMeme(wrapper.state.id);
        }catch(e){
            noError=false;
        }
        expect(noError).toBe(true);
    });

    test('updateHead() state change', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        let event = {target:{
                value:'updated dummy!'
            }
        }
        wrapper.updateHead(event);
        expect(wrapper.state.memeHead===event.target.value).toBe(true);
    });

    test('updateBody() state change', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        let event = {target:{
                value:'updated dummy!'
            }
        }
        wrapper.updateBody(event);
        expect(wrapper.state.memeBody===event.target.value).toBe(true);
    });

    test('updateImageUrl() state change', () => {
        let noError = true;
        let wrapper = setup().wrapper;
        let event = {target:{
                value:'updated dummy!'
            }
        }
        wrapper.updateImageUrl(event);
        expect(wrapper.state.memeImageUrl===event.target.value).toBe(true);
    });

  });
