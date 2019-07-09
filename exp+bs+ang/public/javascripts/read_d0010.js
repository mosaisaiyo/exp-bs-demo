var fs = require('fs');
fs.readFile('d0010.json', 'utf-8', function(err, data) {
if (err) {
console.error(err);
} else {
console.log(data);
}
});