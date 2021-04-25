import { Helmet } from 'react-helmet';
import {
  Box,
  Card, CardContent,
  CardHeader,
  Container,
  Divider,
  Grid, Link,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow, TextField
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useParams } from 'react-router';
import client from '../utils/client';
import Loading from '../components/Loading';

const RouteResearch = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { location_symbol: locationSymbol } = useParams();
  const [loadingLocationRoutes, setLoadingLocationRoutes] = useState(true);
  const [locationRoutesRaw, setLocationRoutesRaw] = useState([]);
  const [estimatedQuantity, setEstimatedQuantity] = useState(urlParams.get('estimatedQuantity') || '');
  const [locationRoutes, setLocationRoutes] = useState([]);

  useEffect(() => {
    client.get(`/locations/${locationSymbol}/routes`)
      .then((response) => {
        setLocationRoutesRaw(response.data);
      })
      .finally(() => {
        setLoadingLocationRoutes(false);
      });
  }, []);

  const calculateProfit = (fromPricePerUnit, toPricePerUnit, approximateFuel) => {
    const purchasePrice = estimatedQuantity * fromPricePerUnit;
    const sellPrice = estimatedQuantity * toPricePerUnit;
    const fuelCost = approximateFuel * 2;

    return sellPrice - purchasePrice - fuelCost;
  };

  useEffect(() => {
    const newRoutes = locationRoutesRaw.map((locationRoute) => ({
      ...locationRoute,
      profit: calculateProfit(locationRoute.buy_price_per_unit, locationRoute.sell_price_per_unit, locationRoute.approximate_fuel),
      isHighestProfit: false,
      isLowestProfit: false
    }));

    if (estimatedQuantity !== '') {
      let highestProfit = Number.MIN_SAFE_INTEGER;
      let highestIndex = -1;
      let lowestProfit = Number.MAX_SAFE_INTEGER;
      let lowestIndex = -1;

      newRoutes.forEach((route, index) => {
        if (route.profit >= highestProfit) {
          highestProfit = route.profit;
          highestIndex = index;
        }

        if (route.profit <= lowestProfit) {
          lowestProfit = route.profit;
          lowestIndex = index;
        }
      });

      if (highestIndex >= 0) {
        newRoutes[highestIndex].isHighestProfit = true;
      }

      if (lowestIndex >= 0) {
        newRoutes[lowestIndex].isLowestProfit = true;
      }
    }

    setLocationRoutes(newRoutes);
  }, [estimatedQuantity, locationRoutesRaw]);

  if (loadingLocationRoutes) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Location Route Research | SpaceMonger</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Estimated Quantity"
                        name="estimated_quantity"
                        onChange={(e) => setEstimatedQuantity(e.currentTarget.value)}
                        value={estimatedQuantity}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <Card>
                  <CardHeader title={locationSymbol} />
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
                              Good
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
                          {locationRoutes.map((locationRoute) => {
                            let backgroundColor = 'inherit';
                            if (locationRoute.isHighestProfit) {
                              backgroundColor = 'rgb(173, 222, 184)';
                            }
                            if (locationRoute.isLowestProfit) {
                              backgroundColor = 'rgb(222, 173, 173)';
                            }

                            return (
                              <TableRow
                                hover
                                key={`${locationRoute.buy_location_symbol}-${locationRoute.sell_location_symbol}-${locationRoute.good_symbol}`}
                                style={{ backgroundColor }}
                              >
                                <TableCell>
                                  <Link
                                    href={`/app/route-research/${locationRoute.buy_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                                  >
                                    {locationRoute.buy_location_symbol}
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <Link
                                    href={`/app/route-research/${locationRoute.sell_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                                  >
                                    {locationRoute.sell_location_symbol}
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  {locationRoute.good_symbol}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.distance}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.approximate_fuel}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.buy_quantity_available}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.sell_quantity_available}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.buy_price_per_unit}
                                </TableCell>
                                <TableCell>
                                  {locationRoute.sell_price_per_unit}
                                </TableCell>
                                <TableCell>
                                  {estimatedQuantity !== '' ? locationRoute.profit : '?'}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </PerfectScrollbar>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RouteResearch;
