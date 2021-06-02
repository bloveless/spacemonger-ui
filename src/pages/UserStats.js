import { Helmet } from 'react-helmet';
import {
  Box, Card, CardContent, CardHeader, colors,
  Container, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, useTheme
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Line } from 'react-chartjs-2';
import client from '../utils/client';
import Loading from '../components/Loading';

const UserStats = () => {
  const theme = useTheme();
  const [loadingUserStats, setLoadingUserStats] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [loadingUserShips, setLoadingUserShips] = useState(true);
  const [userShips, setUserShips] = useState([]);
  const { user_id: userId } = useParams();

  useEffect(() => {
    client.get(`/users/${userId}/ships`)
      .then((response) => {
        setUserShips(response.data);
      })
      .finally(() => {
        setLoadingUserShips(false);
      });
  }, []);

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

    const reloadInterval = setInterval(reloadStats, 100000);

    return () => {
      clearInterval(reloadInterval);
    };
  }, []);

  if (loadingUserStats || loadingUserShips) {
    return <Loading />;
  }

  const creditsData = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: userStats.stats.map((s) => s.credits),
        label: 'Credits',
      },
    ],
    labels: userStats.stats.map((s) => s.created_at),
  };

  const shipsData = {
    datasets: [
      {
        backgroundColor: colors.green[500],
        data: userStats.stats.map((s) => s.ship_count),
        label: 'Ship Count',
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
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <CardHeader
              title={`${userStats.username} Credits`}
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  height: 400,
                  position: 'relative',
                }}
              >
                <Line
                  data={creditsData}
                  options={options}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <CardHeader
              title={`${userStats.username} Ship Count`}
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  height: 400,
                  position: 'relative',
                }}
              >
                <Line
                  data={shipsData}
                  options={options}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <CardHeader
              title={`${userStats.username} Ships`}
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Ship ID
                    </TableCell>
                    <TableCell>
                      Ship Type
                    </TableCell>
                    <TableCell>
                      Class
                    </TableCell>
                    <TableCell>
                      Max Cargo
                    </TableCell>
                    <TableCell>
                      Speed
                    </TableCell>
                    <TableCell>
                      Manufacturer
                    </TableCell>
                    <TableCell>
                      Plating
                    </TableCell>
                    <TableCell>
                      Weapons
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userShips.map((userShip) => (
                    <TableRow hover>
                      <TableCell>
                        <Link
                          href={`/app/users/${userId}/ships/${userShip.ship_id}/transactions`}
                        >
                          {userShip.ship_id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {userShip.ship_type}
                      </TableCell>
                      <TableCell>
                        {userShip.class}
                      </TableCell>
                      <TableCell>
                        {userShip.max_cargo}
                      </TableCell>
                      <TableCell>
                        {userShip.speed}
                      </TableCell>
                      <TableCell>
                        {userShip.manufacturer}
                      </TableCell>
                      <TableCell>
                        {userShip.plating}
                      </TableCell>
                      <TableCell>
                        {userShip.weapons}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default UserStats;
