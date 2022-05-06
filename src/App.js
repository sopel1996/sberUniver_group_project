import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { PostList } from "./components/PostList";
import Modal from "./components/Modal";
import ModalContext from "./contexts/modalContext";
import { Header } from './Components/Header';
import  Logo  from './Components/Logo';
import Info from './Components/Info';
import { Search } from './Components/Search';
import { Footer } from './Components/Footer';
import api from "./utils/api";

import "normalize.css";
import "./App.css";






function App() {
  const [postsState, setPostsState] = useState([]);
  const [pagesCnt, setPagesCnt] = useState(1);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const handleChangeSearchInput = (value) => {
    setSearchQuery(value);
}; 

  useEffect(() => {
    if (login) {
      api
        .getMeInfo()
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [login]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    msg: null,
  });

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <Modal />
      <div className="appContainer">
      <Header>
        <Logo />
        <Search setQuery={handleChangeSearchInput} />
        <Info user={user} />
      </Header> 
        <Routes>
          <Route
            path="/"
            element={
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />
            }
          />
        </Routes>
      </div>
    </ModalContext.Provider>
  );