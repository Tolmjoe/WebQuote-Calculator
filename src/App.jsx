import { useState } from "react";
import "./App.css";

function App() {
    const [pages, setPages] = useState(1);
    const [apiPages, setApiPages] = useState(0);
    const [hostingPlan, setHostingPlan] = useState("Default");
    const [hostingYears, setHostingYears] = useState(0);
    const [hasUserbase, setHasUserbase] = useState("No");
    const [allowUploads, setAllowUploads] = useState("No");
    const [uploadsPerMonth, setUploadsPerMonth] = useState(0);
    const [quote, setQuote] = useState(null);
    const [maintain, setMaintain] = useState("No");

    const calculatePrice = () => {
        const frontendRate = 10;
        const backendRate = 50;
        const maintenanceRate = maintain === "Yes" ? 30 : 0;
        const hostingRates = {
            "Wordpress hosting": 60,
            "Cloud hosting": 120,
            "Dedicated hosting": 1000,
            "Managed hosting": 150,
            "Default": 70,
        };

        const uploadCost = allowUploads === "Yes" ? uploadsPerMonth * 2 : 0;
        const frontendCost = pages * frontendRate;
        const backendCost = apiPages * backendRate;
        const maintenanceCost = maintenanceRate * 12;
        const hostingCost = hostingRates[hostingPlan] * hostingYears;

        const totalCost = frontendCost + backendCost + maintenanceCost + hostingCost + uploadCost;
        const exchangeRate = 1540;
        const totalCostNaira = totalCost * exchangeRate;

        setQuote({ frontendCost, backendCost, maintenanceCost, hostingCost, totalCost, totalCostNaira });
    };

    return (
        <div className="container">
            <h4>A Web Development Price Quote Calculator</h4>
            <form>
                <label>Number of pages: </label>
                <input type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} />

                <label>Pages requiring plugins/APIs/Database: </label>
                <input type="number" value={apiPages} onChange={(e) => setApiPages(Number(e.target.value))} />

                <label>Hosting plan: </label>
                <select value={hostingPlan} onChange={(e) => setHostingPlan(e.target.value)}>
                    <option>Wordpress hosting</option>
                    <option>Cloud hosting</option>
                    <option>Dedicated hosting</option>
                    <option>Managed hosting</option>
                    <option>Default</option>
                </select>

                <label>Hosting subscription (years): </label>
                <input type="number" value={hostingYears} onChange={(e) => setHostingYears(Number(e.target.value))} />

                <label>Will your website have a userbase? </label>
                <select value={hasUserbase} onChange={(e) => setHasUserbase(e.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                </select>

                <label>Will you require our maintenance services?</label>
                <select value={maintain} onChange={(e) => setMaintain(e.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                </select>

                <label>Allow users to upload pictures/videos? </label>
                <select value={allowUploads} onChange={(e) => setAllowUploads(e.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                </select>

                {allowUploads === "Yes" && (
                    <>
                        <label>Average uploads per month: </label>
                        <input type="number" value={uploadsPerMonth} onChange={(e) => setUploadsPerMonth(Number(e.target.value))} />
                    </>
                )}

                <button type="button" onClick={calculatePrice}>Calculate</button>
            </form>

            {quote && (
                <div className="quote">
                    <h2>PRICE BREAKDOWN</h2>
                    <p>Frontend Development Cost: ${quote.frontendCost}</p>
                    <p>Backend Development Cost: ${quote.backendCost}</p>
                    <p>Annual Maintenance Cost: ${quote.maintenanceCost}</p>
                    <p>Hosting Cost: ${quote.hostingCost}</p>
                    <h3>Total Cost: ${quote.totalCost} (~₦{quote.totalCostNaira})</h3>
                </div>
            )}
        </div>
    );
}

export default App;
