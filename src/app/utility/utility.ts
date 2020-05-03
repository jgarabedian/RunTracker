import { MONTHS } from '../../constants/constants'

/**
 * @name sort
 * @desc sort the array given an accessor
 * @param {*} array array to pass in
 * @param {*} key accessor
 * @param {Boolean} reverse z-a sort
 * @returns array
 */
export function sort(array, key, reverse: Boolean) {
    if (reverse) {
        return array.sort((a, b) => (a[key] > b[key]) ? -1 : 1)
    } else {
        return array.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    }
}

/**
 * @name convertDates
 * @desc convert dates to readable format
 * @param {*} array
 * @param {*} key
 * @param {String} name
 * @returns array
 */
export function convertDates(array, key, name: String) {
    for (let i = 0; i < array.length; i++) {
        let d = new Date(array[i][key])
        let mon = d.getMonth();
        if (name === 'full') {
            mon = MONTHS[mon].full
        } else {
            mon = MONTHS[mon].abr
        }
        let day = d.getDate();
        let newDate = `${mon} ${day}, ${d.getFullYear()}`;
        array[i][key] = newDate;
    }
    return array
}


/**
 * @name filterUser
 * @desc filter the array on the user specified
 * @param {*} array
 * @param {String} key accessor
 * @param {String} user user to filter on
 * @returns
 */
export function filterUser(array, key, user: String) {
    let tempArray = []
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === user) {
            tempArray.push(array[i])
        }
    }
    return tempArray
}