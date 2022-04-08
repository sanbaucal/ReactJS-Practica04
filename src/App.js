import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from './components/navbar';
import Profile from "./components/profile";
import Searchbar from './components/searchbar';
import PostList from "./components/posts";
import axios from "axios";
import Login from './components/login';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const [posts, setPosts] = useState([])
  const [postsDefault, setPostsDefault] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(localStorage.getItem("username"));
      setIsLogged(true)
    }
    else{
      setIsLogged(false)
    }
  }, [])

  useEffect(() => {
    if (isLogged) {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("https://three-points.herokuapp.com/api/posts", config)
        .then((response) => {
          if (response.status === 200) {
            setPosts(response.data);
            setPostsDefault(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged]);

  const onSearchPosts = (valor) => {
    const filterPosts = (str_value, posts_aux) => {
        const filterPosts = posts_aux.filter((val_post) =>
          val_post.author.name.toLowerCase().includes(str_value.toLowerCase())
        );
        return filterPosts;
    }
    setPosts(filterPosts(valor, postsDefault))
  }

  const onLogout = () => {
    setIsLogged(false);
    localStorage.clear()
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/login">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Login onLoginComplete={(valor) => setIsLogged(valor)} />
          )}
        </Route>
        <Route path="/profile">
          {isLogged ? (
            <Profile
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              username={username}
              bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  aspernatur dicta nobis maxime amet quaerat doloribus eligendi
                  officiis, eveniet commodi eum architecto? Esse alias odio ab illum
                  quod, culpa corporis."
              onLogout={onLogout}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/">
          {isLogged ? (
            <div className="container">
              <Searchbar
                onSearch={(valor) => {
                  onSearchPosts(valor);
                }}
              />
              <PostList posts={posts} />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
