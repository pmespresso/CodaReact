/*
  Redux actions should be "reports" of what just happened
*/

export const FETCH_CROWDSALES_STARTED = {
  type: 'FETCH_CROWDSALES_STARTED'
};

export const FETCH_CROWDSALES_SUCCEEDED = payload => {
  type: 'FETCH_CROWDSALES_SUCCEEDED',
  payload
};

export const FETCH_CROWDSALES_FAILED = {
  type: 'FETCH_CROWDSALES_FAILED',
  payload: 'connection failed'
};

export const NEW_CROWDSALE_CREATED = payload => {
  type: 'NEW_CROWDSALE_CREATED',
  payload
}
