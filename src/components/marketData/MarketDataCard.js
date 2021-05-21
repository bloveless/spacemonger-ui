import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Box, Button, Card, CardContent, CardHeader, colors, Divider, useTheme
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import client from '../../utils/client';
import Loading from '../Loading';

const MarketDataCard = ({ locationSymbol, locationGood, ...rest }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    client.get(`/locations/${locationSymbol}/market-data/${locationGood}?days_ago=7`)
      .then((response) => {
        setMarketData(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: marketData.map((marketDatum) => marketDatum.quantity_available),
        label: 'Quantity Available'
      },
    ],
    labels: marketData.map((marketDatum) => marketDatum.created_at),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...rest}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
  )}
        title={locationGood}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

MarketDataCard.propTypes = {
  locationSymbol: PropTypes.string.isRequired,
  locationGood: PropTypes.string.isRequired,
};

export default MarketDataCard;
