import {
  WALLET_SYNC_STARTED,
  WALLET_SYNC_FAILED,
  WALLET_SYNC_COMPLETE,
  SEND_ETH_REQUESTED,
  SEND_ETH_APPROVED,
  SEND_ETH_FAILED,
  SYNC_BLOCK_STARTED,
  SYNC_BLOCK_COMPLETED,
  SYNC_BLOCK_FAILED,
  ENCRYPT_WALLET_STARTED,
  ENCRYPT_WALLET_COMPLETED,
  ENCRYPT_WALLET_FAILED
} from './actions/walletActions';

const initialState = {
  addresses: [],
  current_user: '',
  tokens: [],
  crowdsales: [],
  userTokenAddresses: [],
  userTokenBalances: [],
  walletEncrypted: false,
  encryptResult: 'undefined',
  passphrase: '',
  lastFetch: '',
  loading: false,
  lastErr: '',
  error: ''
}


export default function(state = initialState, action) {
  switch (action.type) {
    case WALLET_SYNC_STARTED:
      return {
        ...state,
        loading: true
      }
    case WALLET_SYNC_COMPLETE:
      return {
        ...state,
        addresses: action.payload,
        lastFetch: Date.now(),
        lastErr: '',
        error: ''
      }
    case WALLET_SYNC_FAILED:
      return {
        ...state,
        lastErr: Date.now(),
        error: action.payload
      }
    default:
      return state;
  }
}
