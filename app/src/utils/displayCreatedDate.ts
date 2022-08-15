export function displayCreatedDate(dateCreated: number) {
    // get date from timestamp
    // eg. 2022-03-31T09:36:29.000Z
    const date = new Date(dateCreated * 1000);

    // convert the above date into human-readable eg. 3/31/2022
    return date.toLocaleDateString("en-US").toString();
}