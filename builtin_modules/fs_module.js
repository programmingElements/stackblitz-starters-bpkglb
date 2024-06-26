const fs = require('fs');

// Read Content From File Using readFile [demo.txt]

// fs.readFile('demo.txt', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// console.log();

// fs.readFile('demo.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// Create a File Using writeFile [example.html]

// fs.writeFile(
//   'example.html',
//   '<h1>Welcome to NodeJS Pro Tutorial!</h1>',
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('File Created Successfully');
//   }
// );

// const contentSample = 'My Name is Kalyan, I am Creating Dynamic Content!';

// fs.writeFile('example.html', contentSample, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File Content is Success');
//   }
// });

// Renaming the filename using rename [newChangedFile.js]

// fs.rename('example.html', 'newChangedFile.js', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Filename is Modified Successfully');
//   }
// });

// Deleting the File Using unlink [newChangedFile.js]

fs.unlink('newChangedFile.js', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File Deleted Successfully');
  }
});
