export const fetchCrowdsales = () => dispatch => {
  console.log('fetching...');
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(crowdsales =>
      dispatch({
        type: 'FETCH_CROWDSALES',
        payload: crowdsales
      }))
}
