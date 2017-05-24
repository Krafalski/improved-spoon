# improved-spoon

A hastily written Todo App using express and postgress with the module pg-promise

## Heroku deployment with pg-promise

Check connection - no debugging available for pg-promise yet:

Can use provided code from: https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database

Note: will need npm module `pg` for above to work

Can rewrite this to work with pg-promise ()



### Other changes fro successful deployment:

```
const db                = pgp(process.env.DATABASE_URL)

```

Also,
go to CLI `heroku pg:psql`
manually copy paste/create tables
insert test row if desired


#### The mysterious `.env` file - that syncs up with the cn object in the pg-promise.js file
This .env file is used via the npm module `dotenv` 
`const dotenv            = require ( 'dotenv' );`
Then as middleware 
`dotenv.load();`

For the local version I have inside my `.env` :
```
DB_PASSWORD = 
PORT = 
HOST = 
USER = 

```
Note: no quotes for the strings, no semicolons or commas either

DB_PASSWORD = my computer password for postgres
PORT = 5432 = my standard port for postgres
HOST = localhost 
USER = my user name ( can be found by typing `whoami` in terminal)

