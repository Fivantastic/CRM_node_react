import { useState, useEffect, useRef } from 'react';
import { Avatar, Card, CardContent, Typography, Grid, Box, Container, List, ListItem, ListItemAvatar, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useUser } from '../../../context/authContext.jsx';
import defaultAvatar from '/profile.svg';
import { Toast } from '../../alerts/Toast.jsx';
import './DeliveryRoutes.css'; // Archivo de estilos para la representación visual de la ruta

const URL = import.meta.env.VITE_URL;

export const DeliveryRoutes = () => {
  const token = useUser();
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null); // Nuevo estado para controlar qué envío se muestra en el popup
  const popupRef = useRef(null); // Referencia al elemento del popup

  useEffect(() => {
    getDeliveryUsers();
    getShipments(); // Cargar todos los envíos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedShipment(null);
    }
  };

  const getDeliveryUsers = async () => {
    try {
      const response = await fetch(`${URL}/user/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Usuarios recibidos satisfactoriamente:', responseData);
        setDeliveryUsers(
          responseData.data.filter((user) => user.role === 'deliverer')
        );
      } else {
        const errorData = await response.json();
        console.error('Error al obtener las rutas de reparto', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener las rutas de reparto',
        });
      }
    } catch (error) {
      console.error('Error al obtener las rutas de reparto', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener las rutas de reparto',
      });
    }
  };

  const getShipments = async () => {
    try {
      const response = await fetch(`${URL}/shipments/deliverer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Envíos recibidos satisfactoriamente:', responseData);
        setShipments(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener los envíos:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener los envíos:', error);
    }
  };

  const handleViewShipments = (userId) => {
    if (selectedUser === userId) {
      setSelectedUser(null); // Si se hace clic nuevamente en el mismo usuario, ocultar los envíos
    } else {
      setSelectedUser(userId);
    }
  };

  const handlePickupPointClick = (shipmentId) => {
    setSelectedShipment(shipmentId); // Actualizar el estado para mostrar los detalles del envío en el popup
  };

  // Filtrar los envíos basados en el nombre del repartidor seleccionado
  const selectedDelivererName = selectedUser ? deliveryUsers.find(user => user.id_user === selectedUser)?.name : null;
  const filteredShipments = selectedDelivererName
    ? shipments.filter(shipment => shipment.deliverer === selectedDelivererName)
    : [];

  return (
    <section id="delivery_route" className="delivery_route">
      <Container>
        <Typography variant="h4" gutterBottom>
          Lista de repartidores
        </Typography>
        <List>
          {deliveryUsers.map((user) => (
            <Box key={user.id_user} mb={2}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar src={user.avatar || defaultAvatar} alt="Avatar" />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Repartidor
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleViewShipments(user.id_user)}>
                        {selectedUser === user.id_user ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Collapse in={selectedUser === user.id_user} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {filteredShipments.length > 0 ? (
                        filteredShipments.map((shipment) => (
                          <ListItem key={shipment.id_shipment} button onClick={() => handlePickupPointClick(shipment.id_shipment)}>
                            <ListItemAvatar>
                              <Avatar src='/shipmentRoute.svg' alt="Shipment" />
                            </ListItemAvatar>
                            <ListItemText primary={shipment.customer_name} secondary={shipment.delivery_address} />
                            {shipment.id_shipment === selectedShipment && (
                              <Box className="popup" ref={popupRef}>
                                <Typography variant="h6">Detalles del envío</Typography>
                                <Typography><strong>Nombre:</strong> {shipment.customer_name}</Typography>
                                <Typography><strong>Compañía:</strong> {shipment.company_name}</Typography>
                                <Typography><strong>Dirección:</strong> {shipment.delivery_address}</Typography>
                                <Typography><strong>NIF:</strong> {shipment.NIF}</Typography>
                                <Typography><strong>Producto:</strong> {shipment.product_name}</Typography>
                                <Typography><strong>Cantidad:</strong> {shipment.product_quantity}</Typography>
                                <Typography><strong>Ciudad:</strong> {shipment.address_city}</Typography>
                                <Typography><strong>Teléfono:</strong> {shipment.customer_phone}</Typography>
                              </Box>
                            )}
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary="Este repartidor no tiene envíos asociados" />
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Box>
          ))}
        </List>
      </Container>
    </section>
  );
};
