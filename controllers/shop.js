const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getIndex = (req, res) => {
    Product.findAll(products => {
        // console.log(products);
        res.render('index',{
            title: 'Accueil',
            path: '/',
            // recuperer les produits pour boucler dessus
            products: products
        });
   
    })
    
}

const getProductDetails = (req, res) => {
    Product.findById(req.params.id, product => {
        // console.log(product);
        res.render('product-details', {
            title: product.name,
            product: product
        });   
    });
}
// recuperer le contenut du fichier cart.json
const getCart = (req, res) => {
    Cart.getCart (cart => {
       if(cart.products.length >0){
        Product.findAll(products => {
        
            // tableau créé a partir du panier
            let cartProducts = [];
    
            products.forEach(product => {
            const productData = cart.products.find(prod => prod.id === product.id);
                if (productData) {
                    cartProducts.push({product: product, qty: productData.qty})
                }
            });
    
    
            res.render('cart', {
                title:'Panier',
                path: '/panier',
                // tableau contenant les objets du panier
                cartProducts: cartProducts,
                // recuperer total du panier
                totalPrice: cart.totalPrice,
                // boolean il y a des produits ? 
                hasProducts: true
            });
        });
       }
       else {
        res.render('cart', {
            title:'Panier',
            path: '/panier',
            // boolean il y a des produits ? 
            hasProducts: false
        });
       }
    });
}

const postCart = (req, res) => {
   Product.findById(req.body.productId, product =>  {
       Cart.add(req.body.productId, product.price, () => {
           res.redirect('/panier');
       });
   });
}


module.exports = {
    getIndex: getIndex,
    getProductDetails: getProductDetails,
    getCart: getCart,
    postCart: postCart
    
}