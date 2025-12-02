const VITE_API_KEY = import.meta.env.VITE_API_KEY
console.log(VITE_API_KEY)

function apiKey(signal: AbortSignal){
   if(!VITE_API_KEY){
    return undefined
   }
  return {headers: { "api-key": VITE_API_KEY}, signal}
}

export async function HandleUpdateServRender() {
  const response = await fetch('https://testserverrender.onrender.com/bd', { method: 'POST' });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching posts: ${errorText}`);
  }
  const data = await response.json();
  return data;
}

// export function FetchTracks(){
//     const data = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
//         then(response => response.json())
//     return data
// }

// export function FetchOneTrack(ramka: string | number | null){
//    const data = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }}).
//    then(response => response.json())
//    return data
// }
//Тот же запрос с абортконтроллером signal (требует особый порядок его вызова в useApiMusikDecomp2.ts !):
export function FetchOneTrack(ramka: string | number | null, signal: AbortSignal){
  //  const data = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, {headers: { "api-key": "96ba9d34-c203-4d34-9c17-e514c673cf38" }, signal}).
  //  const data = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, {headers: { "api-key": VITE_API_KEY}, signal}).
   const data = fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + ramka, apiKey(signal)).
   then(response => response.json())
   return data
}
//Заглушка для FetchOneTrack:
// export function FetchOneTrack(ramka: string | number | null){
//     console.log(ramka)
//    const data = Promise.resolve({
//   "data": {
//     "id": "196e9939-2311-4dbf-bb51-d3c0676e8bfd",
//     "type": "tracks",
//     "attributes": {
//       "title": "myTrackTest",
//       "lyrics": null,
//       "user": {
//         "id": "269",
//         "name": "EGalanin_364"
//       },
//       "releaseDate": null,
//       "addedAt": "2025-10-12T09:26:54.793Z",
//       "updatedAt": "2025-10-16T05:17:34.479Z",
//       "duration": 0,
//       "attachments": [
//         {
//           "id": "4ca76c7e-90e2-495c-96f5-45f71f5f2507",
//           "addedAt": "2025-10-12T09:26:43.474Z",
//           "updatedAt": "2025-10-12T09:26:43.474Z",
//           "version": 1,
//           "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/b316d7cd-5f46-48e7-96a7-7e857ec47f36_So Strung Out.mp3",
//           "contentType": "audio/mpeg",
//           "originalName": "So Strung Out.mp3",
//           "fileSize": 967181
//         }
//       ],
//       "images": {
//         "main": [
//           {
//             "type": "original",
//             "width": 736,
//             "height": 736,
//             "fileSize": 77964,
//             "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/76c5e388-9616-4bcb-a95a-eac7f9f394ea_cover.jpg"
//           },
//           {
//             "type": "medium",
//             "width": 156,
//             "height": 156,
//             "fileSize": 5551,
//             "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/d01f132a-91a7-4a3a-a7dd-c34baa39210f_image.png"
//           },
//           {
//             "type": "thumbnail",
//             "width": 48,
//             "height": 48,
//             "fileSize": 1019,
//             "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/dfcd6529-b4af-47dd-a2bd-5156c7750820_image.png"
//           }
//         ]
//       },
//       "tags": [],
//       "artists": [],
//       "likesCount": 1,
//       "dislikesCount": 0,
//       "currentUserReaction": 0,
//       "publishedAt": "2025-10-12T09:27:09.934Z",
//       "isPublished": true
//     }
//   }
// })
//    return data
// }

//Заглушка для FetchTracks:
export function FetchTracks(){
   const data = Promise.resolve({
  "data": [
    {
      "id": "40941736-77b7-4bb0-b3b2-ca1e31e1f4a6",
      "type": "tracks",
      "attributes": {
        "title": "sddswe",
        "user": {
          "id": "19",
          "name": "dimych"
        },
        "addedAt": "2025-10-28T16:18:51.946Z",
        "attachments": [
          {
            "id": "07fc331e-edd2-4615-9c0b-4b76d2ce956f",
            "addedAt": "2025-10-28T16:18:49.738Z",
            "updatedAt": "2025-10-28T16:18:49.738Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/b36eca74-d59a-4bb2-89bb-9340c920188f_1.mp3",
            "contentType": "audio/mpeg",
            "originalName": "1.mp3",
            "fileSize": 70217
          }
        ],
        "images": {
          "main": [
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 5646,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/cf8be8f1-c446-415d-af72-4112d3cb1569_image.png"
            },
            {
              "type": "original",
              "width": 213,
              "height": 213,
              "fileSize": 12052,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/35c76ebd-511e-4e4f-b1e2-006ef8dfc05d_Ð°Ð¸ÌÑÐ¸Ð»Ð¸ÐºÐ±ÐµÐ· Ð¸Ð· ÑÐ°ÑÐ¸Ð»Ñ.jpg"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1159,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/463a6b88-44cc-48cb-8bb1-229d3153a692_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-10-28T19:48:05.967Z",
        "likesCount": 0,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "196e9939-2311-4dbf-bb51-d3c0676e8bfd",
      "type": "tracks",
      "attributes": {
        "title": "myTrackTest",
        "user": {
          "id": "269",
          "name": "EGalanin_364"
        },
        "addedAt": "2025-10-12T09:26:54.793Z",
        "attachments": [
          {
            "id": "4ca76c7e-90e2-495c-96f5-45f71f5f2507",
            "addedAt": "2025-10-12T09:26:43.474Z",
            "updatedAt": "2025-10-12T09:26:43.474Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/b316d7cd-5f46-48e7-96a7-7e857ec47f36_So Strung Out.mp3",
            "contentType": "audio/mpeg",
            "originalName": "So Strung Out.mp3",
            "fileSize": 967181
          }
        ],
        "images": {
          "main": [
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1019,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/dfcd6529-b4af-47dd-a2bd-5156c7750820_image.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 5551,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/d01f132a-91a7-4a3a-a7dd-c34baa39210f_image.png"
            },
            {
              "type": "original",
              "width": 736,
              "height": 736,
              "fileSize": 77964,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/76c5e388-9616-4bcb-a95a-eac7f9f394ea_cover.jpg"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-10-12T09:27:09.934Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "88133ec1-f82d-4fbb-b53b-5138b6fc7b90",
      "type": "tracks",
      "attributes": {
        "title": "gangsta react",
        "user": {
          "id": "19",
          "name": "dimych"
        },
        "addedAt": "2025-08-13T19:15:17.182Z",
        "attachments": [
          {
            "id": "b217ec35-9021-4318-b0ca-7b31df1958a6",
            "addedAt": "2025-08-13T19:15:15.487Z",
            "updatedAt": "2025-08-13T19:15:15.487Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/0ae77ecd-f271-4e4c-881c-74e4bdfb4046_file4.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file4.mp3",
            "fileSize": 16800
          }
        ],
        "images": {
          "main": [
            {
              "type": "original",
              "width": 200,
              "height": 200,
              "fileSize": 14040,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/e46c0be9-f36e-4131-abbc-0e6512985550_cover.png"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 945,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/b3bd1da4-7b4c-4fa9-a959-0915c3c4abf4_image.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 5615,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/f9340e41-b46e-4db2-a504-b37383e9c0bd_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-08-13T19:16:27.070Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "79fce981-0956-4415-875c-9f90c6ad8a97",
      "type": "tracks",
      "attributes": {
        "title": "11111",
        "user": {
          "id": "38",
          "name": "artvrybin_45c"
        },
        "addedAt": "2025-08-07T11:48:07.065Z",
        "attachments": [
          {
            "id": "2b122161-98a8-43b2-b29c-9f58a45d19c9",
            "addedAt": "2025-08-07T11:47:54.464Z",
            "updatedAt": "2025-08-07T11:47:54.464Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/815b57b4-92f3-4134-9deb-749d27791ab1_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-08-07T11:48:07.484Z",
        "likesCount": 2,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "75e4b87d-758e-43e6-8cf7-2fa0bd2ef413",
      "type": "tracks",
      "attributes": {
        "title": "Skottish Sky",
        "user": {
          "id": "68",
          "name": "wecodit"
        },
        "addedAt": "2025-07-18T09:52:08.251Z",
        "attachments": [
          {
            "id": "db844f19-fc4b-4976-a6ac-e1fb250ce0f6",
            "addedAt": "2025-07-18T09:52:06.603Z",
            "updatedAt": "2025-07-18T09:52:06.603Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/dfa8a391-da1d-4c24-afd3-f49e4ceea6dc_426447_8043-lq.mp3",
            "contentType": "audio/mpeg",
            "originalName": "426447_8043-lq.mp3",
            "fileSize": 106584
          }
        ],
        "images": {
          "main": [
            {
              "type": "original",
              "width": 785,
              "height": 785,
              "fileSize": 83949,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/1ff883dd-ab07-4685-b422-29c74941297f_2020-12-11_01-22-58.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 4901,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/a0645f06-5c42-43fb-bfac-36af92ce1c0e_image.png"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 969,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/106b7626-90eb-4f5e-bf00-90d6dd6440fd_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-18T09:53:19.715Z",
        "likesCount": 6,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": [
            {
              "id": "ba748a6c-2102-4ca2-8c37-f3a2dc78a647",
              "type": "artists"
            }
          ]
        }
      }
    },
    {
      "id": "50587ef5-d06d-4d3e-9e81-821d20f30d2e",
      "type": "tracks",
      "attributes": {
        "title": "tot trek",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-06-24T21:57:27.308Z",
        "attachments": [
          {
            "id": "c0e96f9e-1ce8-4d22-9a6e-5e95e76b79b3",
            "addedAt": "2025-06-24T21:57:15.670Z",
            "updatedAt": "2025-06-24T21:57:15.670Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/025ca7bb-9777-4795-9ce7-1455ea469f99_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": [
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1056,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/4ce3aaf9-7751-4165-8b0a-5b95267ccee7_image.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 6346,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/da2e9ee6-f85c-4a5c-85bc-cd59c23c7706_image.png"
            },
            {
              "type": "original",
              "width": 1000,
              "height": 1000,
              "fileSize": 100146,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/84c3972a-867f-4b18-bc1f-0adabe6f0510_album_cover_final_100kb.jpg"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-18T09:01:44.343Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "8c81e17a-281a-4015-9066-51cf3266ad7a",
      "type": "tracks",
      "attributes": {
        "title": "asdasd",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-09T22:17:16.046Z",
        "attachments": [
          {
            "id": "65356be4-5118-461d-b641-5e14be048186",
            "addedAt": "2025-07-09T22:17:04.795Z",
            "updatedAt": "2025-07-09T22:17:04.795Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/40157ebc-1d63-4a43-bee0-61cb50eac516_02 SO 2E Int WB U01 R01 (4).mp3",
            "contentType": "audio/mpeg",
            "originalName": "02 SO 2E Int WB U01 R01 (4).mp3",
            "fileSize": 662613
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-18T09:01:41.586Z",
        "likesCount": 2,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "45e36ec1-ce63-4f92-8411-c970ad80b000",
      "type": "tracks",
      "attributes": {
        "title": "Hohoho",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-01T05:25:34.465Z",
        "attachments": [
          {
            "id": "9cc6ef9b-303d-4b52-9f79-a7ebd58f25b5",
            "addedAt": "2025-07-01T05:25:21.359Z",
            "updatedAt": "2025-07-01T05:25:21.359Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/e5d58852-cfb0-48aa-a87d-8641fcf43b04_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": [
            {
              "type": "original",
              "width": 1000,
              "height": 1000,
              "fileSize": 100146,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/665f5c8f-850b-4595-ab99-5a091b093543_album_cover_final_100kb.jpg"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1056,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/c0bf4d0d-8f11-4340-bd52-edb697fd7364_image.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 6346,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/8bd28ac1-b8d7-4d26-98f1-c3e22ca6753a_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:26.626Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "56d5f0b4-a84e-48bd-89c5-704030c4e2b3",
      "type": "tracks",
      "attributes": {
        "title": "Trek_01",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-06-25T05:13:49.906Z",
        "attachments": [
          {
            "id": "ca55213c-8122-410e-a588-ae42e344c544",
            "addedAt": "2025-06-25T05:13:38.770Z",
            "updatedAt": "2025-06-25T05:13:38.770Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/0f105346-e1c1-44d0-8b61-1e554ad0eec2_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": [
            {
              "type": "original",
              "width": 1000,
              "height": 1000,
              "fileSize": 100146,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/32cd54e7-001e-405e-afc2-7fce2315f163_album_cover_final_100kb.jpg"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1056,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/cc86c9c2-0f98-46ca-99b5-80681ea3361d_image.png"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 6346,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/0277a8a5-cb0d-438f-865d-ba2b7bde7946_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:25.397Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "5e97fc80-dc16-427f-8037-d96db76faeee",
      "type": "tracks",
      "attributes": {
        "title": "new track",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-09T22:18:09.475Z",
        "attachments": [
          {
            "id": "90bcf795-29a6-4c9c-95f2-2370d8e6c420",
            "addedAt": "2025-07-09T22:17:58.259Z",
            "updatedAt": "2025-07-09T22:17:58.259Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/664f7d24-01a7-45e2-a27d-390df3669e3e_02 SO 2E Int WB U01 R01 (4).mp3",
            "contentType": "audio/mpeg",
            "originalName": "02 SO 2E Int WB U01 R01 (4).mp3",
            "fileSize": 662613
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:24.090Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "8f399bbd-7d21-4fb4-89ab-eb0419c2f39c",
      "type": "tracks",
      "attributes": {
        "title": "New file",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-09T22:15:33.811Z",
        "attachments": [
          {
            "id": "d49b24cf-7d9a-4793-8331-1b92fdaf1ce0",
            "addedAt": "2025-07-09T22:15:22.266Z",
            "updatedAt": "2025-07-09T22:15:22.266Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/11cf398d-de40-4a49-a92f-8aaa7f0fbc69_02 SO 2E Int WB U01 R01 (4).mp3",
            "contentType": "audio/mpeg",
            "originalName": "02 SO 2E Int WB U01 R01 (4).mp3",
            "fileSize": 662613
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:23.246Z",
        "likesCount": 2,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "930a99d6-a25f-4cbe-bf08-772d673136e1",
      "type": "tracks",
      "attributes": {
        "title": "New tag",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-10T07:10:10.600Z",
        "attachments": [
          {
            "id": "519a3eb0-7819-47c5-a298-0ff30bc992b2",
            "addedAt": "2025-07-10T07:09:56.060Z",
            "updatedAt": "2025-07-10T07:09:56.060Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/7e178b2b-acff-463e-a9b9-b372ce5335c8_02 SO 2E Int WB U01 R01 (4).mp3",
            "contentType": "audio/mpeg",
            "originalName": "02 SO 2E Int WB U01 R01 (4).mp3",
            "fileSize": 662613
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:22.180Z",
        "likesCount": 3,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "a9af3ff1-8bfd-4d3a-a0f1-360fdd72ec19",
      "type": "tracks",
      "attributes": {
        "title": "new track",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-09T22:23:16.913Z",
        "attachments": [
          {
            "id": "2ea16c66-efac-42a8-9e36-ed3f7db6f7dc",
            "addedAt": "2025-07-09T22:23:06.525Z",
            "updatedAt": "2025-07-09T22:23:06.525Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/bce65078-df4c-4770-a49f-7d105a7f500f_02 SO 2E Int WB U01 R01 (4).mp3",
            "contentType": "audio/mpeg",
            "originalName": "02 SO 2E Int WB U01 R01 (4).mp3",
            "fileSize": 662613
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:21.339Z",
        "likesCount": 2,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "b5e61599-6e33-41ae-a3ba-30f33a607370",
      "type": "tracks",
      "attributes": {
        "title": "asda",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-16T20:09:14.305Z",
        "attachments": [
          {
            "id": "252dd4f3-4813-4664-81a6-247c8eeb7411",
            "addedAt": "2025-07-16T20:09:00.774Z",
            "updatedAt": "2025-07-16T20:09:00.774Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/037bcfe2-c484-4b4a-ac77-2063e4f55562_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:20.649Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "e3d11d10-524f-4cb6-aa35-e5de850c6d38",
      "type": "tracks",
      "attributes": {
        "title": "Add new track",
        "user": {
          "id": "28",
          "name": "Stas-Lob_f72"
        },
        "addedAt": "2025-07-17T19:16:20.812Z",
        "attachments": [
          {
            "id": "b29c3b7b-b47a-40c9-8ff1-b334f6261d02",
            "addedAt": "2025-07-17T19:16:09.232Z",
            "updatedAt": "2025-07-17T19:16:09.232Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/a90be6c7-a20b-46ea-8989-2a397ea9890f_file_example_MP3_700KB.mp3",
            "contentType": "audio/mpeg",
            "originalName": "file_example_MP3_700KB.mp3",
            "fileSize": 733645
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-17T20:36:19.938Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "bd6ac87d-dea1-44eb-8c06-badf4b65f144",
      "type": "tracks",
      "attributes": {
        "title": "Баллада ",
        "user": {
          "id": "68",
          "name": "wecodit"
        },
        "addedAt": "2025-07-16T21:42:56.606Z",
        "attachments": [
          {
            "id": "9ad9ffe3-fdf7-4c84-8720-0ade6f6be811",
            "addedAt": "2025-07-16T21:42:51.975Z",
            "updatedAt": "2025-07-16T21:42:51.975Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/41ad698b-8efc-4a30-8441-a8552b39fefa_426447_8043-lq.mp3",
            "contentType": "audio/mpeg",
            "originalName": "426447_8043-lq.mp3",
            "fileSize": 106584
          }
        ],
        "images": {
          "main": [
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 10729,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/432edc2b-8852-4fa0-9229-1c58b11461bf_image.png"
            },
            {
              "type": "original",
              "width": 272,
              "height": 272,
              "fileSize": 42811,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/ca51a493-9b2e-4cf1-ad21-341eb8426258_winter-song.jpg"
            },
            {
              "type": "medium",
              "width": 156,
              "height": 156,
              "fileSize": 11778,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/7b8187a9-1d8a-4b27-a333-761aec9f0dea_image.png"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1441,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/7356cf0e-c238-446c-9c25-e8b67a7070e9_image.png"
            },
            {
              "type": "thumbnail",
              "width": 48,
              "height": 48,
              "fileSize": 1391,
              "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Image/3254a799-2c7f-4b4a-aede-fe81ee5b6e0e_image.png"
            }
          ]
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-16T21:43:54.460Z",
        "likesCount": 2,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": [
            {
              "id": "1b516ddd-5916-404a-bb01-b56cfb9922ac",
              "type": "artists"
            }
          ]
        }
      }
    },
    {
      "id": "2dc6b38a-da37-4f13-aba0-b30e0741f590",
      "type": "tracks",
      "attributes": {
        "title": "426447_8043-lq.mp3",
        "user": {
          "id": "68",
          "name": "wecodit"
        },
        "addedAt": "2025-07-16T21:35:26.105Z",
        "attachments": [
          {
            "id": "b39c7108-c432-4f56-9e5b-e23e85be5d4d",
            "addedAt": "2025-07-16T21:35:20.953Z",
            "updatedAt": "2025-07-16T21:35:20.953Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/ae78be74-af06-47be-b15a-480aa5916778_426447_8043-lq.mp3",
            "contentType": "audio/mpeg",
            "originalName": "426447_8043-lq.mp3",
            "fileSize": 106584
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-16T21:36:19.273Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "30a10b73-d6bb-4b3f-948a-1cddaf9264bd",
      "type": "tracks",
      "attributes": {
        "title": "426447_8043-lq.mp3",
        "user": {
          "id": "68",
          "name": "wecodit"
        },
        "addedAt": "2025-07-16T14:56:16.813Z",
        "attachments": [
          {
            "id": "030e645a-e0c7-427b-9c11-c44d30fcad4b",
            "addedAt": "2025-07-16T14:56:14.974Z",
            "updatedAt": "2025-07-16T14:56:14.974Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/6d525ff8-486c-4ef2-9cde-6cf25c1e6d76_426447_8043-lq.mp3",
            "contentType": "audio/mpeg",
            "originalName": "426447_8043-lq.mp3",
            "fileSize": 106584
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-16T14:56:19.401Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "bc914e10-b253-4f72-a556-10ba2009f2d9",
      "type": "tracks",
      "attributes": {
        "title": "hello",
        "user": {
          "id": "1",
          "name": "safronman"
        },
        "addedAt": "2025-07-16T12:27:42.205Z",
        "attachments": [
          {
            "id": "76566fbe-384f-4cbd-975b-196b85be12b9",
            "addedAt": "2025-07-16T12:27:29.515Z",
            "updatedAt": "2025-07-16T12:27:29.515Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/673244ad-b414-4f18-bcdc-f90ce04b5e8a_Home-Base-Groove-Kevin-MacLeod.mp3",
            "contentType": "audio/mpeg",
            "originalName": "Home-Base-Groove-Kevin-MacLeod.mp3",
            "fileSize": 877931
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-16T12:28:02.509Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    },
    {
      "id": "d5d6d480-7376-4eb0-9872-c1f60af5a776",
      "type": "tracks",
      "attributes": {
        "title": "window",
        "user": {
          "id": "1",
          "name": "safronman"
        },
        "addedAt": "2025-07-16T12:26:53.022Z",
        "attachments": [
          {
            "id": "240fc91a-5d11-4a25-bb19-298c9fbb0486",
            "addedAt": "2025-07-16T12:26:39.970Z",
            "updatedAt": "2025-07-16T12:26:39.970Z",
            "version": 1,
            "url": "https://production-it-incubator.s3.eu-central-1.amazonaws.com/apihub-spotifun/Video/86b7967b-e1e7-4adf-b01d-a31aba552cd3_Fix-Bayonets-United-States-Marine-Band.mp3",
            "contentType": "audio/mpeg",
            "originalName": "Fix-Bayonets-United-States-Marine-Band.mp3",
            "fileSize": 936461
          }
        ],
        "images": {
          "main": []
        },
        "currentUserReaction": 0,
        "publishedAt": "2025-07-16T12:27:05.422Z",
        "likesCount": 1,
        "isPublished": true
      },
      "relationships": {
        "artists": {
          "data": []
        }
      }
    }
  ],
  "included": [
    {
      "id": "1b516ddd-5916-404a-bb01-b56cfb9922ac",
      "type": "artists",
      "attributes": {
        "name": "eminem"
      }
    },
    {
      "id": "ba748a6c-2102-4ca2-8c37-f3a2dc78a647",
      "type": "artists",
      "attributes": {
        "name": "madonna"
      }
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 30,
    "pagesCount": 2,
    "nextCursor": null
  }
})
    return data
}