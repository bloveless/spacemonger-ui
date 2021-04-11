import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SystemLocationCard from '../components/systems/SystemLocationCard';
import Loading from '../components/Loading';
import SystemMap from '../components/systems/SystemMap';
import SystemsListToolbar from '../components/systems/SystemsListToolbar';

const Systems = () => {
  const [loadingSystemLocations, setLoadingSystemLocations] = useState(true);
  const [systems, setSystems] = useState([]);
  const [systemLocations, setSystemLocations] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState();
  const [selectedSystemLocations, setSelectedSystemLocations] = useState([]);

  useEffect(() => {
    console.log('loading systems');
    axios.get('http://localhost:8080/systems')
      .then((response) => {
        const newSelectedSystem = response.data[0].system_symbol;

        setSystems(Array.from(new Set(response.data.map((systemLocation) => systemLocation.system_symbol))));
        setSystemLocations(response.data);

        setSelectedSystem(newSelectedSystem);
        setSelectedSystemLocations(response.data.filter((systemLocation) => systemLocation.system_symbol === newSelectedSystem));
      })
      .finally(() => {
        setLoadingSystemLocations(false);
      });
  }, []);

  useEffect(() => {
    setSelectedSystemLocations(systemLocations.filter((systemLocation) => systemLocation.system_symbol === selectedSystem));
  }, [selectedSystem]);

  if (loadingSystemLocations) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Systems | SpaceTraders</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <SystemsListToolbar
            selectedSystem={selectedSystem}
            systems={systems}
            onChange={setSelectedSystem}
          />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <SystemMap systemLocations={selectedSystemLocations} />
              </Grid>
              {selectedSystemLocations.map((systemLocation) => (
                <Grid
                  item
                  key={systemLocation.location_symbol}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <SystemLocationCard systemLocation={systemLocation} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Systems;
