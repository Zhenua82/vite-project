// import React, { useEffect, useRef, useState, useCallback } from "react";

// // Типы для данных из API
// interface Attachment {
//   url: string;
// }
// interface ImageItem {
//   url: string;
//   type?: string;
// }
// interface Images {
//   main?: ImageItem[];
// }
// interface User {
//   name: string;
// }
// interface TrackAttributes {
//   title: string;
//   user: User;
//   attachments?: Attachment[];
//   images?: Images;
// }
// interface Track {
//   id: string;
//   attributes: TrackAttributes;
// }

// function formatTime(time: number): string {
//   if (isNaN(time) || time === 0) return "00:00";
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60);
//   return `${minutes.toString().padStart(2, "0")}:${seconds
//     .toString()
//     .padStart(2, "0")}`;
// }

// interface TrackPlayerProps {
//   track: Track;
// }

// const TrackPlayer: React.FC<TrackPlayerProps> = React.memo(({ track }) => {
//   const {
//     attributes: {
//       title,
//       user: { name: artistName },
//       attachments,
//       images,
//     },
//   } = track;

//   const audioUrl = attachments?.[0]?.url ?? "";
//   const mainImage =
//     images?.main?.find((img) => img.type === "original") ?? images?.main?.[0];

//   const audioRef = useRef<HTMLAudioElement>(null);

//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const onLoadedMetadata = () => {
//       setDuration(audio.duration);
//     };
//     const onTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//     };
//     const onEnded = () => {
//       setIsPlaying(false);
//       setCurrentTime(0);
//     };

//     audio.addEventListener("loadedmetadata", onLoadedMetadata);
//     audio.addEventListener("timeupdate", onTimeUpdate);
//     audio.addEventListener("ended", onEnded);

//     return () => {
//       audio.removeEventListener("loadedmetadata", onLoadedMetadata);
//       audio.removeEventListener("timeupdate", onTimeUpdate);
//       audio.removeEventListener("ended", onEnded);
//     };
//   }, []);

//   const togglePlay = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
//     }
//   }, [isPlaying]);

//   const handleSeek = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const audio = audioRef.current;
//       if (!audio) return;

//       const newTime = Number(e.target.value);
//       audio.currentTime = newTime;
//       setCurrentTime(newTime);
//     },
//     []
//   );

//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: 10,
//         marginBottom: 15,
//         display: "flex",
//         alignItems: "center",
//         gap: 15,
//         maxWidth: 600,
//         margin: 'auto'
//       }}
//     >
//       {mainImage ? (
//         <img
//           src={mainImage.url}
//           alt={title}
//           width={100}
//           height={100}
//           style={{ objectFit: "cover" }}
//         />
//       ) : (
//         <div
//           style={{
//             width: 100,
//             height: 100,
//             backgroundColor: "#ddd",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 12,
//             color: "#666",
//           }}
//         >
//           Нет изображения
//         </div>
//       )}

//       <div style={{ flexGrow: 1 }}>
//         <h3 style={{ margin: "0 0 5px 0" }}>{title}</h3>
//         <p style={{ margin: "0 0 10px 0" }}>Исполнитель: {artistName}</p>

//         {audioUrl ? (
//           <>
//             <audio ref={audioRef} src={audioUrl} preload="metadata" />
//             <button onClick={togglePlay} style={{ marginRight: 10 }}>
//               {isPlaying ? "Пауза" : "Воспроизвести"}
//             </button>
//             <input
//               type="range"
//               min={0}
//               max={duration || 0}
//               value={currentTime}
//               onChange={handleSeek}
//               step={0.01}
//               style={{ verticalAlign: "middle", width: 300 }}
//             />
//             <span style={{ marginLeft: 10, minWidth: 80, display: "inline-block" }}>
//               {formatTime(currentTime)} / {formatTime(duration)}
//             </span>
//             {/* <br></br>
//             <audio src={audioUrl} controls/> */}
//           </>
//         ) : (
//           <div>Аудио отсутствует</div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default TrackPlayer

// import React, {useState} from "react";

import React from "react";

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
interface TrackPlayerProps {
  track: Track;
  isActive: boolean; // добавляем
  onActivate: () => void; // коллбэк для активации трека
}

const TrackPlayer: React.FC<TrackPlayerProps> = React.memo(({ track, isActive, onActivate }) => {
//Без мемоизации (компонет при перерендоре страницы (или родительского компонента) будет каждый раз перерендериваца тоже, даже если его пропсы (track, isActive, onActivate) не изменились):
// function TrackPlayer({ track, isActive, onActivate }: TrackPlayerProps) {
  const {
    attributes: {
      title,
      user: { name: artistName },
      attachments,
      images,
    },
  } = track;
  const audioUrl = attachments?.[0]?.url ?? "";
  const mainImage =
    images?.main?.find((img) => img.type === "original") ?? images?.main?.[0];

  return (
    <div
      style={{
        border: isActive ? "2px solid red" : "1px solid #ccc",
        padding: 10,
        marginBottom: 15,
        display: "flex",
        alignItems: "center",
        gap: 15,
        maxWidth: 600,
        margin: 'auto'
      }}
    >
      {mainImage ? (
        <img
          src={mainImage.url}
          alt={title}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#666",
          }}
        >
          Нет изображения
        </div>
      )}

      <div style={{ flexGrow: 1 }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{title}</h3>
        <p style={{ margin: "0 0 10px 0" }}>Исполнитель: {artistName}</p>

        {audioUrl ? (
            <audio src={audioUrl} controls onPlay={onActivate}  />
        ) : (
          <div>Аудио отсутствует</div>
        )}
      </div>
    </div>
  );
});

export default TrackPlayer