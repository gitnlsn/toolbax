import { addDays, addMonths, format, isSameMonth, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Get all days for a 7 day calendar
 * @param date 
 * @returns all days for calendar
 */
export const getCalendarMonthDays = (date: Date): Date[] => {
	const calendarMonthDays: Date[] = []

	const firstDate = new Date(date)
	firstDate.setHours(0, 0, 0, 0)
	firstDate.setDate(1)

	// add days from previous month
	const weekdayFromFirstDate = (firstDate.getDay() + 6) % 7
	for (let day = 0; day < weekdayFromFirstDate; day++) {
		const dayToAdd = subDays(firstDate, weekdayFromFirstDate - day)
		calendarMonthDays.push(dayToAdd)
	}

	// add days from month
	for (let day = 0; day < 32; day++) {
		const dayToAdd = addDays(firstDate, day)
		if (isSameMonth(dayToAdd, firstDate)) {
			calendarMonthDays.push(dayToAdd)
		} else {
			break
		}
	}

	// add days from next month
	const lastDate: Date = addMonths(date, 1)
	firstDate.setHours(0, 0, 0, 0)
	lastDate.setDate(0)
	const weeekdayFromLasteDate = (7 - lastDate.getDay()) % 7
	for (let day = 0; day < weeekdayFromLasteDate; day++) {
		const dayToAdd = addDays(lastDate, day + 1)
		calendarMonthDays.push(dayToAdd)
	}

	return calendarMonthDays
}

/**
 * Groups data in packs of 7
 * @param array 
 * @returns 7items packed array
 */
export const pack7items = <T>(array: Array<T>): Array<Array<T>> => {
	const numberOfPacks = array.length / 7
	const packs: Array<Array<T>> = []
	for (let i = 0; i < numberOfPacks; i++) {
		const start = i * 7
		const end = start + 7
		packs.push(array.slice(start, end))
	}
	return packs
}
