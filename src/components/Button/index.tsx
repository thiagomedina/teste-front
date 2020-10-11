import React, { ButtonHTMLAttributes } from "react";
import svg from "../../assets/load.svg";
import { Container, Loading } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <>
    {loading ? (
      <Loading src={svg} />
    ) : (
      <Container type="button" {...rest}>
        {loading ? null : children}
      </Container>
    )}
 
  </>
);

export default Button;
