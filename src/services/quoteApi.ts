export const fetchQuote = async () => {
    try {
        const response = await fetch('https://api.quotable.io/random');

        // check if response is OK
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }

        const data = await response.json();

        // return only the quote text
        return data.content;
    } catch (error) {
        console.log('API error:', error);

        // fallback (important so app never crashes)
        return 'Stay focused and keep applying!';
    }
};