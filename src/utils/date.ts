import dayjs from "dayjs";

export function normalizeDate(date: Date, dateFormat = "") {
	return dayjs(date).format(dateFormat || "DD-MM-YYYY HH:mm:ss");
}
