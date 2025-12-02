import React, {useState, useEffect} from "react";

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

const ApiMusikDecomp: React.FC = () => {
    const[tracks, setTracks] = useState<Track[] | null>(null);
    const[ramka, setRamka] = useState<number | null | string>(null);

    const [loadingTrack, setLoadingTrack] = useState<boolean>(false);
    const [activeTrack, setActiveTrack] = useState<ActiveTrack | null >(null);
    console.log(loadingTrack)

    useEffect(()=>{
        console.log('useEffect2 запускается');
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
        then(response => response.json()).then((resp: ApiResponse)=>{return setTracks(resp.data)});
        console.log('useEffect2')
    }, []);
    
    if (tracks === null) {
      return <div>Загрузка...</div>;
    }
    const html = tracks.map((el, id) => {
        return (
            <div key = {id} style={el.id === ramka ? {border: '2px solid green'} : {border: 'none'} }>
                <h3 onClick={() => {
                  setRamka(el.id); 
                  //Совершение запроса на сервер сразу при нажатии на элемент:
                  setLoadingTrack(true);
                  fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).then(response => response.json()).
                  then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false); console.log('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + el.id)});
                }} style={{cursor: 'pointer'}}>{el.attributes.title}
                </h3>
                <audio src={el.attributes.attachments[0].url} controls/>
            </div>
        )
    });
    console.log('render2')
    
    return (
        <>
          <div style={{ display: 'flex'}}>Decomp
            <div>
              {html}
            </div>
            {/* <ApiMusikDecomp22 props={activeTrack}/> */}
            <ApiMusikDecomp22 activeTrack={activeTrack}/>
          </div>
        </>
    );
};
export default ApiMusikDecomp;

// interface ApiMusikDecomp22Props {
//   activeTrack: ActiveTrack | null;
// }

// const ApiMusikDecomp22: React.FC<ApiMusikDecomp22Props> = ({ activeTrack }) => {
//   console.log(activeTrack)
//   return ( 
//     <>
//     {!activeTrack && <h2>Нет текста</h2>}
//     {activeTrack && ( `Название: ${activeTrack.attributes.title}, описание: ${activeTrack.attributes.lyrics} `) } 
//     </>
//   );
// };

function ApiMusikDecomp22( props: { activeTrack: ActiveTrack | null } ){
  console.log(props)
  return ( 
    <>
    {!props.activeTrack && <h2>Нет текста</h2>}
    {props.activeTrack && ( `Название: ${props.activeTrack.attributes.title}, описание: ${props.activeTrack.attributes.lyrics} `) } 
    </>
  );
};