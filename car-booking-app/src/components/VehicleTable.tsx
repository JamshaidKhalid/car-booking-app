import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Image from 'next/image';

interface Vehicle {
  carModel: string;
  price: number;
  phone: string;
  city: string;
  images: { url: string; fileName: string }[];
}

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>Vehicle List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Car Model</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle, index) => (
            <TableRow key={index}>
              <TableCell>{vehicle.carModel}</TableCell>
              <TableCell>{vehicle.price}</TableCell>
              <TableCell>{vehicle.phone}</TableCell>
              <TableCell>{vehicle.city}</TableCell>
              <TableCell>
                {vehicle.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={image.url}
                    alt={image.fileName}
                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
