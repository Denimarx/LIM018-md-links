#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { stats } = require('./functionmd.js');
console.log('\n' + '-------------------------------------------------------------------------------')
console.log('--------------------------------- Bienvenido a Md-Link ------------------------')
console.log('-------------------------------------------------------------------------------')
console.log('\n')

const argument = process.argv;
const path = argument[2]

if (argument[2] && argument[3] == '--validate' && argument[4] !== '--stats') {
    mdLinks(path, { validate: true })
        .then((result) =>
            console.log(result))
        .catch(err => 
            console.log(err))
}
if (argument[2] && argument[3] == '--stats' && argument[4] !== '--validate') {
    mdLinks(path, { validate: true })
        .then((result) => {
            //console.log(result);
            const statusLink3 = stats(result);
            console.log(`Total : ${statusLink3.Total}`);
            console.log(`Unique : ${statusLink3.Unique}`);
            console.log(`Broken : ${statusLink3.Broken}`);
            //console.log(result);
        })
        .catch(err => console.log(err))
}
if ((argument[2] && argument[3] === '--validate' && argument[4] === '--stats') ||
    (argument[2] && argument[3] === '--stats' && argument[4] === '--validate')) {
    mdLinks(path, { validate: true })
        .then((resolve) => {
            console.log('\n' + '------------------------VALIDATE----------------------')
            console.log(resolve)
            const statusLink2 = stats(resolve);
            console.log('------------------------STATS----------------------')
            console.log(`Total : ${statusLink2.Total}`);
            console.log(`Unique : ${statusLink2.Unique}`);
            console.log(`Broken : ${statusLink2.Broken}`);

        })
        .catch((err) => {
            console.log(err)
        });
};
