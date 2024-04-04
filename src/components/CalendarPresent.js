import React from "react";
import styles from './CalendarPresent.module.css';

function CalendarPresent({year, month, cellsArr, handleClickForward, handleClickBack, monthObj, handleClickCell}) {

    function Rows() {

        const copy = [...cellsArr];
        //console.log(cellsArr);
        const firstPart = copy.splice(0, 7);
        const secondPart = copy.splice(0, 7);
        const thirdPart = copy.splice(0, 7);
        const fourthPart = copy.splice(0, 7);
        const fifthPart = copy.splice(0, 7);
        const sixPart = copy.splice(0, 7);
        const cellsArrDivided = [];
        cellsArrDivided.push(firstPart, secondPart, thirdPart, fourthPart, fifthPart, sixPart);

        function styleForToday(data) {
            const style1 = styles.isToday;
            const style2 = styles.hasTasks;
            const style3 = styles.tasksDone;
            if(data.isToday && !data.hasTasks && !data.tasksDone) {
                return style1;
            }
            else if(data.hasTasks && !data.tasksDone) {
                return style2;
            }
            else if(data.hasTasks && data.tasksDone) {
                return style3;
            } else {
                return null;
            }
        }

        function styleForWeekend(data) {
            const style1 = styles.isWeekend;
            const style2 = styles.hasTasks;
            const style3 = styles.tasksDone;
            const style4 = styles.isToday;
            if(!data.isToday && !data.hasTasks && !data.tasksDone) {
                return style1;
            }
            if(data.isToday && !data.hasTasks && !data.tasksDone) {
                return style4;
            }
            if(data.hasTasks && !data.tasksDone) {
                return style2;
            }
            if(data.hasTasks && data.tasksDone) {
                return style3;
            }
        }

        const res = cellsArrDivided.map((elem, index) => {
           for(let i = 0; i < elem.length; i++) {
           return <tr key={index}> 
           <td key={elem[0].id} id={elem[0].id} className={styleForToday(elem[0])} onClick={handleClickCell}>{elem[0].value}</td>
           <td key={elem[1].id} id={elem[1].id} className={styleForToday(elem[1])} onClick={handleClickCell}>{elem[1].value}</td> 
           <td key={elem[2].id} id={elem[2].id} className={styleForToday(elem[2])} onClick={handleClickCell}>{elem[2].value}</td>
           <td key={elem[3].id} id={elem[3].id} className={styleForToday(elem[3])} onClick={handleClickCell}>{elem[3].value}</td>
           <td key={elem[4].id} id={elem[4].id} className={styleForToday(elem[4])} onClick={handleClickCell}>{elem[4].value}</td>
           <td key={elem[5].id} id={elem[5].id} className={styleForWeekend(elem[5])} onClick={handleClickCell}>{elem[5].value}</td>
           <td key={elem[6].id} id={elem[5].id} className={styleForWeekend(elem[6])} onClick={handleClickCell}>{elem[6].value}</td>
           </tr>
           }
           return elem;
        }) 
        return res;
    }

return <div>
    <h2>{monthObj[month][0]} {year}</h2>
    <table className={styles[monthObj[month][1]]}>
        <thead>
            <tr>
                <td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td> 
                <td className={styles.isWeekend}>Сб</td><td className={styles.isWeekend}>Нд</td>
            </tr>
        </thead>
        <tbody>
           <Rows />
        </tbody>
    </table>
    <div className={styles.buttons}>
        <button onClick={handleClickBack}>Назад</button>
        <button onClick={handleClickForward}>Вперед</button>
    </div>
</div>
}

export default CalendarPresent;