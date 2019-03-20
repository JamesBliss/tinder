import PropTypes from "prop-types";
import styled from "styled-components";

const Aspect = styled.div`
  position: relative;
  background: ${({ fallbackBackground }) => fallbackBackground};
  width: 100%;
  height: 0;

  ${({ h, w }) =>
    h && w
      ? `
    padding-bottom: ${(parseInt(h, 10) / parseInt(w, 10)) * 100}%;
  `
      : ""};

  > * {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

Aspect.defaultProps = {
  h: 1,
  w: 1,
  fallbackBackground: "#8F8F8F"
};

Aspect.propTypes = {
  /**
   * Default height of image or aspect ratio height
   */
  h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Default width of image or aspect ratio width
   */
  w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fallbackBackground: PropTypes.string
};

Aspect.displayName = "Aspect";

export default Aspect;
