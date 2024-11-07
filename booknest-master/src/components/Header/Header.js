import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import { signout } from "../../router-config/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import "./Header.css";
import { fetchCategory } from "../../router-config/categorySlice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { categoryList, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  console.log("Category List:", categoryList);
  
  const currentUser = useSelector((state) => state.user.currentUser);
  const signOut = () => {
    dispatch(signout());
    toast.info("Sign Out SuccesFully");
  };
  function searchCategory() {
    navigate("/book");
  }
  return (
    <>
      <header>
        <TopBar />
        {/* Rendered for larger screens (d-lg-block). */}
        <div
          className="main-menu-area d-md-none d-none d-lg-block sticky-header-1"
          id="header-sticky"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="menu-area">
                  <nav>
                    <ul>
                      <li className="active">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/book">Book</Link>
                      </li>
                      <li>
                        <a className="text-white" style={{ cursor: "pointer" }}>
                          Categories<i className="fa fa-angle-down"></i>
                        </a>

                        <div className="mega-menu">
                          {!error &&
                            categoryList.map((category, index) => (
                              <span key={index}>
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={searchCategory}
                                >
                                  {category.categoryName}
                                </a>
                              </span>
                            ))}
                        </div>
                      </li>

                      <li>
                        <Link>
                          Upload Books<i className="fa fa-angle-down"></i>
                        </Link>

                        <div className="sub-menu sub-menu-2">
                          <ul>
                            <li>
                              <Link to="/donate">Donate Books</Link>
                            </li>
                            <li>
                              <Link to="/sellbooks">Sell Books</Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li>
                        <Link to="/freebooks">Free Books</Link>{" "}
                      </li>

                      <li>
                        <Link>
                          Pages<i className="fa fa-angle-down"></i>
                        </Link>

                        <div className="sub-menu sub-menu-2">
                          <ul>
                            <li>
                              <Link to="/aboutUs">About Us</Link>
                            </li>
                            <li>
                              <Link to="/contact">Contact Us</Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {currentUser ? (
                        <li>
                          <Link onClick={signOut}>SignOut</Link>
                        </li>
                      ) : (
                        <li>
                          <a href="#">
                            MyAccount<i className="fa fa-angle-down"></i>
                          </a>
                          <div className="sub-menu sub-menu-2">
                            <ul>
                              <li>
                                <Link to="/signup">Sign Up</Link>
                              </li>

                              <li>
                                <Link to="/signin">Sign In</Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rendered for smaller screens (d-lg-none). */}
        <div className="mobile-menu-area d-lg-none d-block fix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mobile-menu">
                  <nav id="mobile-menu-active">
                    <ul id="nav">
                      <li>
                        <Link to="/"> Home</Link>
                      </li>
                      <li>
                        <Link to="/book">Book</Link>
                      </li>
                      <li>
                        <a href="product-details.html">Categories</a>
                        <ul>
                          {!error &&
                            categoryList.map((category, index) => (
                              <li key={index}>
                                <span onClick={searchCategory}>
                                  {category.categoryName}{" "}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </li>
                      <li>
                        <Link to="/donate">Donate Books</Link>
                      </li>
                      <li>
                        <Link to="/freebooks">Free Books</Link>
                      </li>
                      <li>
                        <Link to="/sellbooks">Sell Books</Link>
                      </li>
                      <li>
                        Page
                        <ul>
                          <li>
                            <Link to="/signup">SignUp</Link>
                          </li>
                          <li>
                            <Link to="/signin">SignIn</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
