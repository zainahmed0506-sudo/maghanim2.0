const sharp = require('sharp');
(async () => {
 await sharp('public/coin-cutout.png').resize(1000).png().toFile('public/coin-hero.png');
 // Crop the source wordmark's known whitespace without redrawing the brand.
 await sharp('public/logo.jpeg').extract({left:160,top:438,width:680,height:126}).negate().png().toFile('public/wordmark.png');
 console.log(await sharp('public/coin-hero.png').metadata());
 try { console.log(require.resolve('playwright')); } catch { console.log('No local playwright'); }
})();
