const express = require("express");
const db = require("./db/db");

const app = express();
app.use(express.json());

app.get('/api/getRestaurant/:id', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.getRestaurantById(req.params.id)
    })
});

app.post('/api/newRestaurant', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.createRestaurant(req.body)
    })
});

app.put('/api/restaurants/:restaurant_id', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.updateRestaurant(req.params.restaurant_id, req.body)
    })
});

app.delete('/api/restaurants/:restaurant_id', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.deleteRestaurant(req.params.restaurant_id)
    })
});

app.get('/api/restaurants_price_average', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.getAverageRestaurantsPrice()
    })
});

app.get('/api/restaurants', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.findRestaurantsWithLocation(req.query.long_coordinates, req.query.lat_coordinates, req.query.max_distance)
    })
});

app.get('/api/restaurants/average_rating', async (req, res) => {
    res.status(200).send({
        success: 'true',
        response: await db.getRestaurantRating()
    })
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});