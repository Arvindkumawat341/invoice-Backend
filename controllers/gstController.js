class CompanyController {
    static getCompanyDetails = async (req, res) => {
      const { gstin } = req.query;
  
      if (!gstin) {
        return res.status(400).json({ error: "GST number is required" });
      }
  
      try {
        const companyDetails = await fetchCompanyDetails(gstin);
        if (!companyDetails) {
          return res.status(404).json({ error: "Company not found" });
        }
        res.status(200).json(companyDetails);
      } catch (error) {
        console.error("Error fetching company details:", error);
        res.status(500).json({ error: "Failed to fetch company details", details: error.message });
      }
    };
  }
  
  export default CompanyController;