document.getElementById('asyncButton').addEventListener('click', async function () {
    // Display loading message
    const resultDiv = document.getElementById('asyncResult');
    resultDiv.textContent = 'Loading...';

    // Define async function to fetch data with timeout
    async function fetchData() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        try {
            // Fetch data from API
            const response = await fetch('https://dummyjson.com/posts', { signal: controller.signal });
            const data = await response.json();

            // Clear timeout if fetch succeeds
            clearTimeout(timeoutId);

            // Extract post titles
            const titles = data.posts.map(post => post.title).join(', ');
            resultDiv.textContent = `Fetched titles: ${titles}`;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.name === 'AbortError' ? 'Operation timed out' : error.message}`;
        }
    }

    // Call async function
    fetchData();
});
