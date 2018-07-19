import React from 'react';
import { Grid, Button, CardHeader, Card, CardContent, Typography } from '@material-ui/core';

const TokenInputs = ({ handleCreateToken, handleCrowdsaleConfig }) => {
  return (
    <Card>
      <CardHeader>Create A New Token For Your Album</CardHeader>
      <CardContent>
        <Typography variant="title">Album or Project Title:</Typography>
         <input type="text" className="form-control bottom-margin-20" placeholder="e.g. Radio Nights"/>
        <Typography variant="title">Artist or Band Name: </Typography> <input type="text" className="form-control bottom-margin-20" placeholder="e.g. Chance the Rapper"/>
        <Typography variant="title">Artist Ethereum Wallet: </Typography> <input type="text" className="form-control bottom-margin-20" placeholder="e.g. 0x16B0dc30B9aD80Fb6fC352496CAaCA64ED082e9c"/>
        <Typography variant="title">Set Token Symbol:</Typography>  <input type="text" className="form-control bottom-margin-20" placeholder="e.g. RDN"/>
        <Typography variant="title">Token Supply:</Typography> <input type="text" className="form-control bottom-margin-20" placeholder="e.g. 200000000"/>
        <Button onClick={handleCreateToken}>Deploy Token</Button>
      </CardContent>
      <Button onClick={handleCrowdsaleConfig}>Start Crowdsale Configuration</Button>
    </Card>
  )
}

export default TokenInputs;
