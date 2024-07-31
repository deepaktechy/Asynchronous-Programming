document.getElementById('callbackButton').addEventListener('click', function () {
    // Display loading message
    const resultDiv = document.getElementById('callbackResult');
    resultDiv.textContent = 'Waiting for callback...';

    // Simulate delay using a callback function
    function delayCallback(callback) {
        setTimeout(() => {
            // Fetch data from API
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    // Extract post titles
                    const titles = data.posts.map(post => post.title).join(', ');
                    callback(`Fetched titles: ${titles}`);
                })
                .catch(error => {
                    callback(`Error fetching data: ${error.message}`);
                });
        }, 5000);
    }

    // Execute the callback function
    delayCallback((message) => {
        resultDiv.textContent = message;
    });
});
