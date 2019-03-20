import React from "react";
import {animated, interpolate} from "react-spring";

import Aspect from "../components/aspect";

import {
  Container,
  Pagination,
  Product,
  ProductImage,
  ProductType,
  ProductTitle,
  Options,
  Option,
  Emoji,
  Text
} from "./cardStyles";

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `rotateX(1deg) rotate(${r * 2}deg) scale3d(${s})`;

const shouldHide = xValue => {
  const x = Math.abs(xValue);
  return x < 50 ? 1 - x / 150 : 0;
};

const shouldScale = ({xRaw, emotion}) => {
  const xParsed = parseInt(xRaw, 10);
  const xPositive = Math.abs(xRaw);

  const show = `scale(${xPositive < 50 ? 1 + xPositive / 100 : 1.5}) translate3d(0, 0, 0)`;
  const hide = `scale(${xPositive < 50 ? 1 - xPositive / 100 : 0})`;

  if (xParsed === 0) return `scale(1)`;

  // if button is love button
  if (emotion === "love") {
    // if product is loved
    if (xParsed > 0) {
      return show;
    } else {
      return hide;
    }
  }

  if (emotion === "hate") {
    // if product is not loved
    if (xParsed < 0) {
      return show;
    } else {
      return hide;
    }
  }
};

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
            <Emoji
              style={{
                opacity: x.interpolate(o => (parseInt(o, 10) > 0 ? shouldHide(o) : "1")),
                transform: x.interpolate(o => shouldScale({xRaw: o, emotion: "hate"}))
              }}
              className="emoji"
              role="img"
              aria-label="next"
            >
              🤔
            </Emoji>
            <Text
              style={{
                opacity: x.interpolate(o => shouldHide(o))
              }}
            >
              Next...
            </Text>
          </Option>
          <Option onClick={() => dispatch({direction: "right", index: i})}>
            <Emoji
              style={{
                opacity: x.interpolate(o => (parseInt(o, 10) < 0 ? shouldHide(o) : "1")),
                transform: x.interpolate(o => shouldScale({xRaw: o, emotion: "love"}))
              }}
              className="emoji"
              role="img"
              aria-label="love it"
            >
              😍
            </Emoji>
            <Text
              style={{
                opacity: x.interpolate(o => shouldHide(o))
              }}
            >
              Love it!
            </Text>
          </Option>
        </Options>
      </Container>
    </animated.div>
  );
};

export default Card;
