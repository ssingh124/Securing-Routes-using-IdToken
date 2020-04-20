# Securing-Routes-using-IdToken

Securing Routes using Id Token is an importent topic.


You need to go to https://www.googleapis.com/oauth2/v3/certs in order to get new keys and then replace them with the old keys. These keys update after a few hours. So one way is to update them mannualy every time or use a cron job to update these keys after every few hours.


To Test this concept install modHeader, a google chrome extension to pass Id token to this file.
https://developers.google.com/oauthplayground/In mod Heafer extension add Autherization  bearer and your_id_token.  (You can get you id token from )


Install these paskages as well:
npm install jsonwebtoken --save
npm install jwk-to-pem --save
