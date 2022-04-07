import './App.css';
import React from "react";
import Navbar from './components/navbar';
import Profile from "./components/profile";
import Searchbar from './components/searchbar';
import PostList from "./components/posts";
import axios from "axios";
import Login from './components/login';

class App extends React.Component {
  state = {
    section: true,
    posts: [],
    postsDefault: [],
    isLogged: false,
    username: null,
    searchText: "",
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const self = this;
    if (token) {
      this.setState({ isLogged: true });
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("https://three-points.herokuapp.com/api/posts", config)
        .then((response) => {
          if (response.status === 200) {
            self.setState({ posts: response.data, postsDefault: response.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      this.setState({ isLogged: false });
    }
  }

  onLoginComplete(valor) {
    this.setState({ isLogged: valor });
    this.componentDidMount();
  }

  onChangeView(valor) {
    this.setState({ section: valor });
  }

  onSearchPosts(valor) {
    const filterPosts = (valor, posts_aux) => {
        const filterPosts = posts_aux.filter((val_post) =>
          val_post.author.name.toLowerCase().includes(valor.toLowerCase())
        );
        return filterPosts;
    }
    this.setState({
      posts: filterPosts(valor, this.state.postsDefault),
    });
  }

  render() {
    return (
      <main className="App">
        <Navbar
          view_active={this.state.section}
          onChangeView={(valor) => {
            this.onChangeView(valor);
          }}
        />

        {this.state.isLogged ? (
          <div>
            <Profile
              view_active={this.state.section}
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              username={localStorage.getItem("username")}
              bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                aspernatur dicta nobis maxime amet quaerat doloribus eligendi
                officiis, eveniet commodi eum architecto? Esse alias odio ab illum
                quod, culpa corporis."
            />
            <div className="container">
              <Searchbar
                view_active={this.state.section}
                onSearch={(valor) => {
                  this.onSearchPosts(valor);
                }}
              />
              <PostList
                view_active={this.state.section}
                posts={this.state.posts}
              />
            </div>
          </div>
        ) : (
          <Login
            onLoginComplete={(valor) => {
              this.onLoginComplete(valor);
            }}
          />
        )}
      </main>
    );
  }
}

export default App;
