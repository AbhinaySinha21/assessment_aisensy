import React, { useState } from 'react';
import axios from 'axios';
import CSVReader from 'react-csv-reader';

const ContactImport = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    const reader=new FileReader();
    reader.readAsBinaryString(event.target.files[0])
    reader.onload = (event)=>{
        setFile(event.target.result)
        const formdata=new FormData();
        formdata.append("file",event.target.result);
        formdata.append("name",".xlsx")
        console.log(formdata);
        axios.post('http://localhost:3500/api/import', formdata).then((response) => {
        console.log("hello");  
        console.log(response.data);
    });
    }
    
  };

  return (
    <div>
      <h1>Contact Import</h1>
      <input type="file" accept='.xlsx, .xls, .csv ' onChange={handleFileUpload} />
    </div>
  );
};

export default ContactImport;
