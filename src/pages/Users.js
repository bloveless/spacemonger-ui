import { Helmet } from 'react-helmet';
import {
  Box, Card, CardHeader,
  Container, Divider, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loading from '../components/Loading';
import client from '../utils/client';

const Users = () => {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, []);

  if (loadingUsers) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Users | SpaceMonger</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Users" />
                  <Divider />
                  <PerfectScrollbar>
                    <Box sx={{ minWidth: 800 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Username
                            </TableCell>
                            <TableCell>
                              Credits
                            </TableCell>
                            <TableCell>
                              Ship count
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow hover key={user.id}>
                              <TableCell>
                                <Link
                                  href={`/app/users/${user.id}`}
                                >
                                  {user.username}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {user.credits}
                              </TableCell>
                              <TableCell>
                                {user.ship_count}
                              </TableCell>
                            </TableRow>
                          ))}
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

export default Users;
