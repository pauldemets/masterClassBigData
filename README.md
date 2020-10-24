## Projet individuel : Réalisation d'une API REST en NodeJS avec une base de données MongoDB.

-------------------------------------

#### Voici la liste des tâches à réaliser en mongoDB pour la création d'une base de données en local :

- Création de la bdd → `use masterclass_project`
- Création de l’user Joe →  `db.createUser({ user: "joe", pwd: "doe", roles: ["readWrite"] })`
- Vérifier que Joe est bien créé → `show users`
- On crée la collection à partir d'un fichier JSON (commande à lancer dans le terminal directement) → `mongoimport --db masterclass_project  --collection restaurants --drop --file ~/path/to/restaurants.json`
- On vérifie qu’elle existe → `show collections`
- On vérifie le nombre de restaurants insérés dans notre base → `db.restaurants.count()`
- On ajoute un champ number en 2 et 100 pour tous les restaurants →  `db.restaurants.find().forEach(function(doc){ db.restaurants.update({_id:doc._id}, {$set:{"price":Math.floor(Math.random() * 99) + 2}}) })`
- On ajoute pour chaque restaurant une liste de 5 notes entre 0 et 5 → `db.restaurants.find().forEach(function(doc){ db.restaurants.update({_id:doc._id}, {$set:{"reviews": Array.from({length: 5}, () => Math.floor(Math.random() * 6)) }}) })`
