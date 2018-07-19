import React from 'react';

import { Button, Card, CardContent, Typography, List, ListItem } from '@material-ui/core/';

const UserCrowdsalesList = ({ crowdsales }) => {
  return (
    crowdsales
    ?
    <Card>
      <CardContent>
        <Typography variant="headline gutterBottom">Your Launched Crowdsales:</Typography>

        <List id="userCrowdsaleAddresses" ref="userCrowdsaleAddresses" style={{listStyleType: 'none'}}>
        {
          crowdsales.map((crowdsale, key) => {
            return (
              <ListItem key={key}> Crowdsale: {crowdsale.crowdsale_address} Token: {crowdsale.token_address} </ListItem>
            )
          })
        }
        </List>
      </CardContent>
    </Card>
    :
    null
  )
}

export default UserCrowdsalesList;
