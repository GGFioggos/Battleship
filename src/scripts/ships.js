const ship = (length) => {
    let timesHit = 0;

    const hit = () => {
        timesHit++;
    };

    const isSunk = (timesHit) => {
        return timesHit === length;
    };

    return { length, hit, isSunk };
};

export { ship };
