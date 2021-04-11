import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
        >
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {`${systemLocation.system_name} (${systemLocation.system_symbol})`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

SystemLocationCard.propTypes = {
  systemLocation: PropTypes.object.isRequired
};

export default SystemLocationCard;
