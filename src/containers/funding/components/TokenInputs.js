import React from 'react';
import { Grid, Button, Card, CardContent, Typography, TextField } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    paddingTop: 15
  }
})

const TokenInputs = ({ handleCreateToken, handleCrowdsaleConfig }) => {
  return (
    <Card justify='flexEnd'>
      <CardContent>
        <Typography variant="display3" gutterBottom component="h2">Create A New Artist Token</Typography>
        <TextField
          type="text"
          className="textField"
          label="Album or Project Title"
          fullWidth
          size='large'
          style={{paddingTop: 15, marginBottom: 10}}
          placeholder="e.g. Radio Nights"/>
        <TextField
          type="text"
          className="textField"
          label="Artist or Band Name"
          fullWidth
          size='large'
          style={{paddingTop: 15, marginBottom: 10}}
          placeholder="e.g. Chance the Rapper"/>
        <TextField
          type="text"
          className="textField"
          label="Artist Ethereum Wallet"
          fullWidth
          style={{paddingTop: 15, marginBottom: 10}}
          size='large'
          placeholder="e.g. 0x16B0dc30B9aD80Fb6fC352496CAaCA64ED082e9c"/>
        <TextField
          type="text"
          className="textField"
          label="Set Token Symbol"
          fullWidth
          size='large'
          style={{paddingTop: 15, marginBottom: 10}}
          placeholder="e.g. RDN"/>
        <TextField
          type="text"
          className="textField"
          label="Token Supply"
          fullWidth
          size='large'
          style={{paddingTop: 15, marginBottom: 10}}
          placeholder="e.g. 200000000"/>
        <Button variant="contained" color="primary" onClick={handleCreateToken}>Deploy Token</Button>
      </CardContent>
      <Button onClick={handleCrowdsaleConfig}>Start Crowdsale Configuration</Button>
    </Card>
  )
}

export default withStyles(styles)(TokenInputs);
