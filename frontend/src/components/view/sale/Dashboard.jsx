import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = () => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Name", "Country", "Age"];
  const tableRows = [
      [1, "John Doe", "USA", 30],
      [2, "Anna Smith", "UK", 22],
      [3, "Peter Jones", "Canada", 28]
  ];

  doc.autoTable({
      head: [tableColumn],
      body: tableRows,
  });

  doc.save('table-example.pdf');
};
const Dashboard = () => {
  return (
      <div className="card">
        <button onClick={generatePDF()}>download pdf</button>
      </div>
    
  )
}

export default Dashboard