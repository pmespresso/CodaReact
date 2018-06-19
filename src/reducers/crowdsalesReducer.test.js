
describe('reducers', () => {
  var crowdsalesReducer = require('./crowdsalesReducer');

  describe('crowdsales', () => {

    const initialState = {
      crowdsales: [],
      live_crowdsales: [],
      expired_crowdsales: []
    }

    it(' -> should provide us with an initial state', () => {
      // expect(crowdsalesReducer(undefined, {}).toEqual(initialState))
    })
  })
})
