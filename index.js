let express = require('express');
let app = express();
let jwt = require('jsonwebtoken');
let jwkToPem = require('jwk-to-pem')
let sqlite = require('sqlite');


function setupServer(db) {


    app.use("/", (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401).send("Sorry, you cannot access this route.")
        } else {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]
            // res.send(token);

jwks = 
    {
        "keys": [
          {
            "kid": "6fcf413224765156b48768a42fac06496a30ff5a",
            "e": "AQAB",
            "kty": "RSA",
            "alg": "RS256",
            "n": "1sUr077w2aaSnm08qFmuH1UON9e2n6vDNlUxm6WgM95n0_x1GwWTrhXtd_6U6x6R6m-50mVS_ki2BHZ9Fj3Y9W5zBww_TNyNLp4b1802gbXeGhVtQMcFQQ-hFne5HaTVTi1y6QNbu_3V1NW6nNAbpR_t79l1WzGiN4ilFiYFU0OVjk7isf7Dv3-6Trz9riHBExl34qhriu3x5pfipPT1rf4J6jMroJTEeU6L7zd9k_BwjNtptS8wAenYaK4FENR2gxvWWTX40i548Sh-3Ffprlu_9CZCswCkQCdhTq9lo3DbZYPEcW4aOLBEi3FfLiFm-DNDK_P_gBtNz8gW3VMQ2w",
            "use": "sig"
          },
          {
            "e": "AQAB",
            "kty": "RSA",
            "alg": "RS256",
            "n": "ya_7gVJrvqFp5xfYPOco8gBLY38kQDlTlT6ueHtUtbTkRVE1X5tFmPqChnX7wWd2fK7MS4-nclYaGLL7IvJtN9tjrD0h_3_HvnrRZTaVyS-yfWqCQDRq_0VW1LBEygwYRqbO2T0lOocTY-5qUosDvJfe-o-lQYMH7qtDAyiq9XprVzKYTfS545BTECXi0he9ikJl5Q_RAP1BZoaip8F0xX5Y_60G90VyXFWuy16nm5ASW8fwqzdn1lL_ogiO1LirgBFFEXz_t4PwmjWzfQwkoKv4Ab_l9u2FdAoKtFH2CwKaGB8hatIK3bOAJJgRebeU3w6Ah3gxRfi8HWPHbAGjtw",
            "use": "sig",
            "kid": "f9d97b4cae90bcd76aeb20026f6b770cac221783"
          }
        ]
      }



            // First need to find out which key id is being used, we can get this from the header
            var d = jwt.decode(token, { complete: true });
            // res.send(d);

            try {
                // Need to convert the key to PEM format
                var pem;
                if (d.header.kid) {
                    jwks.keys.forEach(k => {
                        if (k.kid == d.header.kid)
                            // res.send(d.header.kid)
                            pem = jwkToPem(k);
                    });
                }

                console.log(pem);

             


                var result = jwt.verify(token, pem);
                next()
            } catch (err) {
                res.status(401).send("Sorry! Your token is invalid.")
                // err
            }

        }
    })

  

    app.get('/info', (req, res) => {
        res.send('Full stack example');
    });

    // retrieve all unique stree names
    app.get('/streets', (req, res) => {
        db.all(`SELECT DISTINCT(name) FROM BikeRackData`)
            .then(data => {
                console.log(data);
                res.send(data);
            });
    });

    app.get('/streets/:street/', (req, res) => {
        let streetName = req.params.street;
        // query based on street
        // NOTE: this is open to SQL injection attack
        db.all(`SELECT * FROM BikeRackData WHERE name = '${streetName}'`)
            .then(data => {
                res.send(data);
            });


    });



    let server = app.listen(8080, () => {
        console.log('Server ready', server.address().port);
    });

}

sqlite.open('database.sqlite').then(db => {
    //console.log('database opened', db);

    setupServer(db);
    //return db.all('SELECT * from TEST');

})
