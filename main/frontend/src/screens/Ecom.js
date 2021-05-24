//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



const useStyles = theme => ({
  root: {
    //margin: '20em 5em 5em 10em' ,
    'margin-top': '50px', 
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    border: '1px solid',
    'border-color': 'grey',
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(2, 2, 2, .3)',
  },
  tab: {
    flexGrow: 1,
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: '#ffad42',


  },
  cards:{
    display: 'flex',
    //'align-content': 'space-around',
    'justify-content': 'space-around',
    flex: '1 0 auto',
    flexWrap: 'wrap',
  },
  card: {
    margin: '2em',
    display: 'flex',
    flexDirection: 'column',
    padding: '2px',
    width: 325,
    height: 350,
    boxShadow: '0 3px 5px 2px rgba(2, 2, 2, .3)',
  },
  content: {
    
  },
  media: {
    height: 200,
    
  },
  indicator:{
    background: "#f57c00",
    'color': "white",
    boxShadow: '0 1px 0px 0px #bb4d00',
    
    
    '&$selected': {
      color: '#ffffff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    
  },
});

class Ecom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      prods : [],
      book_prods: [],
      oil_prods: [],
      eq_prods: [],
      med_prods: [],
      item : ""
    }
  };

  
  
  changeHandler = (event) => {
    this.setState({item: event.target.value})
  }
  componentDidMount = async() =>{
  await axios.get('http://localhost:8080/store').then((response) => {
            console.log(response.data)
            let data = [];
            
            console.log(response.data)
            for(var i =0; i < response.data.length; i++){
                data.push(response.data[i])
            }
            this.setState({prods: data})
            for( var j =0; j < this.state.prods.length; j++){
              //console.log(data)
              if (this.state.prods[j].category === "BOOK"){
                this.state.book_prods.push(this.state.prods[j])
                console.log("HI" + this.state.book_prods)
              }
              if (this.state.prods[j].category === "OIL"){
                this.state.oil_prods.push(this.state.prods[j])
              }
              if (this.state.prods[j].category === "EQUIPMENT"){
                this.state.eq_prods.push(this.state.prods[j])
              }
              if (this.state.prods[j].category === "MEDICINE"){
                this.state.med_prods.push(this.state.prods[j])
              }

            }
        })
        .catch((error)=> console.log(error));
      };
  cart_button(click){

  }
  //addToCart(prod_id, quantity=1) {
    //axios({
      //method: 'POST',
     // url: 'http://localhost:8080/store/cart',
      //data: {
       // id: prod_id,
       // qty: quantity
      //}
    //});
    //alert("Product added to cart")
  //}
  
  render() {
  const { classes } = this.props;
  //const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  return (
    <Container>
    <div className={classes.root}>
    <div className={classes.tab}>
      <AppBar position="static" color="default">
        <Tabs
          value={this.state.value}
          onChange={handleChange}
          indicatorColor="primary"
          className = {classes.indicator}
          TabIndicatorProps={{style: {backgroundColor: "white"}}}
          //centered
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Books" {...a11yProps(1)} />
          <Tab label="Oils" {...a11yProps(2)} />
          <Tab label="Equipment" {...a11yProps(3)} />
          <Tab label="Medicine" {...a11yProps(4)} />
          
        </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <Typography variant="h3" component="h2" style={{color: 'white'}}>
            About the Store
          </Typography>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        <div className={classes.cards}>
        {this.state.book_prods.map((prod, index) =>
          <Card className={classes.card} key={index}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={prod.imageUrl}
              title={prod.name}
            />
            <CardContent className="cardcontent">
              <Typography gutterBottom variant="h5" component="h2">
                {prod.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {prod.description.substring(0, 25)}...
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" >
              Add to Cart
            </Button>
            <Button size="small" color="primary" href={`/product/${prod._id}`}>
              Details
            </Button>
          </CardActions>
        </Card>)} 
        </div>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Two
          <div className={classes.cards}>
          {this.state.oil_prods.map((prod, index) =>
          <Card className={classes.card} key={index}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={prod.imageUrl}
                title={prod.name}
              />
              <CardContent className="cardcontent">
                <Typography gutterBottom variant="h5" component="h2">
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {prod.description.substring(0, 25)}...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
              <Button size="small" color="primary" href={`/product/${prod._id}`}>
                Details
              </Button>
            </CardActions>
          </Card>)}</div> 
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          Item Three
          <div className={classes.cards}>
          {this.state.eq_prods.map((prod, index) =>
          <Card className={classes.card} key={index}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={prod.imageUrl}
                title={prod.name}
              />
              <CardContent className="cardcontent">
                <Typography gutterBottom variant="h5" component="h2">
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {prod.description.substring(0, 25)}...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
              <Button size="small" color="primary" href={`/product/${prod._id}`}>
                Details
              </Button>
            </CardActions>
          </Card>)} </div>
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
        <div className={classes.cards}>
        {this.state.med_prods.map((prod, index) =>
          <Card className={classes.card} key={index}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={prod.imageUrl}
                title={prod.name}
              />
              <CardContent className="cardcontent">
                <Typography gutterBottom variant="h5" component="h2">
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {prod.description.substring(0, 25)}...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
              <Button size="small" color="primary" href={`/product/${prod._id}`}>
                Details
              </Button>
            </CardActions>
          </Card>)} </div>
        </TabPanel>
        
      </div>
      </div></Container>
  );
}
}

Ecom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Ecom);
