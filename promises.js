document.getElementById('promiseButton').addEventListener('click', function () {
    // Display loading message
    const resultDiv = document.getElementById('promiseResult');
    resultDiv.textContent = 'Loading...';

    // Create a promise to fetch data
    const fetchData = new Promise((resolve, reject) => {
        // Set timeout for promise resolution
        const timeout = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, 5000);

        // Fetch data from API
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                clearTimeout(timeout); // Clear timeout if fetch succeeds
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timeout); // Clear timeout if fetch fails
                reject(error);
            });
    });

    // Handle promise resolution
    fetchData
        .then(data => {
            // Extract post titles
            const titles = data.posts.map(post => post.title).join(', ');
            resultDiv.textContent = `Fetched titles: ${titles}`;
        })
        .catch(error => {
            resultDiv.textContent = `Error: ${error.message}`;
        });
});
