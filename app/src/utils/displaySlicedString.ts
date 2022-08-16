/**
 * returns sliced string with ellipsis at the end if string is longer than maxLength
 * @param str
 * @param maxLength
 */
export const displaySlicedString = (str: string, maxLength: number) => {
    return str?.slice(0, maxLength) + '...';
}