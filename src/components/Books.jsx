/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import { useState } from "react"

// Define an API using createApi
const booksApi = createApi({
  // Unique string used in constructing Redux action types, state selectors, and React hook names
  reducerPath: "books",
  // Define a base query function that all endpoints will use as the base of their request
  baseQuery: fetchBaseQuery({
    // The base URL for all requests
    baseUrl: `https://fsa-book-buddy-b6e748d1380d.herokuapp.com`,
    prepareHeaders(headers) {
      headers.set('Content-type', 'application/json'); // Set the Content-type header to application/json
      return headers;
    }

  }),
  // Define endpoints for our API service
  endpoints: (builder) => ({
    // Define an endpoint that fetches players
    getBooks: builder.query({
      // The part of the URL that comes after the baseUrl for this specific endpoint
      query: () => `/api/books`,
    }),
  }),
});

// Export hooks for each endpoint - in this case, a React hook that triggers the fetchPlayers query
const { useGetBooksQuery } = booksApi;

// Create a Redux store
export const store = configureStore({
  reducer: {
    // The key is the reducerPath we defined in our API service, and the value is the reducer
    [booksApi.reducerPath]: booksApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware), // Add the middleware for the posts API
});

export default function Books() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const { data = {}, error, isLoading } = useGetBooksQuery();

  if (isLoading) {
    return <div className={data.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={data.error}>Error: {error.message}</div>;
  }

  return (
    <>
      <br />
      <div>
        <form>
          <input placeholder="Type title here..."
            onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
      
      <div className="book">
        {data.books.filter((book) => {
          return search.toLowerCase() === '' ? book : book.title.toLowerCase().includes(search)
        }).map((book) => (
          <div key={book.id} className="bookCard">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <img className='bookImg' src={book.coverimage} alt={book.title} />
            <br />
            <button onClick={() => {
              navigate(`/books/${book.id}`)
            }}>See Details</button>
          </div>
        ))}
      </div>
    </>
  );
};

