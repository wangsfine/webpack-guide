
export function debounce(fn, time = 50) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(fn, time, ...args);
    }
}

export function throttle(fn, time = 50) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            fn(...args);
            timer = setTimeout(() => {
                timer = null;
            }, time)
        }

    }
}


