import {
  Box,
  Card,
  CardContent,
  TextField,
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
            <Box sx={{ maxWidth: 500 }}>
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
            </Box>
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
