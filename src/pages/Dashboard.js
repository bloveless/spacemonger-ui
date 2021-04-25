import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import YourShips from '../components/dashboard/YourShips';
import NetWorth from '../components/dashboard/NetWorth';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | SpaceMonger</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <YourShips />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <NetWorth />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
