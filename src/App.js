// import React, { useState, useEffect } from "react";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Account from "./pages/Account";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const App = () => {
//   const [token, setToken] = useState(false);

//   if (token) {
//     sessionStorage.setItem("token", JSON.stringify(token));
//   }

//   useEffect(() => {
//     if (sessionStorage.getItem("token")) {
//       let data = JSON.parse(sessionStorage.getItem("token"));
//       setToken(data);
//     }
//   }, []);

//   return (
//     <div>
//       <Router>
//         <Routes>
//           {token ? (
//             <>
//               <Route
//                 path={"/dashboard"}
//                 element={<Dashboard token={token} />}
//               />
//               <Route path={"/account"} element={<Account token={token} />} />
//             </>
//           ) : (
//             <>
//               <Route path={"/signup"} element={<SignUp />} />
//               <Route path={"/"} element={<Login setToken={setToken} />} />
//             </>
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {token ? (
            <>
              <Route
                path={"/dashboard"}
                element={<Dashboard token={token} />}
              />
              <Route path={"/account"} element={<Account token={token} />} />
              <Route path={"/signup"} element={<Navigate to="/dashboard" />} />
              <Route path={"/"} element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path={"/signup"} element={<SignUp />} />
              <Route path={"/"} element={<Login setToken={setToken} />} />
            </>
          )}

          <Route path={"*"} element={<>Route Not Found !</>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
