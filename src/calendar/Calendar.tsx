import * as React from "react";
import styled from "styled-components";
import * as moment from "moment";

const CalendarContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const CalendarDay = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid gray;
  flex-basis: 12.5%;
`;
export default class Calendar extends React.PureComponent {
  private getWeekdays(i: number) {
    return moment.weekdays(i);
  }

  private getDaysInMonth() {
    // total days to show = 7 * 5 = 35
    let prevMonthDays = moment()
      .startOf("month")
      .subtract(1, "months")
      .startOf("month")
      .daysInMonth();

    // let currMonthDays = moment()
    //   .startOf("month")
    //   .add(1, "months")
    //   .endOf("month")
    //   .daysInMonth();

    let date = moment();
    let currMonthDays = date.daysInMonth();
    let currWeekDay = date.startOf("month").day();

    let daysToShow = [];

    // add prev month days
    for (let i = currWeekDay - 1; i >= 0; i--) {
      daysToShow.push(prevMonthDays - i);
    }

    // add current month days
    for (let i = 0; i < currMonthDays; i++) {
      daysToShow.push(i + 1);
    }

    // add next month days
    for (let i = 0; i < 35 - daysToShow.length; i++) {
      daysToShow.push(i + 1);
    }

    return daysToShow;
  }

  // getWeekDayStartOfMonth(){
  //     return moment().
  // }

  render() {
    let days = this.getDaysInMonth();

    return (
      <CalendarContainer>
        {days.map((value, i) => (
          <CalendarDay>
            {value} {this.getWeekdays(i % 7)}
          </CalendarDay>
        ))}
      </CalendarContainer>
    );
  }
}
