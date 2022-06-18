import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';

interface SearcherProps{
  character: string
}

export function Searcher(prop:SearcherProps) {
  const [character, setCharacter] = useState(prop.character);
  const [fetchResult, setFetchResult] = useState("");

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
      let filtered = splitted.filter(v=>v.includes("zh")&&(!v.includes("{{character info}}")))
      let languageItems = filtered.map(v=>v.match(/(\|)(\w+=[\p{Letter}]+)/gu))
      // langaugeItems 2 d array, [pronunciation][dialect]
      // console.log(languageItems)

      
    }
  },[fetchResult])

  return (
    <div className="dropdown">
      <span>{character}</span>
      <div className="dropdown-content">
        <p>hello</p>
      </div>
    </div>
  );
}