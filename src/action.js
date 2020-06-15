export const NAVIGATE = '@@NavigationService/NAVIGATE'

export const navigate = (name) => {
  return {
    type: NAVIGATE,
    payload: {name},
  }
}
