import * as React from 'react'
import {NAVIGATE} from './action'

export class NavigationService {
  constructor() {
    this._navigationRef = React.createRef()
  }

  get navigationRef() {
    return this._navigationRef
  }

  get navigationMiddleware() {
    return () => next => action => {
      if (action.type === NAVIGATE) {
        this.navigationRef.current.navigate(action.payload.name)
      } else {
        next(action)
      }
    }
  }
}
