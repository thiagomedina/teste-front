import React, { useCallback, useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link, useHistory } from "react-router-dom";

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Grid,
  UserCard,
  Table,
  Buttons,
  Links,
  Loading
} from "./styles";

import logoImg from "../../assets/logo.png";
import svg from '../../assets/load.svg'
import { FiTrash2, FiPower, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

interface IUser {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password?: string;
  address: {
    zip: string;
    street: string;
    number: string;
    district: string;
    city: string;
  };
}
const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false)

  const handleApiRequest = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    handleApiRequest();
  }, [handleApiRequest]);

  const handleDeleteItem = useCallback(async (e) => {
    await api.delete(`users/${e}`);
    handleApiRequest();
  }, []);

  return (
    <Container>
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

      <Content>
        <Grid>
          <h1>Usuários Cadastrados</h1>


          {loading ? <Loading ><img src={svg}/></Loading> : 
          
           users ? (
            users.map((e) => (
              <UserCard key={e.id}>
                <div>
                  <Table>
                    <strong>Nome: {e.name}</strong>
                    <strong>Email: {e.email}</strong>
                    <strong>CPF: {e.cpf}</strong>
                    <strong>Cidade: {e.address.city}</strong>
                  </Table>
                  <Buttons>
                    <button type="button">
                      <Link to={`/dashboard/form-user/${e.id}`}>
                        <FiEdit2 />
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(e.id)}
                      type="button"
                    >
                      <FiTrash2 />
                    </button>
                  </Buttons>
                </div>
              </UserCard>
            ))
          ) : (
            <h3>Nenhum encontrado</h3>
          )}
          
          
        </Grid>
      </Content>
    </Container>
  );
};

export default Dashboard;
