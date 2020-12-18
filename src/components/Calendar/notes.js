// Merged Month Calendar View
// const firstDayOfMonth = dayjs(date)
//   .startOf('month')
//   .startOf('week')
//   .format('ddd MM-DD-YYYY');
// const lastDayOfMonth = dayjs(date)
//   .endOf('month')
//   .endOf('week')
//   .format('ddd MM-DD-YYYY');

// Creates the table for each month
const MonthList = (monthNames) => {
  let months = [];
  monthNames.map((month) => {
    months.push(
      <td>
        <span>{month}</span>
      </td>
    );
  });
  let rows = [];
  let cells = [];
  months.forEach((row, i) => {
    if (i % 3 !== 0 || i == 0) {
      // except 0 index
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });
  rows.push(cells); // add last row
  let monthList = rows.map((d, i) => {
    return <tr>{d}</tr>;
  });
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="4">Select a Month</th>
        </tr>
      </thead>
      <tbody>{monthList}</tbody>
    </table>
  );
};
