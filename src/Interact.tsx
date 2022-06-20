import React, { useEffect, useState } from 'react';
import {Searcher} from './SearchSpan'
import { languageCode } from './LanguageItemReader'

export function Interact() {
  const [textArray, setTextArray] = useState([""]);
  const [languageOptions, setLanguageOptions] = useState([<p key={"wtf bro"}></p>]);

  useEffect(()=>{

    let toSetLanguageOptions = []
    for(let i of Array.from(languageCode.keys())){
      toSetLanguageOptions.push(
        <div key={i}>
          <input type={"checkbox"} name={i}></input>
          <label>{languageCode.get(i)}</label>
        </div>
      )
    }
    setLanguageOptions(toSetLanguageOptions)

  }, [])

  return (
    <div>
      <h1>輸入漢字</h1>
      <input type={'text'} onKeyDown={(evt) => {
          if(evt.key=='Enter') setTextArray(evt.currentTarget.value.split(""));
        }}></input>
      <ul>{languageOptions}</ul>
      <div>
        {textArray.map(v=>{
          return <Searcher key={v} character={v}></Searcher>
        })}
      </div>
    </div>
  );
}