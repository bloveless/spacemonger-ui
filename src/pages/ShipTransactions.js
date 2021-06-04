import { Helmet } from 'react-helmet';
import {
  Box, Card, CardContent, CardHeader,
  Container, Divider, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import client from '../utils/client';
import Loading from '../components/Loading';

const ShipTransactions = () => {
  const [loadingShipTransactions, setLoadingShipTransactions] = useState(true);
  const [shipTransactions, setShipTransactions] = useState([]);
  const { user_id: userId, ship_id: shipId } = useParams();

  useEffect(() => {
    client.get(`/users/${userId}/ships/${shipId}/transactions`)
      .then((response) => {
        setShipTransactions(response.data);
      })
      .finally(() => {
        setLoadingShipTransactions(false);
      });
  }, []);

  if (loadingShipTransactions) {
    return <Loading />;
  }

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
              title={`Ship ${shipId} Transactions`}
            />
            <Divider />
            <CardContent>
              <PerfectScrollbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Ship ID
                      </TableCell>
                      <TableCell>
                        Transaction Type
                      </TableCell>
                      <TableCell>
                        Good
                      </TableCell>
                      <TableCell>
                        Price Per Unit
                      </TableCell>
                      <TableCell>
                        Quantity
                      </TableCell>
                      <TableCell>
                        Total
                      </TableCell>
                      <TableCell>
                        Location
                      </TableCell>
                      <TableCell>
                        Created At
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipTransactions.map((shipTransaction) => (
                      <TableRow
                        hover
                        style={{
                          backgroundColor: shipTransaction.transaction_type === 'purchase' ? 'rgb(252, 222, 222)' : 'rgb(222, 252, 224)',
                        }}
                      >
                        <TableCell>
                          {shipTransaction.ship_id}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.transaction_type}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.good_symbol}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.price_per_unit}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.quantity}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.total}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.location_symbol}
                        </TableCell>
                        <TableCell>
                          {shipTransaction.created_at}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default ShipTransactions;
