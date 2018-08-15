import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';


const months = ['January', 'February', 'March', 'April', 'May']

const CalendarContainer =  styled.div`
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;

const CalendarDay = styled.div`
    width:150px;
    height:100px;
    border:1px solid gray;
    flex-basis: 12.5%;  
`




export default class Calendar extends React.PureComponent{

    getWeekdays(i){ 
        return moment.weekdays(i);
    }

    getDaysInMonth(month){

    }

    getDaysInMonth(month){ 

        let currDate= moment.toObject(); 

        let prev = moment.toObject(); 
        prev.month--; 
        prev.date = 1; 

        let next = moment.toObject(); 
        prev.month++; 
        prev.date = 1; 

        return [moment(prev).daysInMonth(), moment(currDate).daysInMonth(), moment(next).daysInMonth()];
    }


    // getWeekDayStartOfMonth(){ 
    //     return moment().
    // }

    render(){ 
        let days = [];
        for(let i = 0; i < this.getDaysInMonth(8); i++){
             days.push(
                <CalendarDay>
                    { this.getWeekdays(i % 7) } 
                </CalendarDay>
            )
        }

        return (
            <CalendarContainer>
                { days }
            </CalendarContainer>
        )
    }
}