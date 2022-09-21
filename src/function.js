const fs = require("fs");
const path = require('path');
const fetch = require('node-fetch');

const prueba3Md = "prueba3.md"
const srcPrueba3 = "./src/prueba3.md";
const dirMyCarpeta ="./MiCarpeta/subCarpeta";
const dirMyCarpetaprueba1Md ="./MiCarpeta/subCarpeta/prueba1.md";
const dirMyCarpetaprueba5Md ="./MiCarpeta/subCarpeta/prueba5.md";
const dirMyCarpetaprueba2txt ="./MiCarpeta/subCarpeta/prueba2.txt";
const rutaAbsolutaEjm = "C:\Users\Usuario\Desktop\Proyecto 4 MdLink\LIM018-md-links\prueba3.md"

// 1. La ruta existe?
const existPath = (route) => fs.existsSync(route);
//console.log(existPath(dirMyCarpeta))
//console.log(existPath(dirFile2))

// 2. La ruta es absoluta?
const isAbsolute = (route) => path.isAbsolute(route);
//console.log(isAbsolute (dirMyCarpeta))
//console.log(isAbsolute (srcPrueba3 ))
//console.log(isAbsolute (prueba3Md))

// 3. Convertir ruta a Absoluta
const resolveAbsolute = (route) => path.resolve(route);
//console.log(resolveAbsolute (dirMyCarpeta))
//console.log(resolveAbsolute (srcPrueba3 ))
//console.log(resolveAbsolute (prueba3Md))

// 4. es un directorio?
const isDirectory = (route) => fs.statSync(route).isDirectory();
//console.log(isDirectory(dirMyCarpeta))
//console.log(isDirectory(srcPrueba3 )) // error no es dir
//console.log(isDirectory(prueba3Md)) // error

// 5. si es directorio, leer
const readDir = (routeDir) => fs.readdirSync(routeDir);
// console.log(readDir(dirMyCarpeta))  // si lo lee
// console.log(readDir(srcPrueba3 )) // no lo lee
// console.log(readDir(prueba3Md)) // no lee

// 6. archivo tiene extension md?
const isMd = (route) => {
  const extensionPath = path.extname(route);
  if (extensionPath === '.md') {
    return true;
  } else {
    console.log('El archivo no tiene extension .md');
  }
};
//console.log(isMd("./MiCarpeta/subCarpeta/prueba2.txt"))
//console.log(isMd(dirMyCarpeta))  // "no tiene ", undefined
//console.log(isMd(srcPrueba3)) // truew
//console.log(isMd(prueba3Md)) //  true
//console.log(isMd(dirMyCarpetaprueba2txt)) //  false
//console.log(isMd(dirMyCarpetaprueba5Md)) //  true


// 7.Leer el archivo md
  const readFile = (pathfile) => fs.readFileSync(pathfile, 'utf8');
  //console.log(readFile(prueba3Md)); // no leee 
  //console.log(readFile(dirMyCarpeta))  // no lee
 //console.log(readFile(prueba3Md)) //  no lee 
 //console.log(readFile(dirMyCarpetaprueba2txt)) //  "No es un archivo md"
 //console.log(readFile(srcPrueba3)) // SI LEE**************
 //console.log(readFile(dirMyCarpetaprueba5Md)) //   SI LEE************

  //8. Obtener los links del archivo .md en array
 
 const allLinks = (theFile) => {
    let theLinks = []; //array de links
    const readFile = fs.readFileSync(theFile, 'utf-8'); // leo archivo
    //console.log(readFile) // lee todo texto y links  ***************
    const expReg = /(\[(.*?)\])?\(http(.*?)\)/gm; // regex
    const fileMatch = readFile.match(expReg); // busca regex en archivo
    //console.log(fileMatch)  // me devuelve array de text y links********
    if (fileMatch !== null) { //si encuentra links
      fileMatch.forEach((link) => { //  me devuelve el text, href y file
        const dataLinks = {
          text : link.slice(1, link.indexOf(']')),
          href : link.slice(link.indexOf('(') + 1, link.indexOf(')')),
          file : theFile
        }
          theLinks.push(dataLinks);
          //return theLinks
          
        });
        return theLinks
        //console.log (theLinks)// me devuelve el array de links con href y file
        
    } else {
      return []
      //console.log('No se encontraron links')
    }
  };
  //console.log(allLinks("./MiCarpeta/subCarpeta/prueba5.md"))//si lee
  //allLinks(dirMyCarpetaprueba1Md) // 
  //console.log(allLinks("./src/prueba3.md"))
  

//ejemplo para probar que fetch funciona
   /*  fetch('https://www.google.com/')
       .then(res => console.log(res))
       .catch(err => console.error(err)) */
    
  //9.  Validar los links
const validate = (arrLi) => { // tengo q darle un array de links
  const statusArr = arrLi.map((obj) => {// para cada uno debe dev otro array
    const requestObj = 
     fetch(obj)
      .then((res) => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: res.status,
        ok: res.ok ? "OK" : "FAIL",
      }))
      .catch(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 404,
        ok: "FAIL",
      }));
    //console.log('Dentro del Fetch',requestObj)
    return requestObj
    });
  return Promise.all(statusArr);
};
/*
validate(allLinks("./MiCarpeta/subCarpeta/prueba5.md")).then ( (obj) => {
  console.log(obj)
  });
 */ 

const stats = (arrLinks) => {
  const Total = arrLinks.length;
  const mapLinks = arrLinks.map((obj) =>  obj.href) ;
  const Unique = new Set(mapLinks).size;
  const statsLinks = { Total, Unique };
  return statsLinks;
};
//stats(allLinks("./MiCarpeta/subCarpeta/prueba5.md"))
//console.log(stats(allLinks("./MiCarpeta/subCarpeta/prueba5.md")))

module.exports = {
  existPath,
  isAbsolute,
  resolveAbsolute,
  isDirectory,
  readDir,
  isMd,
  readFile,
  allLinks,
  validate,
  stats
}

