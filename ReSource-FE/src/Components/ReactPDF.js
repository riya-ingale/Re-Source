import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import './App.css';
import PdfDocument from './generateInvoice/Invoice';
// Instead Of Invoice we want json from backend
// import InvoiceData from './jsonData/InvoiceData';


export default function ReactPDF() {
    const fileName = "Invoice.pdf";
    useEffect(() => {
        axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then((InvoiceData) => {
            console.log(InvoiceData);
          })
          .catch((err) => {
          });
      }, []);

    return (
      <div className="App">
        <PDFViewer showToolbar={false} style={{width: "100vw",height: "90vh"}}>
          <PdfDocument invoicedata={InvoiceData} />
        </PDFViewer>
  
        <div className='download-link'>
          <PDFDownloadLink
            document={<PdfDocument invoicedata={InvoiceData} />}
            fileName={fileName}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download Invoice"
            }
          </PDFDownloadLink>
        </div>
      </div>
    );
}
