export default async function handler(req, res) {
    
    const response = await fetch('https://quote-garden.herokuapp.com/api/v3/quotes');
    const responseData = await response.json();

    res.status(200).json(responseData.data);
}