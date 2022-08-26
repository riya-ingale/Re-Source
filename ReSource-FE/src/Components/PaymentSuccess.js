import React from 'react'

export default function PaymentSuccess() {
    var fileDownload = require('js-file-download');
    const handleinvoiceclick = (e) => {
        // const myfile =  filename.split('/')
        console.log(myfile[3])
        axios.get('http://127.0.0.1:8000/institute/download/invoice/'+"invoice.html", { 
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, 'invoice.pdf');
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
}

  return (
    <div className='container'>
        <div className='d-flex justify-content-center'>
            <h1 style={{fontWeight: "bold",fontSize: "42px"}}>Payment Successful !</h1>
            <button className='btn btn-success' onClick={handleinvoiceclick()}>Download Invoices</button>
        </div>
    </div>
  )
}
