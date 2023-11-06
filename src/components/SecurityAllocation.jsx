import React, { useState, useEffect } from "react";

const SecurityAllocation = ({ handleSecurityAllocation }) => {
  const [inputData, setInputData] = useState(""); // State to store input data

  useEffect(() => {
    handleSecurityAllocation(inputData);
  }, [handleSecurityAllocation, inputData]);

  const handleInputChange = (e) => {
    setInputData(e.target.value); // Update the input data state
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter data"
        value={inputData}
        onChange={handleInputChange}
      />
      {/* <button onClick={sendData}>Send Data to Parent</button> */}
    </div>
  );
};

export default SecurityAllocation;
