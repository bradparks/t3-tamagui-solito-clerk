#!/usr/bin/tail -n+2

yarn
yarn web
yarn native # only after yarn web at same time
yarn db-push
yarn studio # to start up your prisma studio PS: the tRPC query will show nothing unless you manually open up Prisma and add a "post", or query an user info in the db!
