const fs = require('fs');
let content = fs.readFileSync('C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Auth/Register.jsx', 'utf8');

content = content.replace(/className="input-field"/g, 'className="input-3d"');
content = content.replace(/className={`input-field \$\{/g, 'className={`input-3d ${');

content = content.replace(/className="btn-3d w-full py-4 mt-2 bg-gradient-[^"]+"/g, 'className="btn-3d-primary w-full disabled:opacity-50"');
content = content.replace(/className="btn-3d flex-1 py-3 bg-indigo-50[^"]+"/g, 'className="btn-3d-secondary flex-1 min-w-[120px] disabled:opacity-50"');
content = content.replace(/className="btn-3d flex-1 py-3 bg-gray-50[^"]+"/g, 'className="btn-3d-secondary flex-1 min-w-[100px] disabled:opacity-50"');
content = content.replace(/className="btn-3d flex-1 py-3 bg-gradient-[^"]+"/g, 'className="btn-3d-success flex-1 min-w-[100px] disabled:opacity-50"');
content = content.replace(/className="btn-3d w-full py-4 bg-gray-100[^"]+"/g, 'className="btn-3d-secondary w-full"');
content = content.replace(/className="btn-3d w-full py-4 bg-gradient-[^"]+"/g, 'className="btn-3d-success w-full"');

fs.writeFileSync('C:/Users/Sahil/Videos/Face Attendance/mobile/src/components/Auth/Register.jsx', content);
console.log('Register.jsx cleaned');
