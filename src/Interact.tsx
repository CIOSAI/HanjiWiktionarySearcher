import React, { useState } from 'react';
import {Searcher} from './SearchSpan'

export function Interact() {
  const [textArray, setTextArray] = useState([""]);

  return (
    <div>
      <h1>輸入漢字</h1>
      <input type={'text'} onKeyDown={(evt) => {
          if(evt.key=='Enter') setTextArray(evt.currentTarget.value.split(""));
        }}></input>
      <div>
        {textArray.map(v=>{
          return <Searcher key={v} character={v}></Searcher>
        })}
      </div>
    </div>
  );
}