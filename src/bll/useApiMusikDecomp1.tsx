import React, { useEffect, useState } from "react";
import TrackItem from "../pages/TrackItem";
import { FetchTracks } from "../API/api";
import type {ApiMusikDecomp1Props} from "../pages/ApiMusikDecomp1.tsx";

interface Attachments {
  url: string;
}

interface Attributes {
  title: string;
  attachments: Attachments[];
}

interface Track {
  id: string;
  attributes: Attributes;
}

interface ApiResponse {
  data: Track[];
}

function useApiMusikDecomp1(props: ApiMusikDecomp1Props){
  const[tracks, setTracks] = useState<Track[] | null>(null);
    
    useEffect(()=>{
        console.log('useEffect2 запускается');
        // fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
        // then(response => response.json()).then((resp: ApiResponse)=>{return setTracks(resp.data)});
        FetchTracks().then((resp: ApiResponse)=>{return setTracks(resp.data)});
        console.log('useEffect2')
    }, []);

    const handleClick = (trackId: string | null | number) => {props.setRamkaParent(trackId); console.log('????????')}//Вынесли функцию из map (вместо const setRamkaParent = () => {props.setRamkaParent(el.id)})
    const html = tracks ? tracks.map((el) => {
      // const setRamkaParent = () => {props.setRamkaParent(el.id); console.log('$$$$$$$$')}
        return (
          <React.Fragment key={el.id}>
            {/* <div key = {el.id} style={el.id === props.ramkaProps ? {border: '2px solid green'} : {border: 'none'} }>
                <h3 onClick = {setRamkaParent}
                // {() => { 
                //   props.setRamkaParent(el.id);
                //   Совершение запроса на сервер сразу при нажатии на элемент:
                //   setLoadingTrack(true);
                //   fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).then(response => response.json()).
                //   then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false); console.log('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id)});
                // }} 
                style={{cursor: 'pointer'}}>{el.attributes.title}
                </h3>
                <audio src={el.attributes.attachments[0].url} controls/>
            </div> */}
            <TrackItem 
            key = {el.id} 
            id = {el.id} 
            title = {el.attributes.title} 
            audio = {el.attributes.attachments[0].url} 
            ramkaProps={props.ramkaProps} 
            isSelected = {el.id === props.ramkaProps}
            // setRamkaParent = {setRamkaParent}/>
            onSelect = {handleClick}/>
            </React.Fragment>
        )
    }): null;
  return {tracks, html}
}
export default useApiMusikDecomp1