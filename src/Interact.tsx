import React, { useEffect, useState } from 'react';
import {Searcher} from './SearchSpan'
import { languageCodeEnum, languageCode } from './LanguageItemReader'

export function Interact() {
  const [textArray, setTextArray] = useState([""]);
  const [languageOptions, setLanguageOptions] = useState([<p key={"wtf bro"}></p>]);
  const [selectedLanguages, setSelectedLanguages] = useState(new Map());

  function selectLanguage(tag:string, val:boolean):void{
    setSelectedLanguages(new Map(selectedLanguages.set(tag, val)))
  }

  useEffect(()=>{

    let toSetLanguageOptions = []
    for(let i of Array.from(languageCode.keys())){
      toSetLanguageOptions.push(
        <li key={i}>
          <input type={"checkbox"} name={i}
          defaultChecked={i==languageCodeEnum.MANDARIN}
          onChange={(evt)=>{
            selectLanguage(evt.currentTarget.name, evt.currentTarget.checked)
          }}></input>
          <label>{languageCode.get(i)}</label>
        </li>
      )
      selectLanguage(i, i==languageCodeEnum.MANDARIN)
    }
    setLanguageOptions(toSetLanguageOptions)

  }, [])

  return (
    <div>
      <h1>輸入漢字</h1>
      <input type={'text'} onKeyDown={(evt) => {
          if(evt.key=='Enter') setTextArray(evt.currentTarget.value.split(""));
        }}></input>
      <ul className='langSel'>{languageOptions}</ul>
      <div>
        {textArray.map((v, i)=>{
          return <Searcher key={v+i.toString()} character={v} mask={selectedLanguages}></Searcher>
        })}
      </div>
    </div>
  );
}