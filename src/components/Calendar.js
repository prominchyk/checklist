import React, {useState, useRef} from "react";
import CalendarPresent from "./CalendarPresent";
import Checklist from './Checklist';


function Calendar({changeBackgroundImage, monthObj, localStorageObject}) {
    const now = useRef(new Date());
    const year = useRef(now.current.getFullYear());
    const month = useRef(now.current.getMonth());
    const date = useRef(now.current.getDate());

    const lastDate = useRef(new Date(year.current, month.current + 1, 0));
    const lastDay = useRef(lastDate.current.getDate());
    const firstDate = useRef(new Date(year.current, month.current, 1));
    const firstDayOfWeek = useRef();
    const refCellsAmount = useRef();
    if(firstDayOfWeek.current === 0) {
        firstDayOfWeek.current = firstDate.current.getDay() + 7;
        refCellsAmount.current = firstDayOfWeek.current + 7 + lastDay.current - 1;
    } else {
        firstDayOfWeek.current = firstDate.current.getDay();
        refCellsAmount.current = firstDayOfWeek.current + lastDay.current - 1;
    }
    const refCounterCells = useRef(1);
    const refCounterDays = useRef(1);

    function createCellsArr() {

        while (refCellsAmount.current % 7 !== 0) {
            refCellsAmount.current = refCellsAmount.current + 1;
        }

        const firstCellsArr = [];
        for(let i = refCellsAmount.current; i >= 1; i--) {
            firstCellsArr.push({
            id: year.current.toString() + (month.current + 1) + refCounterCells.current,
            value: refCounterCells.current >= firstDayOfWeek.current && refCounterCells.current < lastDay.current + firstDayOfWeek.current ? refCounterDays.current : null,
            hasTasks: false,
            isToday: false,
            })
            if(refCounterCells.current >= firstDayOfWeek.current && refCounterCells.current < lastDay.current + firstDayOfWeek.current) {
                refCounterDays.current = refCounterDays.current + 1;
            }
            refCounterCells.current = refCounterCells.current + 1;
        }
        refCounterCells.current = 1;
        refCounterDays.current = 1;

        for(let elem of firstCellsArr) {
            elem.value === date.current ? elem.isToday = true : elem.isToday = false;
            if(window.localStorage) {
                if(window.localStorage[elem.id]) {
                    elem.hasTasks = true;
                }
            }
        } 
        //console.log(firstCellsArr);
        return firstCellsArr;
        }

    const [cellsArr, setCellsArr] = useState(createCellsArr());
    //console.log(cellsArr);
   

    function handleClickForward() {
        now.current = (new Date (year.current, month.current + 1, date.current));
        year.current = now.current.getFullYear();
        month.current = now.current.getMonth();
        date.current = now.current.getDate();
        lastDate.current = (new Date(year.current, month.current + 1, 0));
        firstDate.current = (new Date(year.current, month.current, 1));
        lastDay.current = lastDate.current.getDate();
        firstDayOfWeek.current = firstDate.current.getDay();
        if(firstDayOfWeek.current === 0) {
            firstDayOfWeek.current = firstDate.current.getDay() + 7;
            refCellsAmount.current = firstDayOfWeek.current + 7 + lastDay.current - 1;
        } else {
            firstDayOfWeek.current = firstDate.current.getDay();
            refCellsAmount.current = firstDayOfWeek.current + lastDay.current - 1;
        }
        changeBackgroundImage(month.current);
        setCellsArr(createCellsArr());
    }

    function handleClickBack() {
        now.current = (new Date (year.current, month.current - 1, date.current));
        year.current = now.current.getFullYear();
        month.current = now.current.getMonth();
        date.current = now.current.getDate();
        lastDate.current = (new Date(year.current, month.current + 1, 0));
        firstDate.current = (new Date(year.current, month.current, 1));
        lastDay.current = lastDate.current.getDate();
        firstDayOfWeek.current = firstDate.current.getDay();
        if(firstDayOfWeek.current === 0) {
            firstDayOfWeek.current = firstDate.current.getDay() + 7;
            refCellsAmount.current = firstDayOfWeek.current + 7 + lastDay.current - 1;
        } else {
            firstDayOfWeek.current = firstDate.current.getDay();
            refCellsAmount.current = firstDayOfWeek.current + lastDay.current - 1;
        }
        changeBackgroundImage(month.current);
        setCellsArr(createCellsArr());
    }

        const eventId = useRef('');
        const [eventText, setEventText] = useState('');
        const [visability, setVisability ] = useState(false);
        const [arrValues, setArrValues] = useState([]);


    function handleClickSaveButton() {
        setVisability(false);
        
        if(arrValues.length >= 1) {

        localStorage.setItem(eventId.current, JSON.stringify(arrValues));

        const copyCellsArr = [...cellsArr];
        for(let elem of copyCellsArr) {
            if(elem.id === eventId.current) {
                elem.hasTasks = true;
            }
        }
        setCellsArr(copyCellsArr);
        } else {
            localStorage.removeItem(eventId.current);
            const copyCellsArr = [...cellsArr];
            for(let elem of copyCellsArr) {
                if(elem.id === eventId.current) {
                    elem.hasTasks = false;
                }
            }
            setCellsArr(copyCellsArr);
        }

        const copyArrValues = [...arrValues];
        copyArrValues.length = 0;
        setArrValues(copyArrValues);

    }

    function handleClickCell(event) {
        eventId.current = event.target.id;
        setEventText(event.target.textContent);
        if(event.target.textContent !== '') {
           setVisability(true);
        }
        if(localStorageObject.getItem(eventId.current)) {
           const copy = [...arrValues];
           const savedArr = JSON.parse(localStorageObject.getItem(eventId.current));
           for(let elem of savedArr) {
               copy.push(elem);
           }
           setArrValues(copy);
        }
   }

    return <div>
        <CalendarPresent year = {year.current} month = {month.current} cellsArr = {cellsArr} handleClickForward = {handleClickForward} handleClickBack = {handleClickBack} monthObj = {monthObj} handleClickCell = {handleClickCell} />
        <Checklist month={month.current + 1} year={year.current} eventText={eventText} eventId={eventId.current} visability={visability} arrValues={arrValues} setArrValues={setArrValues} handleClickSaveButton={handleClickSaveButton} />
    </div>

}

export default Calendar;