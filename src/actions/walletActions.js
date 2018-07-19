/*
  Redux actions should be "reports" of what just happened
*/

import { bindActionCreators } from 'redux';

export const WALLET_SYNC_STARTED = {
  type: 'WALLET_SYNC_STARTED'
};

export const WALLET_SYNC_COMPLETE = payload => {
  type: 'WALLET_SYNC_COMPLETE',
  payload
};

export const WALLET_SYNC_FAILED = payload => {
  type: 'WALLET_SYNC_FAILED',
  payload
};
