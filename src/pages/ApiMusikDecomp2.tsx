import React from "react";
import useApiMusikDecomp2 from "../bll/useApiMusikDecomp2";

export type ApiMusikDecomp2Props = {
  ramkaProps: string | number | null;
};

const ApiMusikDecomp2: React.FC<ApiMusikDecomp2Props> = (props) => {
  const { loadingTrack, activeTrack } = useApiMusikDecomp2(props) 
    return (
        <>
            <div>Decomp2</div>  
            {loadingTrack && <div style={{ color: 'red'}}>Загрузка...</div>}
            {(activeTrack !== null) && (
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '40px', border: '2px solid red', padding: '0px 50px' }}>
                    <h3>Данные трека:</h3>
                    <h5>Название: {activeTrack.attributes.title}</h5>
                    <h5>Текст: {activeTrack.attributes.lyrics}</h5>
                  </div>
                )} 
            {(activeTrack === null) && (
              <div style={{ marginLeft: '40px' }}>Трэк не выбран</div>
            )}
        </>
    );
};

export default ApiMusikDecomp2