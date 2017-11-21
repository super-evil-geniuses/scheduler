const db = require('../database/index.js');
const Promise = require('bluebird');
const Combinatorics = require('js-combinatorics');

let findAllEmployeeAvailability = () => {
	let availability = [];
	return db.Day_Part.findAll({ attributes: ['id'] })
		.then((day_parts) => {
			return Promise.each(day_parts, (day_part) => {
				return db.Employee_Availability.findAll({ where: { day_part_id: day_part.dataValues.id, is_available: true }})
					.then((avail) => {
						availability.push(avail);
					});
			});
		})
		.then(() => {
			return availabilityParser(availability);
		});
};

const availabilityParser = (availability) => {
	let availObj = {};
	availability.forEach(availPerDayPart => {
		availPerDayPart.forEach(availByEmp => {
			if (!availObj[availByEmp.dataValues.day_part_id]) {
				availObj[availByEmp.dataValues.day_part_id] = [availByEmp.dataValues.user_id];
			} else {
				availObj[availByEmp.dataValues.day_part_id].push(availByEmp.dataValues.user_id);
			}
		});
	});
	return availObj;
}

const templateParser = (weekStart) => {
	let tempObj = {};
	return db.Schedule.find({ where: {monday_dates: weekStart} })
		.then((schedule) => {
      let schedule_id = schedule.dataValues.id;
			return db.Needed_Employee.findAll({ where: {schedule_id: schedule_id, }})
    		.then((template) => {
    			template.forEach(dayPart => {
    				tempObj[dayPart.dataValues.day_part_id] = dayPart.dataValues.employees_needed;
    			});
    			return [tempObj, schedule_id];
    		});
    });
}

const scheduleGenerator = (allEmployeeAvail, temp) => {
  let allCombinations = {};
  
  //fill allCombinations with all the possible combinations of employees for each day
  for (let dayPart in allEmployeeAvail) {
    if (allEmployeeAvail[dayPart].length < temp[dayPart]) {
      for (let i = 0; i < temp[dayPart] - allEmployeeAvail[dayPart].length; i++) {
        allEmployeeAvail[dayPart].push('house');
      }
    }
    allCombinations[dayPart] = Combinatorics.combination(allEmployeeAvail[dayPart], temp[dayPart]).toArray();
  }

  let schedule = {};
  let completedSchedules = [];
  const findSolution = (possibilities, empShifts, dayPart) => {
    //for every dayPart 
    let currentDayPossibilities = possibilities[dayPart];
    console.log(currentDayPossibilities);
    //iterate over all possibilites
    //for every possibility
    for (let i = 0; i < currentDayPossibilities.length; i++) {
      if(completedSchedules.length >= 10) { return; }
      let thisTry = currentDayPossibilities[i];
      //add employee shifts to the counter
      if (!willAnyEmployeeBeInOvertime(empShifts, thisTry) && !willHaveDouble(schedule[dayPart-1], thisTry)) {
        thisTry.forEach((e) => {
          empShifts[e] = empShifts[e] ? empShifts[e] + 1 : 1;
        })
        schedule[dayPart] = thisTry;
        if (dayPart < 14) {
         findSolution(possibilities, empShifts, dayPart+1);
        } else {
          let completed = Object.assign({}, schedule);
          completedSchedules.push(completed);
        }
        schedule[dayPart] = [];
        thisTry.forEach((e) => {
          empShifts[e]--;
        });
      }  
    }
  };

  findSolution(allCombinations, {}, 1);
  return completedSchedules[Math.floor(Math.random()*10)];
}

const willAnyEmployeeBeInOvertime = (shiftCounts, proposedShift) => {
  let overtime = false;
  proposedShift.forEach((e) => {
    if(shiftCounts[e] >= 5) {
      overtime = true;
    }
  })
  return overtime;
}

const willHaveDouble = (amShift = [], pmShift) => {
  for (let i = 0; i < amShift.length; i++) {
    if (pmShift.includes(amShift[i])) {
      return true;
    }
  }
  return false;
}

const reformatScheduleObj = (actual_schedule, schedule_id) => {
  let reformat = [];
  for (let dayPart in actual_schedule) {
    actual_schedule[dayPart].forEach(employee => {
      if (employee === "house") {
        employee = null;
      }
      reformat.push({ user_id: employee, schedule_id: schedule_id, day_part_id: parseInt(dayPart) });
    });
  }
  return reformat;
}

const generateSchedule = (weekStart) => {
  return findAllEmployeeAvailability()
    .then((availObj) => {
      let avail = availObj;
      return templateParser(weekStart)
        .then((temp) => {
          let template = temp[0];
          let schedule_id = temp[1];

          let actual_schedule = scheduleGenerator(avail, template);
          let reformattedSchedule = reformatScheduleObj(actual_schedule, schedule_id);
          return db.Actual_Schedule.destroy({ where: {schedule_id: schedule_id} })
            .then(() => {
              return Promise.each(reformattedSchedule, (scheduleObj) => {
                return db.Actual_Schedule.create(scheduleObj);
              })
              .then(() => {
                return reformattedSchedule;
              });
            })
        });
      });
}

module.exports.generateSchedule = generateSchedule;