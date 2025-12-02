import React, { useEffect, useState } from "react";
import TrackPlayer from "./TrackPlayer";

export interface Data {
   id: string;
  attributes: TrackAttributes;
}

// Типы для данных из API
interface Attachment {
  url: string;
}

interface ImageItem {
  url: string;
  type?: string;
}

interface Images {
  main?: ImageItem[];
}

interface User {
  name: string;
}

interface TrackAttributes {
  title: string;
  user: User;
  attachments?: Attachment[];
  images?: Images;
}

interface Track {
  id: string;
  attributes: TrackAttributes;
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

const CACHE_KEY = "apiMusikTracksCache";

const ApiMusik: React.FC = () => {
    const [tracks, setTracks] = useState<Track[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTrack, setLoadingTrack] = useState<boolean>(false);
  //Рамка:
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null >(null);
  const handleActivateTrack = (id: string) => {
    setActiveTrackId(id);
    setLoadingTrack(true);
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + id, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
        then(response => response.json()).then((resp)=>{setActiveTrack(resp.data); setLoadingTrack(false)});
  };
//Пагинация:
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const handleNextPage = () => {
    if (tracks) {
        const maxPage = Math.ceil(tracks.length / itemsPerPage);
        setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    }
    };
    const paginatedTracks = tracks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    );

//   useEffect(() => {
//     const cached = localStorage.getItem(CACHE_KEY);
//     if (cached) {
//       try {
//         const parsed: Track[] = JSON.parse(cached);
//         setTracks(parsed);
//         return;
//       } catch {
//         // Если кэш поврежден — игнорируем
//         localStorage.removeItem(CACHE_KEY);
//       }
//     }
//     setLoading(true);
//     fetch(
//       "https://musicfun.it-incubator.app/api/1.0/playlists/tracks?pageNumber=2&pageSize=20&sortBy=publishedAt&sortDirection=desc&paginationType=offset",
//     //   "https://musicfun.it-incubator.app/api/1.0/playlists/tracks",
//       {
//         headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" },
//       }
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Ошибка HTTP: ${response.status}`);
//         }
//         return response.json() as Promise<ApiResponse>;
//       })
//       .then((json) => {
//         setTracks(json.data);
//         localStorage.setItem(CACHE_KEY, JSON.stringify(json.data));
//         console.log(json.data)
//       })
//       .catch((err) => {
//         setError(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
  
//   }, []);
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: Track[] = JSON.parse(cached);
        setTracks(parsed);
        return;
      } catch {
        // Если кэш поврежден — игнорируем
        localStorage.removeItem(CACHE_KEY);
      }
    }
    setLoading(true);
    const urls = [
      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks?pageNumber=1&pageSize=20&sortBy=publishedAt&sortDirection=desc&paginationType=offset",
      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks?pageNumber=2&pageSize=20&sortBy=publishedAt&sortDirection=desc&paginationType=offset",
      //   "https://musicfun.it-incubator.app/api/1.0/playlists/tracks",
    ];
    Promise.all(
      urls.map((url) =>
        fetch(url, {
          headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" },
        })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json() as Promise<ApiResponse>;
      })  )
    ).then((results) => {
    const allTracks: Data[] = results.flatMap((r) => r.data);
        setTracks(allTracks);
        console.log('useEffect1');
        localStorage.setItem(CACHE_KEY, JSON.stringify(allTracks));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!tracks || tracks.length === 0) return <div>Треки не найдены</div>;
  console.log('render1')
  return (
    // <div>
    //   {tracks.map((track) => (
    //     <TrackPlayer key={track.id} track={track} />
    //   ))}
    // </div>
    <>
    <div className="wraper" onClick={() => setActiveTrackId(null)}>
        <div style={{ display: 'flex'}}>
          <div style={{marginTop: '20px'}}>
          {paginatedTracks?.map((track) => (
            <TrackPlayer
              key={track.id}
              track={track}
              isActive={track.id === activeTrackId}
              onActivate={() => handleActivateTrack(track.id)}
            />
          ))}
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
          {loadingTrack && (
              <div>Загрузка...</div>
            )}  
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
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Назад
        </button>
        <span style={{ margin: '0 10px' }}>Страница {currentPage}</span>
        <button
            onClick={handleNextPage}
            disabled={
            tracks
                ? currentPage >= Math.ceil(tracks.length / itemsPerPage)
                : true
            }
        >
            Вперед
        </button>
        </div>
    </div>
    {console.log('Html1')}
    </>
  );
};

export default ApiMusik;