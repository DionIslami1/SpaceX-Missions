import React, { Suspense } from 'react';
import { render } from "react-dom";
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

function Root() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ApolloProvider client={client}>
        <div className="App">
          <App />
        </div>
      </ApolloProvider>
    </Suspense>
  );
}

const rootElement = document.getElementById("root");
render(<Root />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
