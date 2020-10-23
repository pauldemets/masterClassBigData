const express = require("express");
const db = require("./db/db");

const app = express();
app.use(express.json());


app.get('/api/getRestaurant/:id', async (req, res, next) => {
    return new Promise((resolve, reject) => {
        resolve(db.getRestaurantById(req.params.id))
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.post('/api/newRestaurant', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.createRestaurant(req.body))
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.put('/api/restaurants/:restaurant_id', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.updateRestaurant(req.params.restaurant_id, req.body))
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.delete('/api/restaurants/:restaurant_id', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.deleteRestaurant(req.params.restaurant_id))
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.get('/api/restaurants_price_average', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.getAverageRestaurantsPrice())
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.get('/api/restaurants', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.findRestaurantsWithLocation(req.query.long_coordinates, req.query.lat_coordinates, req.query.max_distance))
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});

app.get('/api/restaurants/average_rating', async (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(db.getRestaurantRating())
    }).then((state) => {
        res.status(200).send({
            success: 'true',
            response: state
        })
    }).catch((error) => {
        res.status(500).send({
            success: 'false',
            response: error.toString()
        })
    })
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});