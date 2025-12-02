import React from "react";
import useApiMusikDecomp1 from "../bll/useApiMusikDecomp1";

export type ApiMusikDecomp1Props = {
  setRamkaParent: (index:string | number | null) => void;
  ramkaProps: string | number | null
};

const ApiMusikDecomp1: React.FC<ApiMusikDecomp1Props> = (props) => {
    const {tracks, html} = useApiMusikDecomp1(props)
    
    if (tracks === null) {
      return <div>Загрузка...</div>;
    }
    
    return (
        <>
            <div>Decomp1</div>
            
            <div>
              {html}
            </div>
        </>
    );
};
export default ApiMusikDecomp1

