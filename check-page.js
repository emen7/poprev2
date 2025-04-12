const http = require('http');

function checkPage(port, path) {
  const options = {
    hostname: 'localhost',
    port: port,
    path: path,
    method: 'GET',
    timeout: 5000, // 5 second timeout
  };

  console.log(`Checking http://localhost:${port}${path}`);

  const req = http.request(options, res => {
    console.log(`Port ${port}, Path ${path} - Status Code: ${res.statusCode}`);

    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`Port ${port}, Path ${path} - Page is accessible!`);
      } else {
        console.log(`Port ${port}, Path ${path} - Page is not accessible.`);
      }
    });
  });

  req.on('error', error => {
    console.error(`Port ${port}, Path ${path} - Error: ${error.message}`);
  });

  req.on('timeout', () => {
    console.error(`Port ${port}, Path ${path} - Request timed out`);
    req.destroy();
  });

  req.end();
}

// Check both ports and both paths
checkPage(3000, '/perplexity-example');
checkPage(3000, '/perplexity-test');
checkPage(3001, '/perplexity-example');
checkPage(3001, '/perplexity-test');
