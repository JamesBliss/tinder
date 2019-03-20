import React from "react";
import styled from "styled-components";
import {animated, useSpring, interpolate} from "react-spring";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
`;

const Card = styled(animated.div)`
  /*  */
  background: #ffffff;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);

  /*  */
  position: absolute;
  top: 0;
  left: 0;

  /*  */
  height: 100px;
  width: 65px;

  /*  */
  transform-origin: center bottom;
`;

// exported component
const Loader = () => {
  // Card One
  const CardOneProps = useSpring({
    from: {
      transform: "0px, 0px, 0px",
      rotate: "0deg"
    },
    to: async next => {
      while (1) {
        await next({
          transform: "-10px, 10px, 0px",
          rotate: "-50deg"
        });
        await next({
          transform: "0px, 0px, 0px",
          rotate: "0deg"
        });
      }
    }
  });

  // Card two
  const CardTwoProps = useSpring({
    from: {
      transform: "0px, 0px, 0px",
      rotate: "0deg"
    },
    to: async next => {
      while (1) {
        await next({
          transform: "20px, 5px, 0px",
          rotate: "45deg"
        });
        await next({
          transform: "0px, 0px, 0px",
          rotate: "0deg"
        });
      }
    }
  });

  return (
    <Container>
      <Card />
      <Card
        style={{
          transform: interpolate(
            [CardOneProps.transform, CardOneProps.rotate],
            (tranform, rotate) => `
              translate3d(${tranform}) rotate(${rotate})
            `
          )
        }}
      />
      <Card
        style={{
          transform: interpolate(
            [CardTwoProps.transform, CardTwoProps.rotate],
            (tranform, rotate) => `
              translate3d(${tranform}) rotate(${rotate})
            `
          )
        }}
      />
    </Container>
  );
};

export default Loader;
