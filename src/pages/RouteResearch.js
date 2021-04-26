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
  const [systemHighestProfits, setSystemHighestProfits] = useState([]);

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
    let currentHighestProfit = Number.MIN_SAFE_INTEGER;
    let currentHighestProfitIndex = -1;
    const highestProfits = [];
    Object.keys(bestRoutes).forEach((routeKey, index) => {
      if (bestRoutes[routeKey].profit > currentHighestProfit) {
        currentHighestProfit = bestRoutes[routeKey].profit;
        currentHighestProfitIndex = index;
      }

      highestProfits.push({ ...bestRoutes[routeKey], isHighestProfit: false });
    });

    if (highestProfits[currentHighestProfitIndex] != null) {
      highestProfits[currentHighestProfitIndex].isHighestProfit = true;
    }

    setSystemHighestProfits(highestProfits.filter((highestProfit) => highestProfit.purchase_location_symbol != null));
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
              {systemHighestProfits.length !== 0 && (
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="This systems highest profits" />
                    <Divider />
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Purchase Location
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
                                Purchase Quantity Available
                              </TableCell>
                              <TableCell>
                                Sell Quantity Available
                              </TableCell>
                              <TableCell>
                                Purchase Price Per Unit
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
                            {systemHighestProfits.map((systemHighestProfit) => (
                              <TableRow
                                hover
                                style={{ backgroundColor: systemHighestProfit.isHighestProfit ? 'rgb(173, 222, 184)' : 'inherit' }}
                              >
                                <TableCell>
                                  <Link
                                    href={`/app/route-research/${systemHighestProfit.purchase_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                                  >
                                    {systemHighestProfit.purchase_location_symbol}
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
                                  {systemHighestProfit.purchase_quantity_available}
                                </TableCell>
                                <TableCell>
                                  {systemHighestProfit.sell_quantity_available}
                                </TableCell>
                                <TableCell>
                                  {systemHighestProfit.purchase_price_per_unit}
                                </TableCell>
                                <TableCell>
                                  {systemHighestProfit.sell_price_per_unit}
                                </TableCell>
                                <TableCell>
                                  {estimatedQuantity !== '' ? systemHighestProfit.profit : '?'}
                                </TableCell>
                              </TableRow>
                            ))}
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
