import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import Calendar from './components/Calendar';

function App() {

  const monthObj = {
    0: ['Січень', 'isWinter', process.env.PUBLIC_URL + styles.wint2],
    1: ['Лютий', 'isWinter', process.env.PUBLIC_URL + styles.wint3],
    2: ['Березень', 'isSpring', process.env.PUBLIC_URL + styles.spring1],
    3: ['Квітень', 'isSpring', process.env.PUBLIC_URL + styles.spring2],
    4: ['Травень', 'isSpring', process.env.PUBLIC_URL + styles.spring3],
    5: ['Червень', 'isSummer', process.env.PUBLIC_URL + styles.sum1],
    6: ['Липень', 'isSummer', process.env.PUBLIC_URL + styles.sum2],
    7: ['Серпень', 'isSummer', process.env.PUBLIC_URL + styles.sum3],
    8: ['Вересень', 'isAutumn', process.env.PUBLIC_URL + styles.autumn1],
    9: ['Жовтень', 'isAutumn', process.env.PUBLIC_URL + styles.autumn2],
    10: ['Листопад', 'isAutumn', process.env.PUBLIC_URL + styles.autumn3],
    11: ['Грудень', 'isWinter', process.env.PUBLIC_URL + styles.wint1],

}

const [localStorageObject, setLocalStorageObject] = useState();
const thisMonth = new Date().getMonth();

const [backgroundImage, setBackgroundImage] = useState(monthObj[thisMonth][2]);

function changeBackgroundImage(data) {
  if(document.body.classList.length >= 1) {
    const value = document.body.classList.value;
    document.body.classList.remove(value);

  }
  setBackgroundImage(monthObj[data][2])
}

useEffect (() => {
    document.body.classList.add(backgroundImage);
    setLocalStorageObject(window.localStorage);
  }, [backgroundImage, localStorageObject]);

  return <div>
    <header>Календар - чекліст</header>
    <main>
          <Calendar changeBackgroundImage = {changeBackgroundImage} monthObj = {monthObj} localStorageObject={localStorageObject} />
    </main>
  </div>
}

export default App;
