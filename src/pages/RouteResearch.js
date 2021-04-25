import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid, Link,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import client from '../utils/client';
import Loading from '../components/Loading';
import RouteTable from '../components/routeResearch/RouteTable';
import RouteResearchToolbar from '../components/routeResearch/RouteResearchToolbar';

const RouteResearch = () => {
  const [loadingSystemLocations, setLoadingSystemLocations] = useState(true);
  const [loadingSystemGoods, setLoadingSystemGoods] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [systems, setSystems] = useState([]);
  const [systemGoods, setSystemGoods] = useState([]);
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [bestRoutes, setBestRoutes] = useState({});
  const [systemHighestProfit, setSystemHighestProfit] = useState({ good_symbol: null, profit: 0 });

  useEffect(() => {
    client.get('/systems')
      .then((response) => {
        const newSelectedSystem = response.data[0].system_symbol;

        setSystems(Array.from(new Set(response.data.map((systemLocation) => systemLocation.system_symbol))));
        setSelectedSystem(newSelectedSystem);
      })
      .finally(() => {
        setLoadingSystemLocations(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSystem !== '') {
      setLoadingSystemGoods(true);
      client.get(`/systems/${selectedSystem}/goods`)
        .then((response) => {
          setSystemGoods(response.data);
        })
        .finally(() => {
          setLoadingSystemGoods(false);
        });
    }
  }, [selectedSystem]);

  useEffect(() => {
    let bestRoute = { profit: 0 };
    Object.keys(bestRoutes).forEach((routeKey) => {
      if (bestRoutes[routeKey].profit > bestRoute.profit) {
        bestRoute = bestRoutes[routeKey];
      }
    });

    setSystemHighestProfit(bestRoute);
  }, [bestRoutes]);

  const handleUpdateBestRoute = (bestRoute) => {
    setBestRoutes((prevBestRoutes) => ({
      ...prevBestRoutes,
      [bestRoute.good_symbol]: bestRoute
    }));
  };

  if (loadingSystemLocations) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Route Research | SpaceMonger</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <RouteResearchToolbar
            selectedSystem={selectedSystem}
            systems={systems}
            handleSystemChange={setSelectedSystem}
            estimatedQuantity={estimatedQuantity}
            handleEstimatedQuantityChange={setEstimatedQuantity}
          />
          {loadingSystemGoods === true && <Loading />}
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {systemHighestProfit.good_symbol != null && (
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title={`This systems highest profit is: ${systemHighestProfit.good_symbol}`}
                    />
                    <Divider />
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Buy Location
                              </TableCell>
                              <TableCell>
                                Sell Location
                              </TableCell>
                              <TableCell>
                                Distance
                              </TableCell>
                              <TableCell>
                                Approximate Fuel
                              </TableCell>
                              <TableCell>
                                Buy Quantity Available
                              </TableCell>
                              <TableCell>
                                Sell Quantity Available
                              </TableCell>
                              <TableCell>
                                Buy Price Per Unit
                              </TableCell>
                              <TableCell>
                                Sell Price Per Unit
                              </TableCell>
                              <TableCell>
                                Estimated Profit
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow hover style={{ backgroundColor: 'rgb(173, 222, 184)' }}>
                              <TableCell>
                                <Link
                                  href={`/app/route-research/${systemHighestProfit.buy_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                                >
                                  {systemHighestProfit.buy_location_symbol}
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Link
                                  href={`/app/route-research/${systemHighestProfit.sell_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                                >
                                  {systemHighestProfit.sell_location_symbol}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.distance}
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.approximate_fuel}
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.buy_quantity_available}
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.sell_quantity_available}
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.buy_price_per_unit}
                              </TableCell>
                              <TableCell>
                                {systemHighestProfit.sell_price_per_unit}
                              </TableCell>
                              <TableCell>
                                {estimatedQuantity !== '' ? systemHighestProfit.profit : '?'}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                  </Card>
                </Grid>
              )}
              {loadingSystemGoods === false && systemGoods.map((systemGood) => (
                <Grid
                  item
                  xs={12}
                  key={`${systemGood}`}
                >
                  <RouteTable
                    systemSymbol={selectedSystem}
                    goodSymbol={systemGood}
                    estimatedQuantity={estimatedQuantity}
                    onBestRouteUpdate={handleUpdateBestRoute}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RouteResearch;
