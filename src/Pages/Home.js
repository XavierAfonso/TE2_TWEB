import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../Utils/AuthProvider';
import Post from '../Components/Post';
import axios from 'axios';

const { theme } = require('../Utils/theme');

const drawerWidthFull = 0;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthFull,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '60px 36px 0',
    background: '#eaeff1',
  },
});

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      data: [],
    }
  }

  componentWillMount() {


    // On obtient les 20 premiers films
    this.getPopularMovie().then(val => {

      this.setState({ data: val.data.results });
      console.log(this.state.data);

    }).catch(err => console.log(err));

  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }


  // Get the popular movie
  getPopularMovie = () => {

    return axios.get(`/3/movie/popular?page=1&api_key=f1be4bafe6f7cb0cb84f5948c5b75497`);
    
  }

  //Add or remove movie
  liked = (child) => {
    console.log(child);
  }

  render() {

    return (
      <AuthContext>
        {({ }) => {

          const { classes } = this.props;

          const renderData = this.state.data.map((element, i) => {

            return (

              <Grid key={i} style={{ backgroundColor: 'transparent' }} item xs={6} md={3}>
                <Post liked = {this.liked} element={element} key={i} />
              </Grid>
            )
          });

          return (
            <MuiThemeProvider theme={theme}>
              <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                  <Hidden smUp implementation="css">

                    {/*<Navigator
                      PaperProps={{ style: { width: drawerWidthMobile } }}
                      variant="temporary"
                      open={this.state.mobileOpen}
                      onClose={this.handleDrawerToggle}
                    />*/}

                  </Hidden>
                  <Hidden xsDown implementation="css">
                    {/*<Navigator PaperProps={{ style: { width: drawerWidthFull } }} /> */}
                  </Hidden>
                </nav>
                <div className={classes.appContent}>
                  <Header home="true" onDrawerToggle={this.handleDrawerToggle} />

                  <main className={classes.mainContent}>

                    <Grid container spacing={24}>

                      {renderData}

                    </Grid>

                  </main>
                </div>
              </div>
            </MuiThemeProvider>
          );
        }
        }
      </AuthContext>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);