# vbase
Project 2501

http://vbase.games 

## installation

After cloning the repo:

Run with `npm i`, `npm run build` and `npm start` to run the app (FE) server

### Misc maintenance items

- Run the API on `sitemap-generate` to generate the content and paste it on sitemap.xml

### language (how do the app infers the language)

- if no specific language-bound address, gets address from location lib
- redirects (302) to a language-bound address

## run on production

### Rebuild

Run `npm run build:prod`

## TODO

+ Delete API server files
+ Upgrade all libs on package.json
+ Install/setup lint again
+ Modernize node.js server code
+ Make app run on Parcel.js
- Install and run babel on build time
- Test all app functionalities
- Support language change (localStorage)
- Rewrite frontend code to adapt to Hooks (and less reducer actions too)