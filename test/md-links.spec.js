const mdLinks = require("../src/index");
const functionmd = require('../src/functionmd');
//const fetch = require("../__mocks__/node-fetch.js");
const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn())

//jest.mock("node-fetch");

const prueba1Md = "prueba1.md"
const pruebaTxt = "prueba2.txt"
const srcPrueba3 = "./src/prueba3.md";
const srcPrueba1 = "./src/prueba1.md";
const dirMyCarpeta = "./MiCarpeta/subCarpeta";
const rutaAbsolutaEjm = "C:/Users/usuario/Desktop/Proyecto 4 MdLink/LIM018-md-links/src/prueba1.md"
const rutaResolveEjm = "C:\\Users\\usuario\\Desktop\\Proyecto 4 MdLink\\LIM018-md-links\\src\\prueba1.md"
const readDi = ['prueba1.md', 'prueba2.txt', 'prueba5.md']
const readFil = "[Facebook](https://www.facebook.com)";


// 1. La ruta existe?
describe('existPath', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.existPath).toBe('function');
  });
  it('debe retornar true', () => {
    return expect(functionmd.existPath(srcPrueba1)).toBeTruthy();
  });
  it('debe retornar false', () => {
    return expect(functionmd.existPath(pruebaTxt)).toBeFalsy();
  });
});

// 2. La ruta es absoluta?
describe('isAbsolute', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.isAbsolute).toBe('function');
  });
  it('debe retornar true', () => {
    return expect(functionmd.isAbsolute(rutaAbsolutaEjm)).toBeTruthy();
  });
  it('debe retornar false', () => {
    return expect(functionmd.isAbsolute(prueba1Md)).toBeFalsy();
  });
});

// 3. Resuelve ruta en Absoluta
describe('resolveAbsolute', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.resolveAbsolute).toBe('function');
  });
  it('Resuelve ruta en absoluta', () => {
    return expect(functionmd.resolveAbsolute(srcPrueba1)).toEqual(rutaResolveEjm)
  })
});

// 4. es un directorio?
describe('isDirectory', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.isDirectory).toBe('function');
  });
  it('debe retornar true', () => {
    const result = functionmd.isDirectory(dirMyCarpeta);
    expect(result).toBeTruthy();
  });
  it('debe retornar false', () => {
    const result = functionmd.isDirectory(srcPrueba3);
    expect(result).toBeFalsy();
  });
});

// 4.1 es un archivo?

describe('isFile', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.isFile).toBe('function');
  });
  it('debe retornar true', () => {
    const result = functionmd.isFile(srcPrueba3);
    expect(result).toBeTruthy();
  });
  it('debe retornar false', () => {
    const result = functionmd.isFile(dirMyCarpeta);
    expect(result).toBeFalsy();
  });
});

// 5.  leer directorio

describe('readDir', () => {
  it('es una funcion', () => {
    expect(typeof functionmd.readDir).toBe('function');
  });
  it('debe retornar array', () => {
    expect(functionmd.readDir(dirMyCarpeta)).toEqual(readDi);
  });

});
// 6. archivo tiene extension md?
describe('isMd', () => {
  it('es una funccion', () => {
    expect(typeof functionmd.isMd).toBe('function');
  });
  it('debe retornar true', () => {
    const result = functionmd.isMd(prueba1Md);
    expect(result).toBeTruthy();
  });
  it('debe retornar false', () => {
    const result = functionmd.isMd(pruebaTxt);
    expect(result).toBeFalsy();
  });
});

//7. Obtener los links del archivo .md en array

describe('allLinks', () => {
  const arr = [
    {
      text: 'Facebook',
      href: 'https://www.facebook.com/',       
      file: './MiCarpeta/subCarpeta/prueba5.md'
    },
    {
      text: 'Youtube',
      href: 'https://www.youtube.com/',
      file: './MiCarpeta/subCarpeta/prueba5.md'
    },
    {
      text: 'Node',
      href: 'https://nodejs.orl/',
      file: './MiCarpeta/subCarpeta/prueba5.md'
    }
  ];
  it('devuelve el array con los links y sus respectivos text, href y file', () => {
    expect(functionmd.allLinks('./MiCarpeta/subCarpeta/prueba5.md')).toStrictEqual(arr);
  });

});



// Funcion MdLink

describe('mdLinks', () => {
it('Devuelve no existe la ruta', () => {
    const resultado = mdLinks.mdLinks(('prueba5.md'), { validate: true });
    resultado.catch(resp => expect(resp).toStrictEqual('La ruta no existe'))
  }) 
  
it('Resuelve ruta en absoluta', () => {
  return expect(functionmd.resolveAbsolute('./src/prueba1.md')).toEqual('C:\\Users\\usuario\\Desktop\\Proyecto 4 MdLink\\LIM018-md-links\\src\\prueba1.md')
});

it('Es archivo', () => {
  const result = functionmd.isFile(srcPrueba3);
  expect(result).toBeTruthy();
});
it('debe retornar false', () => {
  const result = functionmd.isFile(dirMyCarpeta);
  expect(result).toBeFalsy();
});
});

it('si mdlinks, validate:true', (done) => {
  fetch.mockResolvedValue({
    status: 200,
    ok: 'OK'
  });

  const result = [
    {
      href: 'https://www.facebook.com/',
      text: 'Facebook',
      file: 'C:\\Users\\usuario\\Desktop\\Proyecto 4 MdLink\\LIM018-md-links\\MiCarpeta\\subCarpeta\\prueba5.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://www.youtube.com/',
      text: 'Youtube',
      file: 'C:\\Users\\usuario\\Desktop\\Proyecto 4 MdLink\\LIM018-md-links\\MiCarpeta\\subCarpeta\\prueba5.md',
      status: 200,
      ok: 'OK'
    },
    {
      text: 'Node',
      file: 'C:\\Users\\usuario\\Desktop\\Proyecto 4 MdLink\\LIM018-md-links\\MiCarpeta\\subCarpeta\\prueba5.md',
      status: 404,
      ok: 'FAIL'
    }

  ]
  const result1 = mdLinks.mdLinks('./MiCarpeta/subCarpeta/prueba5.md', { validate: true });
  result1.then((res) => {
    expect(res).toBe(result);
    done();
  });
});















