const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, './dist/angular-cesium/package.json');

try {
  const data = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(data);

  if (packageJson.scripts && packageJson.scripts.prepublishOnly) {
    delete packageJson.scripts.prepublishOnly;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('Script prepublishOnly eliminado con éxito.');
  } else {
    console.log('No se encontró el script prepublishOnly. No se realizaron cambios.');
  }
} catch (error) {
  console.error('Error al modificar el package.json:', error);
}
