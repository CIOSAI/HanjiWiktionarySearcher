import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';

export function Searcher() {
  const [character, setCharacter] = useState("我");
  const [fetchResult, setFetchResult] = useState("");
  const [parsed, setParsed] = useState("");

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
      setParsed(fetchResult.substring(
        fetchResult.indexOf("===Pronunciation===")+19, 
        fetchResult.indexOf("===Definitions===")
        ))
    }
  },[fetchResult])

  return (
    <div className="dropdown">
      <span>{character}</span>
      <div className="dropdown-content">
        <p>{parsed}</p>
      </div>
    </div>
  );
}