import React from 'react';
import './analytics.css'
const DicomAnalyzer = ({ analysisResult }) => {

  // const flattenAnalysisResults = (result) => {
  //   let flatResults = [];
  //   Object.entries(result).forEach(([key, value]) => {
  //     if (key.includes('.description')) {
  //       const code = key.split('.')[1];
  //       const existingEntry = flatResults.find(entry => entry.code === code);
  //       if (existingEntry) {
  //         existingEntry.description = value;
  //       } else {
  //         flatResults.push({ code, description: value, value: 'N/A' });
  //       }
  //     } else if (key.includes('.value')) {
  //       const code = key.split('.')[1];
  //       const existingEntry = flatResults.find(entry => entry.code === code);
  //       if (existingEntry) {
  //         existingEntry.value = Array.isArray(value) ? value.join(', ') : value.toString();
  //       } else {
  //         flatResults.push({ code, value: Array.isArray(value) ? value.join(', ') : value.toString(), description: 'N/A' });
  //       }
  //     }
  //   });
  //   return flatResults;
  // };
  const renderAnalysisTable = () => {

    // Directly create an array of entries from the result for rendering
    const entries = Object.entries(analysisResult.analysis.AllData || {}).map(([code, data]) => ({
      code,
      description: data.description,
      value: typeof data.value === 'string' ? data.value : JSON.stringify(data.value),
    }));
    console.log(entries)

    return (
      <table className="custom-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ code, description, value }) => (
            <tr key={code}>
              <td>{code}</td>
              <td>{description}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {analysisResult ? (
        <div>
          <h2>DICOM File Analysis Results</h2>
          {renderAnalysisTable(analysisResult)}
        </div>
      ) : (
        <p>No analysis data available or analysis is in progress.</p>
      )}
    </div>
  );
};

export default DicomAnalyzer;