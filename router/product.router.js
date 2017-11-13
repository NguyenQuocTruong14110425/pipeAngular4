const Product = require('../models/product');
const config = require('../config/database');

module.exports = (router) => {

router.post('/test', (req, res) => {
    res.json({message: ""+req.body.nameproduct});
    
}); 
    router.post('/addproduct', (req, res) => {
        if (!req.body.description) {
            res.json({ success: false, message: 'you must enter input'+req.body.nameproduct });
        }
        else {
                    let newproduct = new Product({
                        nameproduct: req.body.nameproduct,
                        description: req.body.description,
                        price: req.body.price,
                        image: req.body.image,
                        color: req.body.color,
                        size: req.body.size,
                        catalog: req.body.catalog
                    });
                    
            newproduct.save((err, product) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Product allready exists' });
                    }
                    else {
                        if (err.errors) {
                            res.json({ success: false, message: err.message });
                            
                        }
                        else {
                            res.json({ success: false, message: 'Could not save user. Error: ', err });
                        }
                    }
                }
                else
                {
                    res.json({ success: true, message: 'Add product success', products:product });
                }
    });
}
    });
    router.get('/getallproducts', (req, res) => {
      Product.find({}, (err, product) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          if (!product) {
            res.json({ success: false, message: 'No products found.' });
          } else {
            res.json({ success: true, product: product }); 
          }
        }
      }).sort({ '_id': -1 }); 
    });
    router.put('/updateuser', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            User.findOne({ username: req.body.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'false' });
                    }
                    else {
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.address=req.body.address;
                        user.numberphone=req.body.numberphone;
                        user.fullname=req.body.fullname;
                        user.save((err) => {
                            if (err) {
                                res.json({ success: false, message: 'can not save' });
                            }
                            else {
                                res.json({ success: true, message: 'data is updated' });
                            }
                        });
                    }
                }
            });

        }
    });
    // DELETES A USER FROM THE DATABASE
    router.delete('/updateproduct', (req, res) => {
        if (!req.body.id) {
            res.json({ success: false, message: 'no find product' });
        }
        else {
            Product.findOneAndRemove({ _id: req.body.id }, (err, product) => {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!product) {
                        res.json({ success: false, message: 'can not found product' });
                    }
                    else {
                        res.json({ success: true, message: "product " + product.nameproduct + " was deleted" });
                    }
                }
            });
        }
    });
    router.delete('/deleteproduct/:id', function (req, res) {
      if (!req.params.id) {
          res.json({ success: false, message: 'no find product' });
      }
      else
      {
      Product.findByIdAndRemove({_id:req.params.id},function (err,product) {
        if (err){
          res.json({ success: false, message: err }); 
        }
        else
        {
            res.json({ success: true, message: 'Product deleted' });
        }
      });
  }
    });

    router.get('/detailProduct/:id', (req, res) => {
      if (!req.params.id) {
        res.json({ success: false, message: 'No product ID was provided.' }); 
      } else {
        Product.findOne({ _id: req.params.id }, (err, product) => {
          if (err) {
            res.json({ success: false, message: 'Not a valid product id' });
          } else {
            if (!product) {
              res.json({ success: false, message: 'Product not found.' });
            } else {   
                      res.json({ success: true, product: product }); 
                    
                  }
          }
        });
      }
    });
    return router;
}
    