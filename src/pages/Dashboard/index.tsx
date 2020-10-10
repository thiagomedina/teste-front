import React, { useCallback, useState, useEffect } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { api } from "../../services/api";

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Grid,
  UserCard,
  Table,
  Buttons,
} from "./styles";

import logoImg from "../../assets/logo.png";
import { FiTrash2, FiPower, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: number;
  city: string;
}
const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);

  const handleApiRequest = useCallback(async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
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

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Grid>
          <h1>Usuários Cadastrados</h1>
          {users ? (
            users.map((e) => (
              <UserCard key={e.id}>
                <div>
                  <Table>
                    <strong>Nome: {e.name}</strong>
                    <strong>Email: {e.email}</strong>
                    <strong>CPF: {e.cpf}</strong>
                  </Table>
                  <Buttons>
                    <button type="button">
                      <FiEdit2 />
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
