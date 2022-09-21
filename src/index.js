
const functionLinks = require('./function.js');

const prueba3Md = "prueba3.md"
const srcPrueba3 = "./src/prueba3.md";
const dirMyCarpeta ="./MiCarpeta/subCarpeta";
const dirMyCarpetaprueba1Md ="./MiCarpeta/subCarpeta/prueba1.md";
const dirMyCarpetaprueba5Md ="./MiCarpeta/subCarpeta/prueba5.md";
const dirMyCarpetaprueba2txt ="./MiCarpeta/subCarpeta/prueba2.txt";
const rutaAbsolutaEjm = "C:\Users\Usuario\Desktop\Proyecto 4 MdLink\LIM018-md-links\prueba3.md"

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        const absolute = functionLinks.resolveAbsolute(path);
        //console.log(absolute)
        if (functionLinks.existPath(absolute)) {
          const readFiles = functionLinks.readFile(absolute);
          const getLinks = functionLinks.allLinks(readFiles);
          const status = functionLinks.stats(getLinks);
          const valid = functionLinks.validate(getLinks);
         console.log(valid)
          if (options.validate && !options.showStats) {
            resolve(valid)
          } 
          else if (!options.validate && options.showStats) {
            resolve(status);
          }
          else {
            console.log('Ingresa una opcion:' + '--validate'  + '--stats' );
          }
        } else {
          reject(new Error('Ruta inválida'));
        }
      })
};

 mdLinks("./MiCarpeta/subCarpeta/prueba5.md")
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); 

  
module.exports = {mdLinks}
