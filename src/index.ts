import express from 'express';
import cors from 'cors';
import cotoRoutes from './routes/coto.routes';
import userRoutes from './routes/user.routes';
import propertyTypeRoutes from './routes/propertyType.routes';
import residenceRoutes from './routes/residence.routes';
import vehicleRoutes from './routes/vehicle.routes'
import controllAccessRoutes from './routes/controllAccess.routes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/coto', cotoRoutes);
app.use('/user', userRoutes);
app.use('/propertyType', propertyTypeRoutes);
app.use('/residence', residenceRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/controllAccess', controllAccessRoutes)

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

