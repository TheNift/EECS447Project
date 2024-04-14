import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Entry from '../pages/Entry/Entry';
import Edit from '../pages/Edit/Edit';

const PageRouter = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/search' element={<Search />}></Route>
      <Route exact path='/entry' element={<Entry />}></Route>
      <Route exact path='/edit' element={<Edit />}></Route>
    </Routes>
  );
}

export default PageRouter;