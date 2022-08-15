import dayjs from "dayjs";

export function displayCreatedAgo(dateCreated: number) {
    return dayjs.unix(dateCreated).fromNow()
}