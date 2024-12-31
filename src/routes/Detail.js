import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import "../App.css";
import { addItem } from "../store";
import { useDispatch } from "react-redux";
import { useLike } from "../hooks/like";

let Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === "orange" ? "white" : "black")};
  padding: 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7f50;
  }

  &:active {
    background-color: #ff4500;
  }
`;

let Box = styled.div`
  background: grey;
  background-color: ${(props) => props.bc};
  padding: 20px;
  color: red;
  text-align: center;
  font-weight: bold;
`;

let Image = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

let Title = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
`;

let Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: green;
`;

let TabLink = styled(Nav.Link)`
  color: #333;
  &:hover {
    color: orange;
  }
`;

function Detail(props) {
  let [like, addLike] = useLike();

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setalert] = useState(true);
  let [tab, setTab] = useState(1);
  let dispath = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setalert(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let output = localStorage.getItem("watched");
    output = JSON.parse(output);
    output.push(찾은상품.id);

    output = new Set(output);
    output = Array.from(output);
    localStorage.setItem("watched", JSON.stringify(output));
  }, []);

  return (
    <div className="container">
      {alert === true ? <Box bc="yellow">지금사면 할인!</Box> : null}

      <div className="row">
        <div className="col-md-6">
          <Image
            src={`https://codingapple1.github.io/shop/shoes${찾은상품.id + 1}.jpg`}
            alt={찾은상품.title}
          />
          {like}{" "}
          <span
            onClick={() => {
              addLike();
            }}
          >
            ❤️
          </span>
        </div>
        <div className="col-md-6 mt-4">
          <Title>{찾은상품.title}</Title>
          <p>{찾은상품.content}</p>
          <Price>{찾은상품.price}</Price>
          <Btn
            bg="orange"
            onClick={() => {
              dispath(
                addItem({ id: 찾은상품.id, name: 찾은상품.title, count: 1 })
              );
            }}
          >
            주문하기
          </Btn>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link1">
        <Nav.Item>
          <TabLink eventKey="link0" onClick={() => setTab(0)}>
            상세정보
          </TabLink>
        </Nav.Item>
        <Nav.Item>
          <TabLink eventKey="link1" onClick={() => setTab(1)}>
            리뷰
          </TabLink>
        </Nav.Item>
        <Nav.Item>
          <TabLink eventKey="link2" onClick={() => setTab(2)}>
            Q&A
          </TabLink>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes}></TabContent>
    </div>
  );
}

function TabContent({ tab, shoes }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {
        [<div>제품 상세정보 내용</div>, <div>제품 리뷰</div>, <div>제품 Q&A</div>][
          tab
        ]
      }
    </div>
  );
}

export default Detail;
