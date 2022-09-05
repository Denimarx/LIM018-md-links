const fs = require('fs');
const path = require('path');
//const fetch = require('node-fetch');

const readDir = (routeDir) => fs.readdirSync(routeDir);
const existPath = (route) => fs.existsSync(route);
//const absolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
const isAbsolute = (ruta) => path.isAbsolute(ruta);
const changeAbsolute = (ruta) => path.resolve(ruta);
const isDirectory = (route) => fs.statSync(route).isDirectory();
//const extensionPath = (ruta) => path.extname(ruta)

// CONSOLE.LOG DE PRUEBA
console.log ('Maria esta aquí');  //prueba

//numeros
const numeros = [21, 34, 45, 102];
console.log(numeros);             //prueba

//suma
const suma = (numA, numB) => {   //prueba
    return numA + numB
}
console.log (suma(4,3));

//resta
const resta = (numA, numB) => {   //prueba
    return numA - numB
}
console.log (resta(4,3));

// FUNCION VER SI RUTA ES .MD
const isMdPath = (route) => {
    const extnPath = path.extname(route);
    if (extnPath === '.md') {
      return true;
    } else {
      console.log('La ruta no es archivo .md');
    }
  };
  console.log(isMdPath("./MyCarpeta/subcarpeta/prueba2.txt"));
  

module.exports = () => {
    suma,
    resta,
    isMdPath   
};
