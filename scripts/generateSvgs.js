const fs = require('fs');

const generators = {
  ad: (size) => `<svg width="${size * 2}" height="${size * 2}" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h${size}v${size}H0zm${size} ${size}h${size}v${size}H${size}z"/>
  </svg>`,

  bc: (size) => `<svg width="${size * 2}" height="${size * 2}" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 ${size}h${size}v${size}H0zM${size} 0h${size}v${size}H${size}z"/>
  </svg>`,
};

const sizes = [
  1, 2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 100, 150, 200, 400, 500, 750, 1000,
];

const names = ['ad', 'bc'];

const writeSVGs = () => {
  names.forEach(name => {
    sizes.forEach(size => {
      const xml = generators[name](size);
      fs.writeFile(`./app/assets/${name}--${size}.svg`, xml, (err) => {
        if (err) return console.log(err);
        console.log(`Saved ${name}/${size}`);
      });
    })
  });
};

writeSVGs();
