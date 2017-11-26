import React from 'react';

const WeekPicker = () => {
  return (
    <div>
      
    </div>
  );
};

export default WeekPicker;

/*


On initialize - get selectedWeek as this week;

schedule generator:

Edit week -->

Pick a week
  change selectedWeek in redux
  if week-schedule exists
    load up week schedule into redux
    If generated schedule exists
      load up generated schedule into cal
  else
    Render: No schedule saved for this week in cal


on selectedWeek redux change
Check if there is a schedule saved for selected week
  if yes -->
    Pull up needed employees from that week for schedule template
    Check if generated schedule exists for that week
      if yes -->
        Pull up schedule generated for that week and render
      if no
        If no shedTem is saved -> You have not saved any shifts for this week (GEN GREY)
        If fullSaved -> Generate a schedule when you have finalized your shifts for this week.
  if No -->
    Default to 0 needed employees for the week in schedule template



*/