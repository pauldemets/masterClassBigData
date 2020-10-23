const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const uri = "mongodb://joe:doe@localhost:27017/masterclass_project";
const client = new MongoClient(uri, { useUnifiedTopology: true });


async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db =>
        console.log(` - ${db.name}`),
    );
};

async function getRestaurantById(restaurant_id) {
    try {
        result = await client.db("masterclass_project").collection("restaurants")
            .findOne({ _id: ObjectId(restaurant_id) });

        if (result) {
            return result;
        } else {
            return 'Not finding data...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}

async function createRestaurant(body) {
    try {
        result = await client.db("masterclass_project").collection("restaurants")
            .insertOne(
                { name: body.name, long_coordinates: body.long_coordinates, lat_coordinates: body.lat_coordinates }
            );

        if (result) {
            return `Insert new restaurant #${result.insertedId}`;
        } else {
            return 'error...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}

async function updateRestaurant(restaurant_id, body) {
    try {
        result = await client.db("masterclass_project").collection("restaurants")
            .updateOne(
                { _id: ObjectId(restaurant_id) },
                { $set: { name: body.name, long_coordinates: body.long_coordinates, lat_coordinates: body.lat_coordinates } }
            );
        if (result) {
            return `Edited restaurant #${restaurant_id}`;
        } else {
            return 'error...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}

async function deleteRestaurant(restaurant_id) {
    try {

        result = await client.db("masterclass_project").collection("restaurants")
            .deleteOne({ _id: ObjectId(restaurant_id) });

        if (result) {
            return `Deleted restaurant #${restaurant_id} successful.`;
        } else {
            return 'error...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}

async function findRestaurantsWithLocation(long_coordinates, lat_coordinates, max_distance) {
    try {
        console.log(long_coordinates);
        await client.db("masterclass_project").collection("restaurants").createIndex({ "location": "2dsphere" });

        result = await client.db("masterclass_project").collection("restaurants")
            .find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(long_coordinates), parseFloat(lat_coordinates)]
                        },
                        $maxDistance: parseInt(max_distance),
                        $minDistance: 0
                    }
                }
            }).toArray();


        if (result) {
            return result;
        } else {
            return 'error...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}


async function getAverageRestaurantsPrice() {
    try {
        result = await client.db("masterclass_project").collection("restaurants")
            .aggregate(
                [
                    {
                        $group:
                            { _id: "", avg_price: { $avg: "$price" } }
                    }
                ]
            ).toArray();

        if (result) {
            return `Average price for all the restaurants is ${result[0].avg_price}`;
        } else {
            return 'error...';
        }
    } catch (e) {
        return new Error(e);
    }
}

async function getRestaurantRating() {
    try {
        result = await client.db("masterclass_project").collection("restaurants")
            .aggregate(
                [{ $project: { _id: "$_id", name: "$name", avg_stars: { $avg: "$reviews" } } }]
            ).toArray();

        if (result) {
            return result;
        } else {
            return 'error...';
        }
    }
    catch (e) {
        return new Error(e);
    }
}


async function main() {
    try {
        console.log('Connection to DB...');
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        //   await client.close();
    }
}

main().catch(console.error);


module.exports = { getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantRating, getAverageRestaurantsPrice, findRestaurantsWithLocation };