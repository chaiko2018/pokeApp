import React from "react";
import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import GetPoke from "./components/getpoke";
import Todo from "./components/todo";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
    // uri: "https://graphql-pokemon.now.sh/",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/pokesearch" component={GetPoke} />
          <Route exact path="/todo" component={Todo} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
