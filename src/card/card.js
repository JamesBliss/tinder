import React from "react";
import {animated, interpolate} from "react-spring";

import Aspect from "../components/aspect";

import {Container, Pagination, Product, ProductImage, ProductType, ProductTitle, Options, Option} from "./cardStyles";

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `rotateX(1deg) rotate(${r * 2}deg) scale3d(${s})`;

// exported component
const Card = ({
  product,
  dispatch,
  bind,
  gone,
  total,
  offset,
  i,
  // animate props
  x,
  y,
  rot,
  scale,
  opacity
}) => {
  const calcForCurrent = i + offset + 1;
  const current = calcForCurrent < 10 ? "0" + calcForCurrent : calcForCurrent;

  console.log(x);

  return (
    <animated.div
      key={i}
      {...bind(i, gone)}
      style={{
        position: "relative",
        zIndex: 1000 - i,
        pointerEvents: scale.interpolate(o => (parseFloat(o.split(",")[0]) > 0.9 ? "auto" : "none")),
        display: opacity.interpolate(o => (o === 0 ? "none" : "block")),
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`)
      }}
    >
      <Container
        style={{
          opacity: interpolate([opacity], opacity => opacity),
          transform: interpolate([rot, scale], trans)
        }}
        key={product.id}
      >
        <Pagination>
          {current} / {total}
        </Pagination>
        <Product>
          <ProductImage>
            <Aspect w={230} h={155}>
              <img alt={product.name} src={product.image} />
            </Aspect>
          </ProductImage>
          <ProductType>{product.type}</ProductType>
          <ProductTitle>{product.name}</ProductTitle>
        </Product>
        <Options>
          <Option onClick={() => dispatch({direction: "left", index: i})}>
            <span role="img" aria-label="next">
              🤔
            </span>
            <div>Next...</div>
          </Option>
          <Option onClick={() => dispatch({direction: "right", index: i})}>
            <span role="img" aria-label="love it">
              😍
            </span>
            <div>Love it!</div>
          </Option>
        </Options>
      </Container>
    </animated.div>
  );
};

export default Card;
