
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

export default function Footer() {
    return (
        <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 Study React
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}