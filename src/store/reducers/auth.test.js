import reducer from './auth';
import *  as actionTypes from '../actions/actionTypes';

describe('Auth Reducer ', () => {
    it('Should return the initial State ',() =>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId : null,
            error : null,
            loading : false,
            authRedirectPath: '/'
        })
    })
})