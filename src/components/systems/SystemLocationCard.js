import PropTypes from 'prop-types';
import {
  Box, Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

const SystemLocationCard = ({ systemLocation, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {`${systemLocation.location_name} (${systemLocation.location_symbol})`}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {systemLocation.location_type}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body2"
      >
        {`(X: ${systemLocation.x}, Y: ${systemLocation.y})`}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body2"
      >
        {`${systemLocation.system_name} (${systemLocation.system_symbol})`}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        />
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            href={`/app/market-data/${systemLocation.location_symbol}`}
          >
            View Market Data
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

SystemLocationCard.propTypes = {
  systemLocation: PropTypes.object.isRequired
};

export default SystemLocationCard;
