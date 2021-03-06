import {
  Box,
  Card,
  CardContent, Grid,
  TextField
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

const SystemsListToolbar = ({
  selectedSystem, systems, onChange, ...rest
}) => {
  const systemsLabels = systems.map((system) => ({ value: system, label: system }));

  return (
    <Box {...rest}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Select System"
                  name="system"
                  onChange={(e) => onChange(e.target.value)}
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
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

SystemsListToolbar.propTypes = {
  selectedSystem: PropTypes.string.isRequired,
  systems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SystemsListToolbar;
