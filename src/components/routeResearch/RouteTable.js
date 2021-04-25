import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider, Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import client from '../../utils/client';

const RouteTable = (props) => {
  const {
    systemSymbol, goodSymbol, estimatedQuantity, onBestRouteUpdate
  } = props;
  const [loadingGoodRoutes, setLoadingGoodRoutes] = useState(true);
  const [goodRoutesRaw, setGoodRoutesRaw] = useState([]);
  const [goodRoutes, setGoodRoutes] = useState([]);
  const [isOpen, setIsOpen] = useState(goodSymbol !== 'Fuel');

  useEffect(() => {
    if (isOpen === true) {
      client.get(`/systems/${systemSymbol}/routes/${goodSymbol}`)
        .then((response) => {
          setGoodRoutesRaw(response.data);
        })
        .finally(() => {
          setLoadingGoodRoutes(false);
        });
    }
  }, [isOpen]);

  const calculateProfit = (fromPricePerUnit, toPricePerUnit, approximateFuel) => {
    const purchasePrice = estimatedQuantity * fromPricePerUnit;
    const sellPrice = estimatedQuantity * toPricePerUnit;
    const fuelCost = approximateFuel * 2;

    return sellPrice - purchasePrice - fuelCost;
  };

  useEffect(() => {
    const newRoutes = goodRoutesRaw.map((goodRoute) => ({
      ...goodRoute,
      profit: calculateProfit(goodRoute.buy_price_per_unit, goodRoute.sell_price_per_unit, goodRoute.approximate_fuel),
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
        onBestRouteUpdate(newRoutes[highestIndex]);
      } else {
        onBestRouteUpdate({ good_symbol: goodSymbol, profit: 0 });
      }

      if (lowestIndex >= 0) {
        newRoutes[lowestIndex].isLowestProfit = true;
      }
    }

    setGoodRoutes(newRoutes);
  }, [estimatedQuantity, goodRoutesRaw]);

  const title = estimatedQuantity !== '' ? `${goodSymbol} (Using estimated quantity: ${estimatedQuantity})` : goodSymbol;

  return (
    <Card>
      <CardHeader
        title={title}
        action={(
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          >
            {isOpen ? 'Close' : 'Open'}
          </Button>
        )}
      />
      {isOpen === true && loadingGoodRoutes === true && <Loading />}
      {isOpen === true && loadingGoodRoutes === false && (
        <>
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
                  {goodRoutes.map((goodRoute) => {
                    let backgroundColor = 'inherit';
                    if (goodRoute.isHighestProfit) {
                      backgroundColor = 'rgb(173, 222, 184)';
                    }
                    if (goodRoute.isLowestProfit) {
                      backgroundColor = 'rgb(222, 173, 173)';
                    }

                    return (
                      <TableRow
                        hover
                        key={`${goodRoute.buy_location_symbol}-${goodRoute.sell_location_symbol}-${goodRoute.good_symbol}`}
                        style={{ backgroundColor }}
                      >
                        <TableCell>
                          <Link
                            href={`/app/route-research/${goodRoute.buy_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                          >
                            {goodRoute.buy_location_symbol}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/app/route-research/${goodRoute.sell_location_symbol}?estimatedQuantity=${estimatedQuantity}`}
                          >
                            {goodRoute.sell_location_symbol}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {goodRoute.distance}
                        </TableCell>
                        <TableCell>
                          {goodRoute.approximate_fuel}
                        </TableCell>
                        <TableCell>
                          {goodRoute.buy_quantity_available}
                        </TableCell>
                        <TableCell>
                          {goodRoute.sell_quantity_available}
                        </TableCell>
                        <TableCell>
                          {goodRoute.buy_price_per_unit}
                        </TableCell>
                        <TableCell>
                          {goodRoute.sell_price_per_unit}
                        </TableCell>
                        <TableCell>
                          {estimatedQuantity !== '' ? goodRoute.profit : '?'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </>
      )}
    </Card>
  );
};

RouteTable.propTypes = {
  systemSymbol: PropTypes.string.isRequired,
  goodSymbol: PropTypes.string.isRequired,
  estimatedQuantity: PropTypes.string,
  onBestRouteUpdate: PropTypes.func.isRequired
};

export default RouteTable;
