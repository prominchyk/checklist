import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import Calendar from './components/Calendar';

function App() {

  const monthObj = {
    0: ['Січень', 'isWinter', styles.wint2],
    1: ['Лютий', 'isWinter', styles.wint3],
    2: ['Березень', 'isSpring', styles.spring1],
    3: ['Квітень', 'isSpring', styles.spring2],
    4: ['Травень', 'isSpring', styles.spring3],
    5: ['Червень', 'isSummer', styles.sum1],
    6: ['Липень', 'isSummer', styles.sum2],
    7: ['Серпень', 'isSummer', styles.sum3],
    8: ['Вересень', 'isAutumn', styles.autumn1],
    9: ['Жовтень', 'isAutumn', styles.autumn2],
    10: ['Листопад', 'isAutumn', styles.autumn3],
    11: ['Грудень', 'isWinter', styles.wint1],

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
