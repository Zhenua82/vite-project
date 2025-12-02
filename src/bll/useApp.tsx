import { useState } from "react";

function useApp(){
  const [ramkaProps, setRamkaProps] = useState < null | number | string>(null);
  //Работа с пропсами между компонентами ApiMusikDecomp1 и ApiMusikDecomp2:
  const setRamkaParent = (index: number | string | null) => {
    return setRamkaProps(index);
  };
  return ({
    ramkaProps,
    setRamkaParent
  }
  )
}

export default useApp