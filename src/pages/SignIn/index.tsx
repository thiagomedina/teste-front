import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import * as Yup from 'yup';


// import { useAuth } from '../../hooks/auth';
// import { useToast } from '../../hooks/toast';
// import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from "../../assets/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { Container, Content, AnimationContainer, Background } from "./styles";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = () => {
    console.log("foi");
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit"> Entrar </Button>
          </Form>        
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
