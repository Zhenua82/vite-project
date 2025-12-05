import { useState, useEffect, useRef } from "react";
import { FetchOneTrack } from "../API/api";
import type { ApiMusikDecomp2Props } from "../pages/ApiMusikDecomp2";

interface ActiveTrack {
  attributes: {
    lyrics: string;
    title: string;
  };
}

function useApiMusikDecomp2(props: ApiMusikDecomp2Props){
  // const[ramka, setRamka] = useState<number | null | string>(null);
    const ramka: string | number | null = props.ramkaProps;
    console.log('Props в Decomp2:', props.ramkaProps);

    const [loadingTrack, setLoadingTrack] = useState<boolean>(false);
    const [activeTrack, setActiveTrack] = useState<ActiveTrack | null >(null);

    // useEffect(()=>{
    //       if (ramka === null){
    //         return
    //       }
    //       setLoadingTrack(true);
    //                   // fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).then(response => response.json()).
    //                   FetchOneTrack(ramka).
    //                   then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false)});
    //     }, [ramka]);

    //Вызов функции запроса данных на сервер FetchOneTrack() с signal (для отмены самого запроса в случае ненадобности! работает в локалке, но не всегда в продакшене):
    // useEffect(() => {
    //   if (ramka === null) {
    //     return;
    //   }
    //   const controller = new AbortController();
    //   const signal = controller.signal;
    //   setLoadingTrack(true);
    //   FetchOneTrack(ramka, signal)
    //     .then((resp) => {
    //       setActiveTrack(resp.data);
    //       setLoadingTrack(false);
    //     })
    //     .catch((error) => {
    //       if (error.name === 'AbortError') {
    //         // Запрос был отменен, ничего не делаем
    //       } else {
    //         // Обработка ошибок
    //         console.error(error);
    //         setLoadingTrack(false);
    //       }
    //     });
    //   // Очистка при смене ramka или размонтировании компонента
    //   return () => {
    //     controller.abort();
    //   };
    // }, [ramka]);
  //Для продакшена:
    const requestIdRef = useRef(0);
    useEffect(() => {
      if (ramka === null) return;

      const id = ++requestIdRef.current;   // Увеличиваем id запроса
      const controller = new AbortController();
      setLoadingTrack(true);

      FetchOneTrack(ramka, controller.signal)
        .then((resp) => {
          // ❗ если это старый запрос — игнорируем
          if (id !== requestIdRef.current) return;
          setActiveTrack(resp.data);
          setLoadingTrack(false);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
            setLoadingTrack(false);
          }
        });
      return () => controller.abort();
    }, [ramka]);

  return {ramka, loadingTrack, activeTrack}
}
export default useApiMusikDecomp2