// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { Link, useNavigate, NavLink } from "react-router-dom";
// import { decodeJwtToken, removeToken, isLoggedIn } from "../store/auth";

// function Layout({ children }) {
//   const navigate = useNavigate();
//   const decodedToken = decodeJwtToken();

//   const handleLogout = () => {
//     removeToken();
//     navigate("/");
//   };

//   return (
//     <>
//       <header>
//         <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
//           <div className="container-fluid">
//             <Link className="navbar-brand" to="/">
//               Blog
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarCollapse"
//               aria-controls="navbarCollapse"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//             <div className="collapse navbar-collapse" id="navbarCollapse">
//               <ul className="navbar-nav me-auto mb-2 mb-md-0">
//                 {/* Conditionally render the "Home" link based on user authentication */}
//                 {isLoggedIn() && (
//                   <>
//                     <li className="nav-item">
//                       <NavLink
                        
//                         className={({isActive}) => (isActive ? "nav-link active-style" : 'nav-link none')}
//                         // className="nav-link"
//                         to="/home"
//                       >
//                         Home
//                       </NavLink>
//                     </li>

//                     <li className="nav-item">
//                       <NavLink
                        
//                         // activeClassName="active"
//                         // className="nav-link "
//                         className={({isActive}) => (isActive ? "nav-link active-style" : 'nav-link none')}
//                         to="/add-blog"
//                       >
//                         Add Blog
//                       </NavLink>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </div>

//             {decodedToken ? (
//               <div className="d-flex">
//                 <span className="text-white me-3">
//                   Welcome, {decodedToken.username}!
//                 </span>
//                 <button
//                   className="btn btn-outline-light"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         </nav>
//       </header>

//       <main className="flex-shrink-0">
//         <div className="container">
//           <div style={{ minHeight: "100vh" }}>{children}</div>
//         </div>
//       </main>
//       <footer className="footer mt-auto py-3 bg-light">
//         <div className="container">
//           <span className="text-muted">
//             <p>&copy; 2023-2024</p>
//           </span>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default Layout;


import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { decodeJwtToken, removeToken, isLoggedIn } from "../store/auth";

function Layout({ children }) {
  const navigate = useNavigate();
  const decodedToken = decodeJwtToken();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const isAdmin = decodedToken && decodedToken.roles.includes("ROLE_ADMIN");

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Blog
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {isLoggedIn() && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "nav-link active-style" : "nav-link none"
                        }
                        to="/home"
                      >
                        Home
                      </NavLink>
                    </li>

                    {isAdmin && ( // Render "Add Blog" link only if user is admin
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "nav-link active-style" : "nav-link none"
                          }
                          to="/add-blog"
                        >
                          Add Blog
                        </NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>

            {decodedToken ? (
              <div className="d-flex">
                <span className="text-white me-3">
                  Welcome, {decodedToken.username}!
                </span>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </nav>
      </header>

      <main className="flex-shrink-0">
        <div className="container">
          <div style={{ minHeight: "100vh" }}>{children}</div>
        </div>
      </main>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">
            <p>&copy; 2023-2024</p>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Layout;



