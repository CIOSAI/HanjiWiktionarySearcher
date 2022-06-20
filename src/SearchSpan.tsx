import React, { ReactElement, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { languageCode, LanguageItemReader, getLanguageItemReader} from './LanguageItemReader';

interface SearcherProps{
  character: string
}

export function Searcher(prop:SearcherProps) {
  const [character, setCharacter] = useState(prop.character);
  const [fetchResult, setFetchResult] = useState("");
  const [lister, setLister] = useState([<p></p>]);

  useMemo(() => {
    let url = "https://en.wiktionary.org/w/api.php?"; 
    let params:Map<string, string> = new Map([ 
      ["action", "query"],
      ["prop", "revisions"],
      ["titles", character],
      ["rvprop", "content"],
      ["rvslots", "*"],
      ["format", "json"],
    ])
    params.forEach((v, k)=>{url += "&" + k + "=" + v})

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
      let page = response.query.pages
      let keyOfPage = Object.keys(page)[0]
      console.log(page[keyOfPage].revisions[0].slots.main["*"])
      setFetchResult(page[keyOfPage].revisions[0].slots.main["*"])

    })
    .catch(function(error){console.log(error);});

  }, [character])

  useEffect(()=>{
    if(fetchResult.length>0){
      let splitted = fetchResult.split(/={3}Pronunciation/)
      let filtered = splitted.filter(v=>v.includes("zh")&&(!v.includes("{{character info")))
      let languageItems = filtered.map(v=>v.match(/(\|)(\w+(-_)?\w*=[\p{Letter}]+.*)/gu))
      // langaugeItems 2 d array, [pronunciation][dialect]
      // console.log(filtered)
      // console.log(languageItems)

      let entry:RegExpMatchArray = languageItems[0]!

      console.log(entry)
      
      let toSetLister:JSX.Element[] = []
      
      for(let i=0; i<entry.length; i++){
        let v = entry[i]
        let k = v.substring(1, v.indexOf("="))
        let content:string[] = getLanguageItemReader(k)(v.substring(v.indexOf("=")+1))
        
        toSetLister.push(<p>{ languageCode.get(k) }</p>)
        for(let j=0; j<content.length; j++){
          let contentItem = content[j]
          toSetLister.push(
            <p key={`${i}-${j}`}>{languageCode.has(k)?
              "-"+
              "\t"+
              contentItem
              :""
              }</p>
          )
        }
      }

      setLister(toSetLister)
    }
  },[fetchResult])

  return (
    <div className="dropdown">
      <span>{character}</span>
      <div className="dropdown-content">
      {lister}
      </div>
    </div>
  );
}