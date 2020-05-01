export function sort(array, key, reverse) {
    if (reverse) {
        return array.sort((a, b) => (a[key] > b[key]) ? -1 : 1)
    } else {
        return array.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    }
}