import {
  Box,
  Card,
  CardContent, Grid,
  TextField
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

const RouteResearchToolbar = ({
  selectedSystem,
  systems,
  handleSystemChange,
  estimatedQuantity,
  handleEstimatedQuantityChange
}) => {
  const systemsLabels = systems.map((system) => ({ value: system, label: system }));

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Select System"
                  name="system"
                  onChange={(e) => handleSystemChange(e.currentTarget.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={selectedSystem}
                  variant="outlined"
                >
                  {systemsLabels.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Estimated Quantity"
                  name="estimated_quantity"
                  onChange={(e) => handleEstimatedQuantityChange(e.currentTarget.value)}
                  value={estimatedQuantity}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

RouteResearchToolbar.propTypes = {
  selectedSystem: PropTypes.string.isRequired,
  systems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSystemChange: PropTypes.func.isRequired,
  estimatedQuantity: PropTypes.string,
  handleEstimatedQuantityChange: PropTypes.func.isRequired
};

export default RouteResearchToolbar;
