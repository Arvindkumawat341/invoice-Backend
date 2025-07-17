const fetch = require('node-fetch');

const fetchCompanyDetails = async (gstin) => {
  const url = `http://localhost:5000/companydetails?gstin=${gstin}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }
};

export default fetchCompanyDetails;