import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: string): string => {
	const createdAtDate = new Date(createdAt);
	const now = new Date();
	const timeDifference = now.getTime() - createdAtDate.getTime();

	// Define time intervals in milliseconds
	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const month = 30 * day;
	const year = 365 * day;

	if (timeDifference < minute) {
		const seconds = Math.floor(timeDifference / 1000);
		return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
	} else if (timeDifference < hour) {
		const minutes = Math.floor(timeDifference / minute);
		return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
	} else if (timeDifference < day) {
		const hours = Math.floor(timeDifference / hour);
		return `${hours} ${hours === 1 ? "hour" : "hours"}`;
	} else if (timeDifference < week) {
		const days = Math.floor(timeDifference / day);
		return `${days} ${days === 1 ? "day" : "days"}`;
	} else if (timeDifference < month) {
		const weeks = Math.floor(timeDifference / week);
		return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
	} else if (timeDifference < year) {
		const months = Math.floor(timeDifference / month);
		return `${months} ${months === 1 ? "month" : "months"}`;
	} else {
		const years = Math.floor(timeDifference / year);
		return `${years} ${years === 1 ? "year" : "years"}`;
	}
};
