import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { useAuth } from "../../../hooks/auth";
import Button from "../../../components/Button";
import { api, apiViaCep } from "../../../services/api";
import { Container, Header, HeaderContent, Links } from "./styles";
import { FiPower } from "react-icons/fi";

import logoImg from "../../../assets/logo.png";
import getValidationErrors from "../../../utils/getValidationErrors";
import { useToast } from "../../../hooks/toast";
import Input from "../../../components/Input";
import { uuid } from "uuidv4";

interface inputValuesDTO {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password?: string;
  zip: string;
  street: string;
  number: string;
  district: string;
  city: string;
}

const FormUser: React.FC = () => {
  const { addToast } = useToast();
  const { signOut } = useAuth();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");

  const [street, setStreet] = useState("");

  const handleSubmit = useCallback(async (data: inputValuesDTO) => {
    try {
      formRef.current?.setErrors({});
      setLoading(true)

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um e-mail válido"),
        cpf: Yup.string().min(11, "Mínimo 11 digitos"),
        name: Yup.string().required("Nome obrigatório"),
        zip: Yup.string().min(8, "Mínimo 8 digitos"),
        street: Yup.string().required("Rua obrigatório"),
        number: Yup.string().required("Número obrigatório"),
        district: Yup.string().required("Bairro obrigatório"),
        city: Yup.string().required("cidade obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        console.log(data, id);
        await api.put(`/users/${id}`, {
          id: id,
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          address: {
            zip: data.zip,
            street: data.street,
            number: data.number,
            district: data.district,
            city: data.city,
          },
        });
      }else{
        await api.post("/users", {
          id: uuid(),
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          address: {
            zip: data.zip,
            street: data.street,
            number: data.number,
            district: data.district,
            city: data.city,
          },
          token: uuid()
        });
      }
     

      addToast({
        type: "success",
        description: "Usuário criado com sucesso",
        title: "Sucesso na criação",
      });
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: "error",
        description:
          "Ocorreu um erro ao cadastrar o usuário, verifique servidor",
        title: "Erro no servidor",
      });
    }finally{
      setLoading(false)
    }
  }, []);

  const filterApi = async () => {
    const response = await api.get("/users");
    const user = response.data.filter((obj: inputValuesDTO) => obj.id === id);
    setName(user[0].name);
    setEmail(user[0].email);
    setCpf(user[0].cpf);
    setZip(user[0].address.zip);
    setStreet(user[0].address.street);
    setCity(user[0].address.city);
    setDistrict(user[0].address.district);
    setNumber(user[0].address.number);
  };

  useEffect(() => {
    if (id) {
      filterApi();
    }
  }, []);

  return (
    <>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="2seed" />

          <Links>
            <Link to="/dashboard/form-user">Cadastrar Novo usuário</Link>
          </Links>
          <Links>
            <Link to="/dashboard">Dashboard</Link>
          </Links>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Container>
        <h2>Insira as informações nos campos abaixo</h2>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados pessoais</legend>

            <Input
              type="text"
              placeholder="nome"
              name="name"
              defaultValue={name}
            />
            <Input
              type="text"
              placeholder="cpf"
              name="cpf"
              defaultValue={cpf}
            />
            <Input
              type="text"
              placeholder="email"
              name="email"
              defaultValue={email}
            />
          </fieldset>
          <fieldset>
            <legend>Endereço</legend>

            <Input
              type="text"
              placeholder="cep"
              name="zip"
              defaultValue={zip}
            />
            <Input
              type="text"
              placeholder="rua"
              name="street"
              defaultValue={street}
            />
            <Input
              type="number"
              placeholder="numero"
              name="number"
              defaultValue={number}
            />
            <Input
              type="text"
              placeholder="bairro"
              name="district"
              defaultValue={district}
            />
            <Input
              type="text"
              placeholder="cidade"
              name="city"
              defaultValue={city}
            />
            <Button loading={loading} type="submit">Salvar</Button>
          </fieldset>
        </Form>
      </Container>
    </>
  );
};

export default FormUser;
