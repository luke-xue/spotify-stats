import React, { createContext, useState } from "react";

const OtherContext = createContext("");

function OtherProvider({ children }) {
  const [other, setOther] = useState("");
  const obj = { other: other, setOther: setOther };
  
  return (
    <OtherContext.Provider value={obj}>
      {children}
    </OtherContext.Provider>
  );
}

export default OtherProvider;
export { OtherContext};
