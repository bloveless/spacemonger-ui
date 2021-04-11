import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import { Card, Typography } from '@material-ui/core';

const SystemMap = ({ systemLocations }) => {
  const data = {
    labels: systemLocations.map((systemLocation) => `${systemLocation.location_name} (${systemLocation.location_symbol})`),
    datasets: [{
      label: 'System Location',
      data: systemLocations.map((systemLocation) => ({ x: systemLocation.x, y: systemLocation.y })),
      backgroundColor: 'rgb(89, 100, 203)',
    }],
  };

  const options = {
    label: false,
    tooltips: {
      callbacks: {
        label: (tooltipItem, labelData) => {
          const label = labelData.labels[tooltipItem.index];
          return `${label}: (${tooltipItem.xLabel}, ${tooltipItem.yLabel})`;
        }
      }
    },
    legend: {
      display: false,
    },
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '.5em',
      }}
    >
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        System Map
      </Typography>
      <Scatter data={data} options={options} />
    </Card>
  );
};

SystemMap.propTypes = {
  systemLocations: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default SystemMap;
