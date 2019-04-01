import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './App.css';

class App extends Component {
  state = {
    height: 176,
    weight: 70,
    IVSTd: 1,
    LVIDd: 1,
    PWTd: 1,
  };

  handleChange = field => e =>{
    this.setState({ [field]: e.target.value });
  }

  getBSA = (height, weight) => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    return 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);
  }

  getLVVm = (IVSTd, LVIDd, PWTd) => {
    return Math.pow(parseFloat(IVSTd) + parseFloat(LVIDd) + parseFloat(PWTd), 3) - Math.pow(parseFloat(LVIDd), 3);
  }

  render() {
    const { height, weight, IVSTd, LVIDd, PWTd } = this.state;
    const bsa = this.getBSA(height, weight);
    const lvvm = this.getLVVm(IVSTd, LVIDd, PWTd);

    const LVmassPenn = 1.04 * lvvm - 13.6;
    const LVmassASE = 1.04 * lvvm * 0.8 + 0.6;

    return (
      <div className="content">
      <Typography variant="h4" gutterBottom>
        ILVmass calculator
      </Typography>

      <Grid container spacing={16}>
        <Grid item xs={6}>
          <div>
            <TextField
              id="height"
              label="Height, cm"
              value={height}
              onChange={this.handleChange('height')}
              margin="normal"
              type="number"
            />
          </div>

          <div>
            <TextField
              id="weight"
              label="Weight, kg"
              value={weight}
              onChange={this.handleChange('weight')}
              margin="normal"
              type="number"
            />
          </div>
        </Grid>

        <Grid item xs={6}>
          <div>
            <TextField
              id="ivstd"
              label="IVSTd, cm"
              value={IVSTd}
              onChange={this.handleChange('IVSTd')}
              margin="normal"
              type="number"
            />
          </div>

          <div>
            <TextField
              id="lvidd"
              label="LVIDd, cm"
              value={LVIDd}
              onChange={this.handleChange('LVIDd')}
              margin="normal"
              type="number"
            />
          </div>

          <div>
            <TextField
              id="lvidd"
              label="PWTd, cm"
              value={PWTd}
              onChange={this.handleChange('PWTd')}
              margin="normal"
              type="number"
            />
          </div>
        </Grid>
      </Grid>

      <br />
      <br />

        <Typography variant="h6" gutterBottom>
          <b>BSA:</b> {bsa.toFixed(2)}, m<sup>2</sup>
          <br />
          <b>LVVm:</b> {lvvm.toFixed(2)}, cm<sup>3</sup>
          <br />
          <b>LVmass (Penn):</b> {LVmassPenn.toFixed(2)}, g
          <br />
          <b>LVmass (ASE):</b> {LVmassASE.toFixed(2)}, g
          <br />
          <b>ILVmass (Penn):</b> {(LVmassPenn / bsa).toFixed(2)}, g/m<sup>2</sup>
          <br />
          <b>ILVmass (ASE):</b> {(LVmassASE / bsa).toFixed(2)}, g/m<sup>2</sup>
        </Typography>
      </div>
    );
  }
}

export default App;
