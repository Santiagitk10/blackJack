const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question('This is the question\n', (userInput) => {
    console.log(userInput);
});
