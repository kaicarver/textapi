# Quickie API for text notes

This is where I work out a spec for a minimal API to write and read text notes.

It's colossally simple and dumb, but I hope to eventually use it for useful things.

Can test the API here:

https://powerful-anchorage-09770.herokuapp.com/test.html

or here:

https://raw.githack.com/kaicarver/textapi/master/public/test.html

## API

### getting the text

This shows all the text notes:

https://powerful-anchorage-09770.herokuapp.com/gettext

Eventually will be able to request the text for one day, for one hour, etc.

can also just query the database like so:

    sudo heroku pg:psql -c "select created, message from note where created between '2020-07-03' and '2020-07-04';" --app "powerful-anchorage-09770"

    sudo heroku pg:psql -c "select to_char(created AT TIME ZONE 'CEST', 'YYYY/MM/DD') as date, to_char(created AT TIME ZONE 'CEST', 'hh24:mi:ss TZ OF') as time, message from note where created between '2020-07-16' and '2020-07-17' order by created DESC;" --app "powerful-anchorage-09770" 

and even pipe the first one directly into:

    perl ../blog/countpushups.pl

### posting the text

And there will be a less dumb function than `badposttext` for posting text...

## Administration

## setting up the database locally

To be documented.

## deploying

```bash
# make changes, test locally (can also be done from VS Code)
npm run start
# commit any changes
git commit -am "some changes..."
# deploy to Heroku
# (sudo is currently required because of how I installed the Heroku CLI)
sudo git push heroku master
# save to GitHub repo
git push
```

# node-js-getting-started

(below is just the README for the original Heroku example app this is based on)

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
