# improved-spoon

A hastily written Todo App using express and postgress with the module pg-promise

Heroku deployment with pg-promise

heroku deployment - check connection - no debugging available for pg-promise yet

Can use provided code from: https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database

Note: will need npm module `pg` for above to work

Can rewrite this to work with pg-promise ()

Other changes fro successful deployment:

```
const db                = pgp(process.env.DATABASE_URL)

```

Also,
go to CLI `heroku pg:psql`
manually copy paste/create tables
insert test row if desired
