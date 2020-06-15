# connected-react-navigation
Redux binding for *React Navigation v5*

## Installation

    yarn add react-navigation-redux-binding

## Usage

### Step 1
Create a new instance of  `NavigationService` from `'react-navigation-redux-binding'`

```js
import {NavigationService} from 'react-navigation-redux-binding'
//...

const navigationService = new NavigationService()
```

### Step 2
Add `navigationService.navigationMiddleware` to the store middleware so that we can dispatch `navigate('ScreenName')` action

```js
const store = createStore(
  rootReducer,
  applyMiddleware(navigationService.navigationMiddleware),
)
```

### Step 3
Set the `navigationService.navigationRef` to `NavigationContainer` component's `ref`

```js
import { NavigationContainer } from '@react-navigation/native'

<NavigationContainer ref={navigationService.navigationRef}>
  {/* ... */}
</NavigationContainer>
```

### And Voila! (Step 4)
Dispatch navigate action

```js
import {navigate} from 'react-navigation-redux-binding'

export const login = () => {
  return async (dispatch, getState) => {
    await ayncLoginOperation()
    dispatch( navigate(USER_PROFILE_SCREEN) ) // This will dispatch navigation via the middleware
  }
}
```

## Limitation
Navigate can only use the screen name.

Passing the navigation `params` has not been implemented yet.

## License
[MIT License](LICENSE)
