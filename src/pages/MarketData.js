import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import client from '../utils/client';
import Loading from '../components/Loading';
import MarketDataCard from '../components/marketData/MarketDataCard';

const MarketData = () => {
  const [loading, setLoading] = useState(true);
  const [locationGoods, setLocationGoods] = useState([]);
  const { location_symbol: locationSymbol } = useParams();

  useEffect(() => {
    client.get(`/locations/${locationSymbol}/goods`)
      .then((response) => {
        console.log(response.data);
        setLocationGoods(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Market Data | SpaceMonger</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            {locationGoods.map((locationGood) => (
              <Grid
                item
                xs={6}
              >
                <MarketDataCard locationSymbol={locationSymbol} locationGood={locationGood} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MarketData;
