const fs = require('fs');
const path = require('path');

// Read the SVG
const svgPath = path.join(__dirname, '../public/icons/icon-192x192.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Create a simple HTML file to convert SVG to PNG using canvas
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Convert SVG to PNG</title>
</head>
<body>
    <canvas id="canvas" width="192" height="192"></canvas>
    <img id="svg" src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" style="display:none;">
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.getElementById('svg');
        
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 192, 192);
            const pngUrl = canvas.toDataURL('image/png');
            document.write('<a href="' + pngUrl + '" download="favicon.png">Download PNG</a>');
        };
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'convert.html'), htmlContent);
console.log('Open convert.html in a browser to download the favicon.png');