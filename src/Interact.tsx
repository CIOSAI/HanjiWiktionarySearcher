import React from 'react';
import {Searcher} from './SearchSpan'

export function Interact() {


  return (
    <div>
      <h1>輸入漢字</h1>
      <input type={'text'}></input>
      <div>
        <Searcher></Searcher>
      </div>
    </div>
  );
}