import {navigate} from './action'

describe('action', () => {
  describe('navigate', () => {
    const navigateAction = navigate('test-name')
    it('returns action with type "@@NavigationService/NAVIGATE"', () => {
      expect(navigateAction.type).toBe('@@NavigationService/NAVIGATE')
    })

    it('returns action with name in payload', () => {
      expect(navigateAction.payload.name).toBe('test-name')
    })
  })
})
