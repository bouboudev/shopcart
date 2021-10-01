
// module pour travailler avec les fichiers file system lire et ecrire dans fichier json
const fs = require('fs');
// Travailler avec les chemins
const path = require('path');
//package pour générer id
const { v4: uuidv4 } = require('uuid');

// recuperer le chemin de la racine du dossier shop_cart
const appDir = path.dirname(require.main.filename);
// creation du chemin vers le fichier json join pour eviter les slash et antislash
const p = path.join(appDir, 'data', 'products.json');

// pour refactoriser le code
const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent)=> {
           // Si on a une erreur on renvoi tableau vide
           if (err) {
               callback([]);
            }
            else {
            //  si on a un fichier tableau avec les objets
            callback(JSON.parse(fileContent));
        }
    });
}

class Product {
    constructor(name, description, image, price){
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    save(redirectHome){
        // générer id
        this.id = uuidv4();

        getProductsFromFile(products => {
            // ajout du produit
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                if(err) console.log(err);
                redirectHome();
            });
        });
       }
        

// static pour ne pas instensié 
    static findAll(callback){
        getProductsFromFile(products=> {
            callback(products)
        });
    }

    static findById(id, callback){
        getProductsFromFile(products => {
            // methode find pour chercher le produit avec son id 
            const product = products.find(prod => prod.id === id);
            callback(product);
        });
    }
}

module.exports = Product;