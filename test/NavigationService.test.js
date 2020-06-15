jest.mock('react')

import {NavigationService} from '../src'
import configureStore from 'redux-mock-store'
import * as React from 'react'
import {NAVIGATE} from '../src/action'


describe('NavigationService', () => {
  describe('navigationRef', () => {
    it('returns a React.ref', () => {
      const stubbedReactRef = {navigate: 'mock-react-ref-stubbed'}
      const mockCreateRef = jest.spyOn(React, 'createRef')
      mockCreateRef.mockReturnValue(stubbedReactRef)

      const navigationService = new NavigationService()

      const navigationRef = navigationService.navigationRef
      expect(navigationRef).toBe(stubbedReactRef)
    })
  })

  describe('navigationMiddleware', () => {
    let navigationService
    let nextMiddlewareSpy
    let store

    beforeEach(() => {
      jest.spyOn(React, 'createRef').mockImplementation(() => ({
        current: {
          navigate: jest.fn(),
        },
      }))

      nextMiddlewareSpy = jest.fn()
      const nextMiddleware = () => () => action => {
        nextMiddlewareSpy(action)
      }

      navigationService = new NavigationService()
      const middleWares = [navigationService.navigationMiddleware, nextMiddleware]
      const mockStore = configureStore(middleWares)
      store = mockStore({})
    })

    describe('when action type is "@@NavigationService/NAVIGATE"', () => {
      beforeEach(() => {
        store.dispatch({
          type: NAVIGATE,
          payload: {
            name: 'test-screen-name',
          },
        })
      })

      it('navigates based on payload value', () => {
        expect(navigationService.navigationRef.current.navigate)
          .toBeCalledWith('test-screen-name')
      })

      it('does not passed down the action via next', () => {
        expect(nextMiddlewareSpy).not.toBeCalled()
      })
    })

    describe('when action type is not "@@NavigationService/NAVIGATE"', () => {
      const action = {
        type: 'DIFFERENT_TYPE',
        payload: {
          name: 'test-screen-name',
        },
      }

      beforeEach(() => {
        store.dispatch(action)
      })

      it('does not navigate', () => {
        expect(navigationService.navigationRef.current.navigate)
          .not.toBeCalled()
      })

      it('passes down the action via next', () => {
        expect(nextMiddlewareSpy).toBeCalledWith(action)
      })
    })
  })
})
