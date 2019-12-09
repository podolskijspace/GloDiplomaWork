const getResponseTabs = (wrapper, left, right) => {

    let    width = wrapper.clientWidth,
            elems = [...wrapper.children],
            elemWidth = elems.reduce((accum, item) => {
                return accum + item.clientWidth;
            }, 0) / elems.length,
            numberElems = elems.length,
            numberSpaces = numberElems + 1,
            spaceWidth = (width -  numberElems * elemWidth) / numberSpaces,
            position = spaceWidth + elemWidth,
            visibleWidth = wrapper.parentElement.clientWidth,
            steps = [],
            currentPosition = 1,
            arrowLeft = document.querySelector(left),
            arrowRight = document.querySelector(right);
    steps[0] = visibleWidth;
    while (position <= width) {
        if (position > visibleWidth) {
            steps[currentPosition] = position; 
            currentPosition++;
        }
        position += spaceWidth + elemWidth;
    }
    currentPosition = 0;
    

    arrowRight.addEventListener('click', () => {
        currentPosition++;
        if (currentPosition >= steps.length - 1) {
            currentPosition = steps.length - 1;
        }
        let translateX = steps[currentPosition] - visibleWidth;
        wrapper.style.transform = `translateX(-${translateX}px)`;
    });

    arrowLeft.addEventListener('click', () => {
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = 0;
        }
        let translateX = steps[currentPosition] - visibleWidth;
        wrapper.style.transform = `translateX(-${translateX}px)`;
    });
};

export default getResponseTabs;