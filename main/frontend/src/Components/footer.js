import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
export default function Footer() {
    return (
        <AppBar position="static" color="primary" style={{ marginTop:"2em", marginBottom: 0, background:"black", overflow:"hidden"}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 FoodLove
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}