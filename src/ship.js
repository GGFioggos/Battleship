const Ship = (length) => {
    let timesHit = 0;

    const hit = () => {
        timesHit++;
    };

    const isSunk = () => {
        return timesHit === length;
    };

    const TimesHit = () => {
        return timesHit;
    };

    return { length, hit, isSunk, TimesHit };
};

export { Ship };
