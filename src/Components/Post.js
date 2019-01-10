import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';


const styles = theme => ({
  card: {
    //maxWidth: 700,
    marginTop:'10px',
  },
  media: {
    height: 0,
    paddingTop: '16.25%', // 16:9
    //paddingLeft:'100px',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      //marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  chip: {
    margin: theme.spacing.unit,
  },

});

class RecipeReviewCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      expanded: false,
      element : null,
      like : false,
      //title : "",
      //poster_path : "",


    };

    
    this.state.element = this.props.element;
    //this.state.title = 

  }

  // MoreVertIcon Click (Find the Position, I think) 
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // Close MoreVertIcon
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /*componentDidMount() {
    PDFObject.embed("../pdf/main.pdf", "#example1");
  }*/

  // Expand the pdf part
  handleExpandClick = () => {
    console.log("EXPAND");
    this.setState(state => ({ expanded: !state.expanded }));
  };

  // More Info
  moreInfo = () => {
    console.log("More Info");
    this.handleClose();
  }

   // Comments
   showComments = () => {
    console.log("Comments");
    this.handleClose();
  }

  // Delete
  deletePost = () => {
    console.log("Delete ID : " + this.state.id);
    this.props.delete(this.state.id);
  }

  // Delete
  editPost = () => {
    //console.log("Edit ID : " + this.state.id);
    this.props.edit(this.props.data);
  }

  // Favorite
  clickFavorite = () => {
    console.log("Favorite");
    this.setState({like: !this.state.like});
    this.props.liked(this.state.element);
  }

  // Share
  clickShare = () => {
    console.log("Share");
  }


  goProfilUser = () => {

    console.log("GO PROFIL");
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }
  
  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const posterUrl = `https://image.tmdb.org/t/p/w500/${this.state.element.poster_path}`;

    return (
      
      <Card className={classes.card} >
   

       <CardContent style={{marginLeft:'10px'}}>

        <Typography variant="h6" style={{paddingBottom:'10px'}}>
          {this.state.element.title}
        </Typography>

        <Typography variant="h6" style={{paddingBottom:'10px'}}>
          {this.state.title}
          </Typography>

          <Typography component="p">
          {this.state.description}
          </Typography>
        </CardContent>

        <CardContent>
         
        <img src={posterUrl} alt={this.state.element.title} height={200} width="auto" />
      
        
        </CardContent>
        
        
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton 
          aria-label="Add to favorites"
          onClick={this.clickFavorite}
          >

          {this.state.like ?   <FavoriteIcon style={{color:'red'}}/> : <FavoriteIcon/> }
          
          </IconButton>

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
            
          </IconButton>
      

        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          
          <CardContent>

            
          <p>
            Release date : {this.state.element.release_date}
          </p>

          </CardContent>

        </Collapse>
       

      </Card>
    );
  };

  componentDidUpdate(prevProps) {

    if (this.props.data !== prevProps.data) {

      console.log("DATA CHANGE");
            
      this.setState({
        firstTime : false,
      });
    }
  }

  componentWillMount() {

    //return axios.get(`/3/movie/popular?page=1&api_key=f1be4bafe6f7cb0cb84f5948c5b75497`);
    //http://api.themoviedb.org/3/genre/movie/list?api_key=<YOUR_API_KEY>

  }

}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
