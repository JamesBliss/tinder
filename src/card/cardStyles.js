import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled(animated.div)`
  background: #ffffff;
  padding: 18px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);

  /*  */
  height: 426px;
  width: 315px;

  /*  */
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
`;

export const Pagination = styled.div`
  height: 20px;

  font-weight: 500;
  font-size: 11px;
  color: #333333;
  letter-spacing: 2px;
  text-align: center;

  margin-bottom: 10px;
`;

export const Product = styled.div`
  height: 275px;
`;

export const ProductImage = styled.div`
  max-width: 230px;
  width: 100%;
  margin: 10px auto 15px;
  pointer-events: none;
`;

export const ProductType = styled.span`
  display: block;
  font-weight: 500;
  font-size: 11px;
  color: #333333;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 8px;
`;

export const ProductTitle = styled.span`
  display: block;
  font-family: LushHandwritten, HelveticaNeue, "Helvetica Neue", Helvetica,
    sans-serif;
  font-size: 23px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  line-height: 29px;
`;

export const Options = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Option = styled.button`
  font-weight: 600;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  position: relative;
  background: transparent;
  -webkit-appearance: none;
  border: none;
  pointer-events: pointer;

  &:focus,
  &:active {
    outline: none;
  }

  div {
    padding-top: 60px;
  }

  span {
    &:focus,
    &:active {
      box-shadow: inset 0 0 0 3px rgba(0, 123, 255, 0.75);
      border-color: #80bdff;
    }
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    background: #eaeaea;
    border-radius: 40px;
  }
`;
