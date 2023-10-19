function secondsToTime(seconds: number = 0) {
    const timeString = new Date(1000 * seconds)
        .toISOString()
        .slice(15, 19);
    console.log(timeString)
    return timeString;
}

export {
    secondsToTime
}