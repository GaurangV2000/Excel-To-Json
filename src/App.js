import React, { useState } from 'react';
import * as xlsx from 'xlsx/xlsx.mjs';

const App = () => {
  const [qData, setQData] = useState([]);

  const readUploadFile = (e) => {
    e.preventDefault();
    console.log('running')
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "object" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);

        if (json) {
          let quizData = [];
          json.map((item, index) => {
            const data = {
              key: index,
              question: item.Question,
              answers: [{
                key: 1,
                val: item.A,
              },
              {
                key: 2,
                val: item.B
              },
              {
                key: 3,
                val: item.C
              },
              {
                key: 4,
                val: item.D
              },
              {
                key: 5,
                val: item.E
              }
              ],
              correctAns: item.Correct
            }
            quizData.push(data)
         
            setQData(quizData)
          })


        }

      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  return (
    <div>
      { console.log(qData)}
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
    </div>
  )
}

export default App


// //Correct Answer: "A"
// Option A: "Gaurang"
// Option B: "Jayraj"
// Option C: "Rahul"
// Option D: "Shyam"
// Option E: "Rizwan"
// Question: "What is your Name ?"
// __rowNum__: 1