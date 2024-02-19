import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { database as db, auth } from "../../adapters/firebaseConfig";
import { child, get, onValue, ref, set } from "firebase/database";
import "../../styles/header.css";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { HiUserGroup } from "react-icons/hi";

const dbRef = ref(db);

const DivModal = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TitleModal = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  list-style: none;
  font-family: system-ui;
`;

const HeaderModal = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

const FormModal = styled.div`
  margin: auto;
  color: #fff;
  padding: 30px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
`;
const Label = styled.label`
  color: #fff;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  font-size: 1rem;
  &:hover {
    color: #007bff;
  }
`;
const LabelCode = styled.label`
  color: #777;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
`;
const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
`;
const ListUser = styled.li`
  cursor: pointer;
  padding: 5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  margin: 10px;
  background-color: #444;
  border-radius: 4px;
  list-style: none;
`;
const ListsUser = styled.ul`
  overflow-y: auto;
  max-height: 165px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Header = () => {
  const [salaCriada, setSalaCriada] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [btnSignOut, setBtnSignOut] = useState(false);
  const [nomeSala, setNomeSala] = useState();
  const [nomeUsuario, setNomeUsuario] = useState();
  const [maxGuest, setMaxGuest] = useState(5);
  const [showSearchRoom, setShowSearchRoom] = useState(false);
  const [dataRoom, setDataRoom] = useState();
  const [allRooms, setAllRooms] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalaCriada(true);
    setShowModal(false);
  };

  function writeRoomData() {
    set(ref(db, `Rooms/${nomeSala}`), {
      code: uuidv4(),
      guests: [nomeSala],
      maxGuest: maxGuest,
      own: nomeSala,
    });
    readRoom();
  }

  function readUserInRooms(donoSala) {
    const guestsRef = ref(db, `Rooms/${donoSala}/guests/`);

    get(guestsRef).then((snapshot) => {
      const existingUsers = snapshot.val() || [];
      existingUsers.push(nomeSala);

      set(guestsRef, existingUsers)
        .then(() => {
          console.log(`${nomeSala} adicionado na sala de ${donoSala}`);
          readRoomUser(donoSala);
          setShowSearchRoom(false);
          setShowRoom(true);
        })
        .catch((error) =>
          console.log(`Não foi possivel entrar na sala. Error: ${error}`)
        );
    });
  }

  function readAllRooms() {
    const snapshot = get(child(dbRef, `Rooms/`));
    snapshot.then((e) => {
      setAllRooms(e.val());
    });
  }
  function readRoomUser(donoSala) {
    const snapshot = get(child(dbRef, `Rooms/${donoSala}`));
    snapshot.then((e) => {
      setDataRoom(e.val());
    });
  }
  function readRoom() {
    const snapshot = get(child(dbRef, `Rooms/${nomeSala}`));
    snapshot.then((e) => {
      setDataRoom(e.val());
    });
  }

  function exitRoom() {
    const dbRefPath = ref(db, `Rooms/${nomeSala}/guests/`);

    onValue(dbRefPath, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        console.log(childKey);
        if (childData === nomeUsuario)
          set(ref(db, `Rooms/${nomeSala}/guests/${childKey}`), null);
        setShowRoom(false);
      });
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeSala(user.displayName);
        setNomeUsuario(user.displayName);
        setBtnSignOut(true);
      }
    });
  }, []);

  function deslogar() {
    signOut(auth);
  }

  return (
    <div className="header">
      <nav>
        <Link to="/home" className="home">
          SYNCSTREAM
        </Link>
        <Link to="/series">SÉRIES</Link>
        <Link to="/movies">FILMES</Link>

        {salaCriada ? (
          <Link
            onClick={() => {
              setShowRoom(!showRoom);
              readRoom();
            }}
          >
            SALA DE {nomeSala && nomeSala}
          </Link>
        ) : (
          <Link onClick={() => setShowModal(!showModal)}>CRIAR SALA</Link>
        )}

        {btnSignOut && (
          <Link
            onClick={(e) => {
              e.preventDefault();
              deslogar();
            }}
          >
            sair da conta
          </Link>
        )}
      </nav>

      {/* MODAL DE CRIAR SALA*/}
      {showModal && (
        <Modal>
          <HeaderModal>
            <DivModal>
              <TitleModal>Criar sala</TitleModal>
            </DivModal>
          </HeaderModal>
          <Label
            onClick={() => {
              setShowSearchRoom(true);
              setShowModal(false);
              readAllRooms();
            }}
          >
            Procurar Sala
          </Label>
          <FormModal>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Nome da Sala"
                value={nomeSala}
                disabled
              />

              <Select
                name="group"
                onClick={(e) => {
                  setMaxGuest(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
              </Select>
              <Button
                type="submit"
                onClick={() => {
                  writeRoomData();
                }}
              >
                Criar Sala
              </Button>
            </Form>
          </FormModal>
        </Modal>
      )}

      {/* MODAL DA SALA CRIADA */}
      {showRoom && dataRoom && (
        <Modal>
          <HeaderModal>
            <DivModal>
              <TitleModal>Sala de {nomeSala}</TitleModal>
            </DivModal>
          </HeaderModal>
          <ul style={{ color: "white" }}>
            {Object.values(dataRoom.guests).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>

          <LabelCode>{dataRoom.code}</LabelCode>
          <Label onClick={exitRoom}>Sair da sala</Label>
        </Modal>
      )}

      {/* MODAL DAS SALAS EXISTENTES */}
      {showSearchRoom && (
        <Modal>
          <HeaderModal>
            <DivModal>
              <TitleModal>Salas Existentes</TitleModal>
            </DivModal>
          </HeaderModal>
          <ListsUser style={{ color: "white" }}>
            {allRooms &&
              Object.entries(allRooms).map((key) => (
                <ListUser
                  key={key[0]}
                  onClick={() => {
                    readUserInRooms(key[1].own);
                    setNomeSala(key[1].own);
                  }}
                >
                  Sala de {key[0]} {<HiUserGroup />}
                  {key[1].guests &&
                    key[1].guests.length &&
                    key[1].guests.length + "/" + key[1].maxGuest}
                </ListUser>
              ))}
          </ListsUser>
          <Label
            onClick={() => {
              setShowSearchRoom(false);
              setShowModal(true);
            }}
          >
            Voltar para o inicio
          </Label>
        </Modal>
      )}

      <Outlet />
    </div>
  );
};
