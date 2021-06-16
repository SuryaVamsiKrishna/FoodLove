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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


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
  bannerSt:{
    'position': 'relative',
    'text-align': 'center'
  },
  centered: {
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    //margin: '20em 5em 5em 10em' ,
    'margin-top': '50px', 
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    border: '1px solid',
    'border-color': 'grey',
    borderRadius: 3,
    overflow: "hidden",
    //boxShadow: '0 3px 5px 2px rgba(2, 2, 2, .3)',
  },
  tab: {
    flexGrow: 1,
    width: '100%',
    'min-height': "30em",
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: '#ffad42',
  },
  
  
  /* When you mouse over the container, fade in the overlay title */
  
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
      quantity: 0,
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
    console.log("HI"+window.location.pathname);
    switch (window.location.pathname) {
      case "/":
        this.setState({ value:0 })
        break;
      case "/Books":
       this.setState({ value:1 })
        break;
      case "/Oils":
        this.setState({ value:2 })
        break;
      case "/Equipment":
        this.setState({ value:3 })
        break;
      case "/Medicine":
        this.setState({ value:4 })
        break;
      default:
        break;}
  await axios.get('http://localhost:8080/store').then((response) => {
            //console.log(response.data)
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
                //console.log("HI" + this.state.book_prods)
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
      
  cart_button = async(id,name,qty,p_name)=>{
    const body = {"name": name, "quantity": qty};
    await axios.post(
      `http://localhost:8080/store/${id}`,
      body,
      {lazy: true},
      { headers: { 'Content-Type': 'application/json' } }
      ).then((response) => {
        this.setState({quantity:response.data['quantity']});
        //console.log(response);
      });
    alert("Add the product "+ p_name + " to the cart");
    location.reload();
  };
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
  var banner = require('../images/home-banner.jpg');

  return (
    <div>
    <div className={classes.bannerSt}>
      <img src={banner.default} alt="banner" style={{ padding: "1.5em", width:"95%", display: 'block', 'margin-left': 'auto','margin-right': 'auto'}}></img>
      
    </div>

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
          <Typography variant="body" component="textPrimary" style={{color: 'white'}}>
          <br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit felis vel vehicula hendrerit. Donec a aliquam nulla. Fusce sit amet mauris at nunc vehicula malesuada ut ut dolor. Aenean facilisis cursus arcu, non rutrum dui pulvinar quis. Sed cursus metus et lorem consequat, eget lacinia turpis molestie. Etiam euismod ante ligula. Aenean id magna eu mauris pellentesque varius. Phasellus interdum accumsan malesuada. Morbi vel ipsum leo. Morbi tempor nulla in libero vulputate aliquet. Etiam dictum erat elit, ac interdum urna semper rutrum. Proin ac ex diam. Nulla ultricies placerat sagittis. Morbi auctor diam rutrum augue viverra, ac viverra metus dictum. Aenean tristique risus fringilla sem vestibulum congue.
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
            <Button size="small" color="primary" onClick={()=>this.cart_button(prod._id,"default",1,prod.name)}>
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
            <Button size="small" color="primary" onClick={()=>this.cart_button(prod._id,"default",1,prod.name)}>
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
            <Button size="small" color="primary" onClick={()=>this.cart_button(prod._id,"default",1,prod.name)}>
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
            <Button size="small" color="primary" onClick={()=>this.cart_button(prod._id,"default",1,prod.name)}>
                Add to Cart
              </Button>
              <Button size="small" color="primary" href={`/product/${prod._id}`}>
                Details
              </Button>
            </CardActions>
          </Card>)} </div>
        </TabPanel>
        
      </div>
      </div></Container></div>
  );
}
}

Ecom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Ecom);
