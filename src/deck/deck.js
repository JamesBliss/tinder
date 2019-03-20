import React, {useReducer, useState, useEffect} from "react";
import findIndex from "lodash/findIndex";
import {useSprings, useTransition, animated} from "react-spring";
import {useGesture} from "react-with-gesture";

import Card from "../card";

import mock from "../mock";

import {Container} from "./deckStyles";

function reducer(state, action) {
  console.log("reducer => ", {state}, {action});

  switch (action.type) {
    case "love":
      let loveIndex = findIndex(state.products, data => data.id === action.id);

      if (loveIndex > -1) {
        return {
          ...state,
          products: [...state.products.slice(0, loveIndex), ...state.products.slice(loveIndex + 1)]
        };
      }
      return state;
    case "hate":
      let hateIndex = findIndex(state.products, data => data.id === action.id);

      if (hateIndex > -1) {
        return {
          ...state,
          products: [...state.products.slice(0, hateIndex), ...state.products.slice(hateIndex + 1)]
        };
      }
      return state;
    default:
      throw new Error();
  }
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const toFirst = {
  x: 0,
  y: 0,
  scale: "1, 1, 1",
  rot: 0,
  opacity: 1,
  delay: 100
};

const toSecond = {
  x: 0,
  y: 10,
  scale: "0.9, 1, 1",
  rot: 0,
  opacity: 1,
  delay: 200
};

const toThird = {
  x: 0,
  y: 20,
  scale: "0.8, 1, 1",
  rot: 0,
  opacity: 1,
  delay: 300
};
const toOther = {
  x: 0,
  y: 20,
  scale: "0.8, 1, 1",
  rot: 0,
  opacity: 0,
  delay: 400
};

const to = i => {
  if (i === 0) {
    return toFirst;
  }

  if (i === 1) {
    return toSecond;
  }

  if (i === 2) {
    return toThird;
  }

  return toOther;
};

const from = i => {
  if (i === 0) {
    return toFirst;
  }

  if (i === 1) {
    return toSecond;
  }

  if (i === 2) {
    return toThird;
  }

  return toOther;
};

// exported component
const Deck = () => {
  const [state, dispatch] = useReducer(reducer, mock);

  // store for 'swipped' cards, The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set());

  // store for drag animations
  const [propSpring, setSpring] = useSprings(state.products.length, i => ({
    ...to(i),
    from: from(i)
  }));

  // button animation handler
  const clickHandler = ({index, direction}) => {
    const dir = direction === "left" ? -1 : 1;
    const velocity = 3;

    // if already gone, block a double click returning items!
    if (gone.has(index)) return;

    // add to fone list
    gone.add(index);

    // update animation store with move
    setSpring(i => {
      // as trigged the `gone.add(index)`
      const isGone = gone.has(index);

      //
      if (index + 1 === i && isGone) {
        return {
          ...toFirst,
          delay: undefined
        };
      } else if (index + 2 === i && isGone) {
        return toSecond;
      } else if (index + 3 === i && isGone) {
        return toThird;
      } else if (index < i && isGone) {
        return toOther;
      } else if (index !== i) {
        return;
      }

      // When a card is gone it flys out left or right, otherwise goes back to zero
      const x = (200 + window.innerWidth) * dir;

      // How much the card tilts, flicking it harder makes it rotate faster
      const rot = 0 / 100 + (isGone ? dir * 10 * velocity : 0);

      // return new animation
      return {
        x,
        rot,
        y: 0,
        opacity: 1,
        scale: "1, 1, 1",
        delay: undefined,
        config: {
          friction: 50,
          tension: 200
        }
      };
    });
  };

  // drag gesture hook
  const bind = useGesture({
    onAction: ({args: [index, passedGone], down, delta: [xDelta], distance, direction: [xDir], velocity, event}) => {
      // If you flick hard enough it should trigger the card to fly out
      const trigger = velocity > 0.2;

      // Direction should either point left or right
      const dir = xDir < 0 ? -1 : 1;

      // if already gone, block a double click returning items!
      if (gone.has(index)) return;

      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      if (!down && trigger && (xDir > 0.6 || xDir < -0.6)) gone.add(index);

      // update animation store with move
      setSpring(i => {
        // as trigged the `gone.add(index)`
        const isGone = gone.has(index);

        //
        if (index + 1 === i && isGone) {
          return {
            ...toFirst,
            delay: undefined
          };
        } else if (index + 2 === i && isGone) {
          return toSecond;
        } else if (index + 3 === i && isGone) {
          return toThird;
        } else if (index < i && isGone) {
          return toOther;
        } else if (index !== i) {
          return;
        }

        // When a card is gone it flys out left or right, otherwise goes back to zero
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        // How much the card tilts, flicking it harder makes it rotate faster
        const rot = !down && !isGone ? 0 : xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        // return new animation
        return {
          x,
          rot,
          y: 0,
          opacity: isGone ? 0 : 1,
          scale: "1, 1, 1",
          delay: undefined,
          config: {
            friction: 50,
            tension: down ? 800 : isGone ? 200 : 500
          }
        };
      });
    }
  });

  return (
    <Container>
      {propSpring.map(({x, y, rot, scale, opacity}, i) => {
        return (
          <Card
            key={state.products[i].id}
            total={state.total}
            offset={state.offset}
            i={i}
            gone={gone}
            bind={bind}
            product={state.products[i]}
            dispatch={clickHandler}
            // animation props
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            opacity={opacity}
          />
        );
      })}
    </Container>
  );
};

export default Deck;
