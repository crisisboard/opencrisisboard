![logo](https://i.imgur.com/DAwXpZs.png)


# OpenCrisisBoard
OpenCrisisBoard (OCB) is a lightweight forum application based on ReForum that enables social-backed, accesssible, long-form and short-form communication around crisis-related topics. OpenCrisisBoard is most useful when deployed in small communities, supported by local government as administrators and moderators. It allows users to log in with verified social media accounts to have meaningful discussions around relevant topics, in addition to offering services such as volunteering.

### Application Features
* Users can log in with verified social accounts (Facebook and Twitter only, no email or account sign up allowed for social proof reasons)
* Users can post a discussion
* Users can reply their opinions regarding discussion
* Users can favorite discussions
* Users have their own profile page
* Admin can create new forum categories
* Admins have a lot of power over every users discussions and opinions

### Documentations
* [API Docs](https://github.com/shoumma/ReForum/blob/master/docs/api.md)
* [System Overview](https://github.com/shoumma/ReForum/blob/master/docs/system_overview.md)

### New Discussions
![home view](https://i.imgur.com/bZjOeMx.png)
### Unlimited Boards
![home view](https://i.imgur.com/33oLs2r.png)
### Login with Facebook or Twitter (It attaches to your post to avoid spread of misinformation)
![home view](https://i.imgur.com/mh3q0Tg.png)
### Admin View (Forum Board Creation/Deletion)
![admin view](https://i.imgur.com/3hKEAy4.png)


## Deploy with Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/crisisboard/opencrisisboard)

In order to deploy to Heroku you will need to create a Heroku account, during deployment you will be prompted for a series of keys:

To add map functionality you will need to obtain keys from Google (this is the only required key needed to deploy)

* [Google Developer Portal](https://developers.google.com/maps/documentation/javascript/get-api-key)

To have social login you will also need keys for Twitter and/or Facebook and/or Github:

* [Twitter Developer Portal](https://developer.twitter.com/)

* [Facebook Developer Portal](https://developers.facebook.com/)

* [GitHub Developer Portal](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

You need to grab the following information from the application.
* Client ID
* Client Secret
* Callback URL

The `Callback URL` is the domain where Twitter or Facebook or Github will redirect the user after a successful login. You can use a domain name or local host. But you need to append the URL with the path `/api/user/authViaTwitter/callback` or `/api/user/authViaFacebook/callback`.

* So, the complete url will look like:
`https://TheNameOfYourApp.herokuapp.com/api/user/authViaTwitter/callback` or `https://TheNameOfYourApp.herokuapp.com/api/user/authViaFacebook/callback` or
`https://TheNameOfYourApp.herokuapp.com/api/user/authViaGitHub/callback`



## Deploy via Docker

The entire application is built to deploy with docker compose, you can edit all of the below environment variables in the file `docker-compose.yml`. The file looks like this:

```
version: "2"
services:
  web:
    build: .
    ports:
    - "8080:8080"
    depends_on:
    - mongo
    environment:
    - PORT=3030
    - DBURL=mongodb://localhost:27017/OpenCrisisBoard'
    - FB_APPID=[FB APP ID HERE]
    - FB_CBURL=[FB CALLBACK URL HERE]
    - FB_SECRET=[FB SECRET HERE]
    - TW_APPID=[TWITTER APP ID HERE]
    - TW_CBURL=[TWITTER CALLBACK URL HERE]
    - TW_SECRET=[TWITTER SECRET HERE]
    - GH_APPID=[GITHUB APP ID HERE]
    - GH_CBURL=[GITHUB CALLBACK URL HERE]
    - GH_SECRET=[GITHUB SECRET HERE]
    - MAP_KEY=[GOOGLE MAPS KEY HERE]
  mongo:
    image: mongo
    ports:
    - "27017:27017"
```

If you are already running mongodb, simply remove the `mongo:` section and expose the port mongo is running on to `27017` on the image:

```
ports:
    - "27017:27017"
```

Then once you're all setup, simply run `docker-compose up` to launch the full forum

## Deploy on your own server

Please make sure you have following software installed in your system:
* Node.js > 6.0
* NPM / Yarn
* Git
* MongoDB

First you need to clone the repository:
```
$ git clone https://github.com/crisisboard/opencrisisboard
```

Then you have to install the necessary dependencies using either NPM or Yarn:
```
$ npm i
```
```
$ yarn
```

Then, ensure the mongodb service is installed and running locally. There are multiple ways of doing this, but [this guide](https://medium.com/swlh/get-up-and-running-with-mongodb-in-under-5-minutes-abc8770b1ef8) should help if you don't know how to do this.

Since the app currently uses Twitter, Facebook, and Github authentication, we need to configure a Twitter and Facebook application and/or GitHub. You can register a new application from these links: 

[Twitter Developer Portal](https://developer.twitter.com/)

[Facebook Developer Portal](https://developers.facebook.com/)

[GitHub Developer Portal](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

We need to grab the following information from the application.
* Client ID
* Client Secret
* Callback URL

The `Callback URL (CBURL)` is the domain where Twitter, Facebook or Github will redirect the user after a successful login. You can use a domain name or local host. But we need to append the URL with the path `/api/user/authViaTwitter/callback` or `/api/user/authViaFacebook/callback`. So, the complete url will look like:
`https://localhost:8080/api/user/authViaTwitter/callback`, `https://localhost:8080/api/user/authViaFacebook/callback`, or `https://localhost:8080/api/user/authViaGithub/callback`

Additionally to add map functionality you will need to obtain keys from Google (this is the only required key needed to deploy)

[Google Developer Portal](https://developers.google.com/maps/documentation/javascript/get-api-key)


Now, we need to configure the credentials inside of the codebase. You can either edit the credentials file directly in `config/credentials.js` or add the details to your environment variables when you run the application:

```js
module.exports = {
  DBURL : process.env.DBURL_URI || process.env.DBURL || 'mongodb://localhost:27017/reforum',

  // facebook details
  FB_APPID : [FB APP ID HERE],
  FB_CBURL : [FB CALLBACK URL HERE],
  FB_FIELDS : ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
  FB_SECRET : [FB SECRET HERE],

  // twitter details
  TW_APPID : [TWITTER APP ID HERE],
  TW_CBURL : [TWITTER CALLBACK URL HERE],
  TW_SECRET : [TWITTER SECRET HERE],

  // github details
  GH_APPID : [GITHUB APP ID HERE],
  GH_CBURL : [GITHUB CALLBACK URL HERE],
  GH_SECRET : [GITHUB SECRET HERE],

  MAP_KEY : [GOOGLE MAPS KEY HERE]
};
```

OR

```
FB_APPID='[FB APP ID HERE]' FB_SECRET='[FB SECRET HERE]' FB_CBURL='[FB CALLBACK URL HERE]' npm run start:dev
```

We need to provide all the information here. You can notice that we need the database url here too. My `local` MongoDB url looks like:

```
mongodb://localhost:27017/OpenCrisisBoard
```

Now we are ready to run the application. You can run either run the development environment of the application which will include Hot-Reload for JS codes using Webpack and the Redux dev tool extension, or you can run the production edition. The default port for developer edition is `3030`, and for production is `process.env.PORT`.

To run the app in development environment:
```
$ PORT=3030 npm run start:dev
```

To run the app in production environment:
```
$ PORT=3030 npm run start
```

Now, if you visit [http://localhost:3030](http://localhost:3030) (if you ran the dev), or the production URL, you will see that the application is up and running. Congratulation! But, wait a minute, it's showing you `Sorry, couldn't find the forum`. That is because, we didn't create any forum yet. You can now sign up via github and then visit the admin panel with the url [http://localhost:3030/admin](http://localhost:3030/admin). The application is currently configured in a way that, the first user will become the admin for the system.

Here we can create new forums and that forum will be displayed in the application. The first forum will be used as default forum.

## Path for Future Work
* Add search functionality
* Add unit tests for both backend and frontend
* Ability to change the name and logo of the site from admin panel.
* Make the installation process more interactive
* Add multiple theme support.
* Add geolocation support 

## License
[MIT License](https://github.com/shoumma/Mister-Poster/blob/master/LICENSE). Do whatever you want to do. :-)

A minimal forum application built with the following technologies:
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Webpack](https://webpack.js.org/)
* [ExpressJS](https://expressjs.com/)
* [PassportJS](http://passportjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [ReForum](https://github.com/proshoumma/ReForum)

## Conclusion
Any pull request, issues and contribution is very appreciated. 


OpenCrisisBoard: 

[Pim de Witte](https://twitter.com/pimdewitte)

[Alex Taylor](https://twitter.com/edencoder)

ReForum (what the project is based on): 

[Provash Shoumma](https://twitter.com/proshoumma)
