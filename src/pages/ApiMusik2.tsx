import React, {useState, useEffect} from "react";
import { FetchOneTrack, FetchTracks } from "../API/api";

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
interface ActiveTrack {
  attributes: {
    lyrics: string;
    title: string;
  };
}

const ApiMusik2: React.FC = () => {
    const[tracks, setTracks] = useState<Track[] | null>(null);
    const[ramka, setRamka] = useState<number | null | string>(null);

    const [loadingTrack, setLoadingTrack] = useState<boolean>(false);
    const [activeTrack, setActiveTrack] = useState<ActiveTrack | null >(null);

    useEffect(()=>{
        console.log('useEffect2 запускается');
    //     fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
    //     then(response => response.json()).then((resp: ApiResponse)=>{setTracks(resp.data); console.log('Updated tracks:', resp.data)}).catch(error => {
    // console.error('Ошибка при получении треков:', error);});
        FetchTracks().
        then((resp: ApiResponse)=>{setTracks(resp.data); console.log('Updated tracks:', resp.data)}).catch(error => {
    console.error('Ошибка при получении треков:', error);});
        console.log('useEffect2')
    }, []);
    //Совершение запроса на сервер в юзэффекте:
    useEffect(()=>{
      if (ramka === null){
        return
      }
      setLoadingTrack(true);
      // fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).then(response => response.json()).
      // then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false)});
      const controller = new AbortController();
      const signal = controller.signal;
      FetchOneTrack(ramka, signal).
      then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false)});
    }, [ramka]);
    //Проверка бага:
    useEffect(() => {
      console.log('Tracks updated:', tracks);
    }, [tracks]);
    if (tracks === null) {
    return <div>Загрузка...</div>;
    }
    console.log(`Track: ${tracks}`)
    const html = tracks.map((el, id) => {
        return (
            <div key = {id} style={el.id === ramka ? {border: '2px solid green'} : {border: 'none'} }>
                {/* <h3 onClick={() => setRamka(id)} style={{cursor: 'pointer'}}>{el.attributes.title}</h3> */}
                <h3 onClick={() => {
                  setRamka(el.id); 
                  //Совершение запроса на сервер сразу при нажатии на элемент:
                  // setLoadingTrack(true);
                  // fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).then(response => response.json()).
                  // then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false); console.log('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id)});
                }} style={{cursor: 'pointer'}}>{el.attributes.title}
                </h3>
                <audio src={el.attributes.attachments[0].url} controls/>
            </div>
        )
    });
    console.log('render2')
    
    return (
        <>
            <div>22</div>
            <div style={{ display: 'flex'}}>
              <div>
              {html}
              </div>
              {/* {
                loadingTrack ? (
                  <div>Загрузка...</div>
                ) : (
                  activeTrack !== null ? (
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                      <h3>Данные трека:</h3>
                      <h5>Название: {activeTrack.attributes.title}</h5>
                      <h5>Текст: {activeTrack.attributes.lyrics}</h5>
                    </div>
                  ) : (
                    <div style={{ marginLeft: '40px' }}>Трэк не выбран</div>
                  )
                )
              } */}
              {loadingTrack && <div>Загрузка...</div>}
              {(activeTrack !== null) && (
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                      <h3>Данные трека:</h3>
                      <h5>Название: {activeTrack.attributes.title}</h5>
                      <h5>Текст: {activeTrack.attributes.lyrics}</h5>
                    </div>
                  )} 
              {(activeTrack === null) && (
                <div style={{ marginLeft: '40px' }}>Трэк не выбран</div>
              )}
            </div>
            {console.log('Html2')}
        </>
    );
};
export default ApiMusik2