import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const ships = [
  {
    id: 'ckn5bj4d816243651ds6oocj5wpg',
    location: 'XV-BN',
    x: 102,
    y: 92,
    cargo: [
      {
        good: 'FUEL',
        quantity: 81,
        totalVolume: 81
      }
    ],
    spaceAvailable: 19,
    type: 'EM-MK-IV',
    class: 'MK-IV',
    maxCargo: 100,
    speed: 4,
    manufacturer: 'Electrum',
    plating: 10,
    weapons: 20
  },
];

const YourShips = (props) => (
  <Card {...props}>
    <CardHeader title="Your Ships" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Class
              </TableCell>
              <TableCell>
                Type
              </TableCell>
              <TableCell>
                Manufacturer
              </TableCell>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Coordinates
              </TableCell>
              <TableCell>
                Cargo
              </TableCell>
              <TableCell>
                Stats
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ships.map((ship) => (
              <TableRow
                hover
                key={ship.id}
              >
                <TableCell>
                  {ship.id}
                </TableCell>
                <TableCell>
                  {ship.class}
                </TableCell>
                <TableCell>
                  {ship.type}
                </TableCell>
                <TableCell>
                  {ship.manufacturer}
                </TableCell>
                <TableCell>
                  {ship.location}
                </TableCell>
                <TableCell>
                  {`(X: ${ship.x}, Y: ${ship.y})`}
                </TableCell>
                <TableCell>
                  Cargo
                </TableCell>
                <TableCell>
                  <div>
                    Space Available:
                    {ship.spaceAvailable}
                  </div>
                  <div>
                    Max Cargo:
                    {ship.maxCargo}
                  </div>
                  <div>
                    Speed:
                    {ship.speed}
                  </div>
                  <div>
                    Plating:
                    {ship.plating}
                  </div>
                  <div>
                    Weapons:
                    {ship.weapons}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
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
        href="/app/ships"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default YourShips;
