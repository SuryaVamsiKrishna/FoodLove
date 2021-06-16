import { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, CardActionArea, Container } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = theme => ({
  root: {
    display: 'flex',
    margin: '5em 5em 0 0',
    padding: '2em',
    height: 400,
    maxWidth: 1200
  },
  details: {
    marginLeft: '2em',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 400,
    maxWidth: 600,
    border: '1px solid black'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mod_img: {
    backgroundColor: theme.palette.background.paper,
    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class Prod_details extends Component{
    constructor(props){
        super(props);
        this.state ={
            Product: [],
            quantity: 0,
            open: false,
            item: ""
        }
    };
    componentDidMount = async() => {
        
        await axios.get(`http://localhost:8080/store/${this.props.match.params.id}`).then((response) => {
            this.setState({Product: response.data});
            console.log(this.state.Product);
        }).catch((error) => {
            console.log(error);
        });
    }
    cart_button (id,u_name,qty){
      const body = {name: u_name, quantity: qty};
      axios.post(
        `http://localhost:8080/store/${id}`,
        body,
        { headers: { 'Content-Type': 'application/json' } },
        {lazy:true},
        ).then((response) => {
          //this.setState({qty:response['quantity']});
          console.log(response);
        });
        alert("Adding product to the cart");
        history.back();
    };
    
    render(){
    const { classes } = this.props;
    const handleOpen = () => {
      this.setState({open: true});
    };
  
    const handleClose = () => {
      this.setState({open: false});
    };
    //const theme = useTheme();
    return(
        <div>
          <Container>
            <Card className={classes.root} >
            
            <CardMedia
                className={classes.cover}
                image={this.state.Product.imageUrl}
                title={"Click to view full image"}
                onClick={handleOpen}
            />
            
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.open}>
                <div className={classes.mod_img}>
                  <img src={this.state.Product.imageUrl} style={{maxWidth:800, maxHeight:1000}} alt={this.state.Product.name}/>
                </div>
              </Fade>
            </Modal>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {this.state.Product.name}
                </Typography><br></br><Divider /><br/><br/>
                <Typography variant="subtitle1" >
                  <Box fontWeight="fontWeightBold" m={1}>
                  About the product:
                  </Box>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {this.state.Product.description}
                </Typography><br></br>
                <Typography component="h6" variant="h5">
                    Price: $ {this.state.Product.price}
                </Typography><br/>
                <Button variant="outlined" color="secondary" onClick={()=>this.cart_button(this.state.Product._id,"default",1)}>
                  Add to cart
                </Button>
                </CardContent>
            </div>
            
            </Card>
            </Container>
        </div>
    )}
};

Prod_details.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Prod_details);