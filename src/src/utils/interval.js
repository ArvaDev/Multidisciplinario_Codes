export const interval = (interval, min, max) => {
    return (interval >= min && interval <= max) ? true : false;
}