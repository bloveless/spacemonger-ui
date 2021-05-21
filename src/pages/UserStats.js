import { Helmet } from 'react-helmet';
import {
  Box, Button, Card, CardContent, CardHeader, colors,
  Container, Divider, useTheme
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Line } from 'react-chartjs-2';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import client from '../utils/client';
import Loading from '../components/Loading';

const UserStats = () => {
  const theme = useTheme();
  const [loadingUserStats, setLoadingUserStats] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const { user_id: userId } = useParams();

  console.log('userStats', userStats);

  const reloadStats = () => {
    client.get(`/users/${userId}`)
      .then((response) => {
        setUserStats(response.data);
      })
      .finally(() => {
        setLoadingUserStats(false);
      });
  };

  useEffect(() => {
    reloadStats();

    const reloadInterval = setInterval(reloadStats, 10000);

    return () => {
      clearInterval(reloadInterval);
    };
  }, []);

  if (loadingUserStats) {
    return <Loading />;
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: userStats.stats.map((s) => s.credits),
        label: 'Credits',
      },
      {
        backgroundColor: colors.green[500],
        data: userStats.stats.map((s) => s.ship_count),
        label: 'Ship Count',
        fill: false,
      },
    ],
    labels: userStats.stats.map((s) => s.created_at),
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
    <>
      <Helmet>
        <title>User Stats | SpaceMonger</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <CardHeader
              title={userStats.username}
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
        </Container>
      </Box>
    </>
  );
};

export default UserStats;
