import React, {useState, useRef} from "react";
import ChecklistPresent from "./ChecklistPresent";
import styles from './ChecklistPresent.module.css';

function Checklist({month, year, eventText, visability, handleClickSaveButton, handleClickCancelButton, arrValues, setArrValues}) {

    const [inputValue, setInputValue] = useState('');
    const refInput = useRef(null); 
    const refLiId = useRef(1);

    function handlerInputChange(event) {
        setInputValue(event.target.value);
    }

    function createArrValues() {
        const copy = [...arrValues];
        if (inputValue.trim()) {
            copy.push([inputValue, false, refLiId.current]);
            refLiId.current = refLiId.current + 1;
            setArrValues(copy);
            setInputValue('');
        }
    }

    function handleClickDoneButton(event) {      
        const copy = [...arrValues];
        const eventLi = event.target.parentNode.firstChild;
        for(let elem of copy) {
            //console.log(eventLi.id);
            //console.log(String(elem[2]));
            //console.log(elem);
            if(elem.includes(eventLi.textContent) && String(elem[2]) === eventLi.id) {
                elem[1] = !elem[1];
           }
        }
        setArrValues(copy);
    }

    function handleClickDeleteButton(event) {
        const copy = [...arrValues];
        const eventLi = event.target.parentNode.firstChild;
        for(let elem of copy) {
           if(elem.includes(eventLi.textContent) && String(elem[2]) === eventLi.id) {
            copy.splice(copy.indexOf(elem), 1);
           }
        }
        setArrValues(copy);
    }

    function handleClickChangeButton(event) {
        const eventLi = event.target.parentNode.firstChild;
        setInputValue(eventLi.textContent);
        const copy = [...arrValues];
        for(let elem of copy) {
            if(elem.includes(eventLi.textContent) && String(elem[2]) === eventLi.id) {
            copy.splice(copy.indexOf(elem), 1);
            }
        }
        setArrValues(copy);
        refInput.current.focus();
    }

    function CreateLi() {
        const res = arrValues.map((elem, index) => {
            return <div key={index}>
            <li id={elem[2]} className={elem[1] === true ? styles.styleLiDone : styles.styleLiNotDone}>{elem[0]}</li>
            <button onClick={handleClickChangeButton} className={styles.styleLiButtons}>Ред</button>
            <button onClick={handleClickDeleteButton} className={styles.styleLiButtons}>Х</button>
            <button onClick={handleClickDoneButton} className={styles.styleLiButtons}>V</button>
            <br /> <br />
            </div>
        })
        return res;
    }

    return <div>
       <ChecklistPresent month={month} year={year} eventText={eventText} inputValue={inputValue} handlerInputChange={handlerInputChange} createArrValues={createArrValues} CreateLi={CreateLi} visability={visability} handleClickSaveButton={handleClickSaveButton} handleClickCancelButton={handleClickCancelButton} refInput={refInput} /> 
    </div>

}


export default Checklist;