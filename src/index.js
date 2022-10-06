
const functionLinks = require('./functionmd.js');

const prueba3Md = "prueba3.md"
const srcPrueba3 = "./src/prueba3.md";
const dirMyCarpeta = "./MiCarpeta/subCarpeta";
const dirMyCarpetaprueba1Md = "./MiCarpeta/subCarpeta/prueba1.md";
const dirMyCarpetaprueba5Md = "./MiCarpeta/subCarpeta/prueba5.md";
const dirMyCarpetaprueba2txt = "./MiCarpeta/subCarpeta/prueba2.txt";
const rutaAbsolutaEjm = "C:\Users\Usuario\Desktop\Proyecto 4 MdLink\LIM018-md-links\prueba3.md"

//funcion con recursividad
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let links = [];
    const exisPath = functionLinks.existPath(path) // la ruta existe?
    if (exisPath === false) {
      reject("La ruta no existe"); // si no existe
    }
    if (!functionLinks.isAbsolute(path)) {
      //const resolAbs = functionLinks.resolveAbsolute(path)
      AbsDir = functionLinks.resolveAbsolute(path)
      if (functionLinks.isDirectory(AbsDir)) {
        const readDi1 = functionLinks.readDir(AbsDir);
        newpath = functionLinks.getLinksOfDir(readDi1);
        links.push(newpath)
      } 
      if (functionLinks.isFile(AbsDir)){
        if (!functionLinks.isMd(path)) {
          reject("El archivo no es md");
        } 
        else {
          const fileR = functionLinks.readFile(links)
          const getLinks = functionLinks.allLinks(fileR);
          if (getLinks !== 0) {
            if (options.validate) {
              const valid = functionLinks.validate(getLinks);
              resolve(valid)
              //const status = functionLinks.stats(getLinks);
              console.log(valid)
            }
            else if (options.stats) {
              const statusLink2 = functionLinks.stats(getLinks);
              resolve(statusLink2)
              //const status = functionLinks.stats(getLinks);
              //console.log(statusLink2)
            }
          } else {
            reject('No se encontraron links en el archivo');
          }

        }
      }

    }
  })
}







  // arr con la ruta de los archivos
        //arreglo de promesas , invocar mdlink para cada archivo
        // un promise all,,con ello obtengo arreglo de arreglos(links) y unirlos


/*
  const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
      const exisPath = functionLinks.existPath(path)
      if (exisPath === false) {
        reject("La ruta no existe");
      } else {
        const resolAbs = functionLinks.resolveAbsolute(path)
        if (functionLinks.isFile(path)) {
          if (functionLinks.isMd(path)) {
            const getLinks = functionLinks.allLinks(resolAbs);
            if (options.validate) {
              const valid = functionLinks.validate(getLinks);
              resolve(valid)
              //const status = functionLinks.stats(getLinks);
              console.log(valid)
            }
            else if (options.stats) {
              const statusLink2 = functionLinks.stats(getLinks);
              resolve(statusLink2)
              //const status = functionLinks.stats(getLinks);
              //console.log(statusLink2)
            }
          }
        } 
      }
      })
    }
*/


/* mdLinks("./MiCarpeta/subCarpeta/prueba5.md", { stats: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); 
*/
/*
mdLinks("./MiCarpeta/subCarpeta/prueba5.md", { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
*/
/*
  mdLinks("prueba5.md", { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
 */
/*
mdLinks("./MiCarpeta/Carpeta/prueba5.md", { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  */

mdLinks("./MiCarpeta/subCarpeta", { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));


module.exports = {
  mdLinks
}
