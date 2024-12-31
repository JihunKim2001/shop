import logo from "./logo.svg";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import data from "./data.js";
import axios from "axios";
// import Detail from "./routes/Detail.js";
// import Cart from "./routes/Cart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";

const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery("작명", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        return a.data;
      });
  });

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto text-white">
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Item shoes={shoes[i]} i={i + 1}></Item>;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                      })
                      .catch(() => {
                        console.log("실패함 ㅠㅠ");
                      });
                  }}
                >
                  더보기
                </button>
              </div>
            }
          ></Route>

          <Route
            path="/detail/:id"
            element={<Detail shoes={shoes}></Detail>}
          ></Route>

          <Route path="/cart" element={<Cart></Cart>}></Route>

          <Route path="/about" element={<About></About>}>
            <Route path="member" element={<div>멤버임</div>}></Route>
            <Route path="location" element={<div>위치정보임</div>}></Route>
          </Route>

          <Route path="*" element={<div>없는페이지요</div>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
