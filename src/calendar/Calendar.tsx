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
  state = {
    currentDate: moment()
  };

  private getWeekdays(i: number) {
    if (i > 6) return;
    return moment.weekdays(i);
  }

  private getDaysInMonth() {
    // total days to show = 7 * 5 = 35
    let prevMonthDays = this.state.currentDate
      .clone()
      .startOf("month")
      .subtract(1, "months")
      .startOf("month")
      .daysInMonth();

    let date = this.state.currentDate.clone();
    let currMonthDays = date.daysInMonth();
    let currStartWeekDay = date.startOf("month").day();
    let currEndWeekDay = date.endOf("month").day();

    let daysToShow = [];

    // add prev month days
    for (let i = currStartWeekDay - 1; i >= 0; i--) {
      daysToShow.push(prevMonthDays - i);
    }

    // add current month days
    for (let i = 0; i < currMonthDays; i++) {
      daysToShow.push(i + 1);
    }

    // add next month days
    for (let i = 0; i < 7 - currEndWeekDay - 1; i++) {
      daysToShow.push(i + 1);
    }

    return daysToShow;
  }
  today() {
    let date = moment();
    this.setState({ currentDate: date });
  }
  prevMonth() {
    let date = this.state.currentDate.clone().subtract(1, "month");
    this.setState({ currentDate: date });
  }
  nextMonth() {
    let date = this.state.currentDate.clone().add(1, "month");
    this.setState({ currentDate: date });
  }
  render() {
    let days = this.getDaysInMonth();

    return (
      <React.Fragment>
        {this.state.currentDate.format("MMMM, YYYY")}
        <div>
          <button onClick={this.today.bind(this)}> Today </button>
          <button onClick={this.prevMonth.bind(this)}> - </button>
          <button onClick={this.nextMonth.bind(this)}> + </button>
        </div>
        <CalendarContainer>
          {days.map((value, i) => (
            <CalendarDay>
              {value} {this.getWeekdays(i)}
            </CalendarDay>
          ))}
        </CalendarContainer>
      </React.Fragment>
    );
  }
}
