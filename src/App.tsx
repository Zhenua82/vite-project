import { useState, useEffect } from 'react';
import './App.css';
import { HandleUpdateServRender } from './API/api';
import useApp from './bll/useApp';
import ApiMusikDecomp1 from './pages/ApiMusikDecomp1';
import ApiMusikDecomp2 from './pages/ApiMusikDecomp2';

// import JsxHtml from './pages/JsxHtml';
// import ApiMusik from './pages/ApiMusik';
// import ApiMusik2 from './pages/ApiMusik2';
// import Iterator from './pages/iterator';
// import ApiMusikDecomp from './pages/ApiMusikDecomp';


interface Person {
  Name: string;
  telephone: string;
  profession_title: string;
}

// const tracks = null;
// console.log('Hi!' && 56);
// console.log('Hi!' || 46);
// console.log(false || 46);
// console.log(true);
// console.log(false);
// console.log(true && 77);
// console.log(!tracks);
// console.log(!tracks && false);



function App() {
  console.log('Перересовка компонента App')
  // const [count, setCount] = useState<Person[]>([]);
  const [count, setCount] = useState <Person[] | null | []>(null);
  const [ramka, setRamka] = useState < null | number>(null);
  const [ramka2, setRamka2] = useState < null | number>(null);

  const { ramkaProps, setRamkaParent} = useApp()
  
//Запрос на сервер render о мастерах:
  // const handleUpdate = async () => {
  //   try {
  //     const response = await fetch('https://testserverrender.onrender.com/bd', { method: 'POST' });
  //     if (!response.ok) {
  //       const errText = await response.text();
  //       alert('Ошибка при запросе к серверу: ' + errText);
  //       return;
  //     }
  //     const data = await response.json();
  //     localStorage.setItem('personData', JSON.stringify(data.result));
  //     setCount(data.result);
  //     // setCount([]);
  //     // window.open('viewData.html', '_blank');
  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //     alert('Произошла ошибка при выполнении запроса');
  //   }
  // };
  const handleUpdate = async () => {
    try {
      const data = await HandleUpdateServRender();
      localStorage.setItem('personData', JSON.stringify(data.result));
      setCount(data.result);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при выполнении запроса');
    }
  };
  // useEffect для вызова handleUpdate при монтировании компонента
  useEffect(() => {
    handleUpdate();
    console.log('useEffect[]')
  }, []); // пустой массив зависимостей — вызов один раз при загрузке
  
  // useEffect(() => {
  //   console.log('useEffect')
  // }); //нет зависимостей - вызывается каждый раз при обновлении компонента в котором он создан (App) и если в нем самом заложена функция обновления этого компонента (например, handleUpdate()) - то происходит рекурсия

  // Функция для извлечения номера из строки
  const extractNumber = (phone: string) => {
    const match = phone.match(/\+?\d[\d\-\s$$]*/);
    return match ? match[0] : phone;
  };
//Вывод мастеров:
let htmlka;
 if (count === null){
  htmlka = <li>
    Loader...
  </li>
 } else {
  htmlka = count.map((el, index) => (
    <li key={index} onClick={() => {setRamka(index)}} style={ramka === index ? { border: '1px solid blue' } : {} }>
      {el.Name} - {el.profession_title} <br />
      {extractNumber(el.telephone)}
    </li>
    ));
 }
  
  return (
      <>
        <ul>
          {htmlka}
        </ul>

        <hr></hr>
        <ul>
          {count === null && (<li>Loader...</li>)} 
          {count !== null && (
            count.map((el, index) => (
              <li key={index} onClick={() => {setRamka2(index)}} style={ramka2 === index ? { border: '1px solid red' } : {} }>
                {el.Name} - {el.profession_title} <br />
                {extractNumber(el.telephone)}
              </li>
            ))
          )}
        </ul>

        <hr></hr>
        {/* <JsxHtml/> */}
        <hr></hr>
        {/* <ApiMusik/> */}
        {/* <ApiMusik2/> */}
        {/* <Iterator/> */}
        <div style={{ display: 'flex'}}>         
          <ApiMusikDecomp1 setRamkaParent = {setRamkaParent} ramkaProps = {ramkaProps}/>
          <ApiMusikDecomp2 ramkaProps = {ramkaProps}/>
        </div>
        {/* <ApiMusikDecomp/> */}
      </>
  );
}

export default App;