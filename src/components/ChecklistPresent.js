import React from "react";
import styles from './ChecklistPresent.module.css';


function ChecklistPresent({month, year, eventText, inputValue, createArrValues, handlerInputChange, CreateLi, visability, handleClickSaveButton, refInput}) {

function addZero(num) {
   if (num >= 1 && num <= 9) {
    return '0' + num;
   } else {
    return num;
   }
}

return <div className={visability === true ? styles.containerVis : styles.containerUnvis}>
    <h3>Список справ на {addZero(eventText)}.{addZero(month)}.{year}</h3>
    <input ref={refInput} className={styles.styleInput} value={inputValue} onChange={handlerInputChange} onBlur={createArrValues} placeholder='Введіть справу та клікніть за межами поля вводу...' />
    <ul className={styles.handWritingFont}>
    <CreateLi />
    </ul>
    <button onClick={handleClickSaveButton} className={styles.styleSaveButton}>Зберегти</button>
</div>

}

export default ChecklistPresent;