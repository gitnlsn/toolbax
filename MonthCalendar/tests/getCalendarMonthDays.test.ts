import { addDays, isSameMonth } from 'date-fns'
import { getCalendarMonthDays } from '../src/utils'

describe('getCalendarMonthDays', () => {
	it('should get all days from month', () => {
		const calendarDay = new Date(2022, 6, 20)
		const days = getCalendarMonthDays(calendarDay)

		const firstDate = new Date(calendarDay)
		firstDate.setDate(1)

		for (let day = 0; day < 32; day++) {
			const testDate = addDays(firstDate, day)
			if (isSameMonth(testDate, calendarDay))
				expect(days).toContainEqual(testDate)
		}
	})

	it('should get previous month days', () => {
		const calendarDay = new Date(2022, 6, 20)
		const days = getCalendarMonthDays(calendarDay)

		expect(days).not.toContainEqual(new Date(2022, 5, 26))
		expect(days).toContainEqual(new Date(2022, 5, 27))
		expect(days).toContainEqual(new Date(2022, 5, 28))
		expect(days).toContainEqual(new Date(2022, 5, 29))
		expect(days).toContainEqual(new Date(2022, 5, 30))
	})

	it('should get previous month days (2)', () => {
		const calendarDay = new Date(2022, 4, 20)
		const days = getCalendarMonthDays(calendarDay)

		expect(days).not.toContainEqual(new Date(2022, 3, 24))
		expect(days).toContainEqual(new Date(2022, 3, 25))
		expect(days).toContainEqual(new Date(2022, 3, 26))
		expect(days).toContainEqual(new Date(2022, 3, 27))
		expect(days).toContainEqual(new Date(2022, 3, 28))
		expect(days).toContainEqual(new Date(2022, 3, 29))
		expect(days).toContainEqual(new Date(2022, 3, 30))
	})

	it('should get next month days', () => {
		const calendarDay = new Date(2022, 7, 20)
		const days = getCalendarMonthDays(calendarDay)

		expect(days).toContainEqual(new Date(2022, 8, 1))
		expect(days).toContainEqual(new Date(2022, 8, 2))
		expect(days).toContainEqual(new Date(2022, 8, 3))
		expect(days).toContainEqual(new Date(2022, 8, 4))
		expect(days).not.toContainEqual(new Date(2022, 8, 5))
	})

	it('should always return multiple of 7', () => {
		;[2022, 2021, 2020, 2019, 2018, 2017].forEach((yearNumber) => {
			;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((monthNumber) => {
				const calendarDay = new Date(yearNumber, monthNumber, 20)
				const days = getCalendarMonthDays(calendarDay)

				expect(days.length % 7).toBe(0)
			})
		})
	})

	test('every row should contain a date of the same month', () => {
		;[2022, 2021, 2020, 2019, 2018, 2017].forEach((yearNumber) => {
			;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((monthNumber) => {
				const calendarDay = new Date(yearNumber, monthNumber, 20)
				const days = getCalendarMonthDays(calendarDay)

				expect(
					days.slice(0, 7).every((date) => !isSameMonth(date, calendarDay))
				).not.toBeTruthy()
				expect(
					days.slice(-7).every((date) => !isSameMonth(date, calendarDay))
				).not.toBeTruthy()
			})
		})
	})
})
