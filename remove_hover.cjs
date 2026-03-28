const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Admin',
  'C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Student',
  'C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Auth',
  'C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Landing'
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Regex to remove any "hover:..." class
      let newContent = content.replace(/\b(?:sm:|md:|lg:|xl:)?hover:[a-zA-Z0-9\-\_]+/g, '');
      
      // Inject 'active:scale-95' if the element is clickable and lacks active state
      // (Optional: relying on global index.css active states might suffice for buttons/cards, 
      // but let's just make sure hovering is nuked first).
      
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Removed hover from:', file);
      }
    }
  }
}

dirs.forEach(processDir);
console.log('Hover effects stripped.');
