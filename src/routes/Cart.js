import styled from "styled-components";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, removeItem } from "../store";

// Styled-components 정의
const CartContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const StyledTable = styled(Table)`
  text-align: center;
  th {
    background-color: #007bff;
    color: white;
  }
  td {
    vertical-align: middle;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) =>
    props.type === "add" ? "#007bff" : "#ff4d4d"};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.type === "add" ? "#0056b3" : "#d93636"};
  }
`;

function Cart() {
  // Redux 상태와 디스패치 가져오기
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <CartContainer>
      <h3>
        {state.user.name} {state.user.age}의 장바구니
      </h3>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>담기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <ActionButton
                  type="add"
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id));
                  }}
                >
                  +
                </ActionButton>
              </td>
              <td>
                <ActionButton
                  type="remove"
                  onClick={() => {
                    dispatch(removeItem(state.cart[i].id));
                  }}
                >
                  x
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </CartContainer>
  );
}

export default Cart;
