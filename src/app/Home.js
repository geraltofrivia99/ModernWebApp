import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import * as Actions from '&/redux/actions'

import Header from './Header'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
  paper: {
    margin: 'auto',
    marginTop: '10%',
    width: '40%',
    padding: 15
  },
  btn: {
    marginRight: 20
  }
}

class Home extends React.Component{
  // Функции вызывают dispatch на действия increase или decrease
  increase = () => {
    this.props.increase()
  }
  decrease = () => {
    this.props.decrease()
  }
  render(){
    return (
      <div>
        <Helmet>
          <title>MWA - Home</title>
          <meta name="description" content="Modern Web App - Home Page" />
        </Helmet>
        <Header/>
        <Paper elevation={4} style={styles.paper} align="center">
          <Typography variant="h5">Redux-Counter</Typography>
          <Typography variant="subtitle1">Counter: {this.props.count}</Typography>
          <br/>
          <Button variant="contained" color="primary" onClick={this.increase} style={styles.btn}>Increase</Button>
          <Button variant="contained" color="primary" onClick={this.decrease}>Decrease</Button>
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  count: state.count
})

const mapDispatchToProps = {
  increase: Actions.increase,
  decrease: Actions.decrease
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)