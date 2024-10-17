const timer_controlBtns = document.querySelector('#timer_controlBtns');
const stopwatch_controlBtns = document.querySelector('#stopwatch_controlBtns');

const hourSpan = document.querySelector('#stopwatch_hour');
const minuteSpan = document.querySelector('#stopwatch_minute');
const secondSpan = document.querySelector('#stopwatch_second');
const startBtn = document.querySelector('#stopwatch_startBtn');

const timerHourSpan = document.querySelector('#timer_hour');
const timerMinuteSpan = document.querySelector('#timer_minute');
const timerSecondSpan = document.querySelector('#timer_second');
const timerStartBtn = document.querySelector('#timer_startBtn');

class Clock {
    constructor(elem, startBtn, hourSpan, minSpan, secSpan) {
        this.interval = null;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.remainTime = 0;
        this.startTime = 0;
        this.hourSpan = hourSpan;
        this.minuteSpan = minSpan;
        this.secondSpan = secSpan;
        this.startBtn = startBtn;
        this._elem = elem;
        this._elem.addEventListener('click', this.onClick.bind(this));
    }
    start() {
        this.startBtn.innerText = 'Start';
    }

    pause() {
        !this.hours && !this.minutes && !this.seconds ? null : this.startBtn.innerText = 'Resume';
        this.remainTime = Date.now() - this.startTime;

        clearInterval(this.interval);
    }

    reset() {
        this.startBtn.innerText = 'Start';
        this.hourSpan.innerText = this.minuteSpan.innerText = this.secondSpan.innerText = '00';
        this.remainTime = 0;
        
        clearInterval(this.interval);
    }

    onClick(event) {
        let action = event.target.dataset.action;
    
        if (action) {
            this[action]();
        }
    }

    printTime(elem, value) {
        elem.innerText = value < 10 ? `0${value}` : value;
    }

    displayTime(remainingTime) {
        this.seconds = Math.floor((remainingTime / 1000) % 60);
        this.minutes = Math.floor((remainingTime / (1000*60)) % 60);
        this.hours = Math.floor((remainingTime / (1000*60*60)) % 24);

        this.printTime(this.hourSpan, this.hours);
        this.printTime(this.minuteSpan, this.minutes);
        this.printTime(this.secondSpan, this.seconds);
    }
}

class Timer extends Clock {
    constructor(elem, startBtn, hourSpan, minuteSpan, secondSpan, hours, minutes, seconds) {
        super(elem, startBtn, hourSpan, minuteSpan, secondSpan);
        this.targetTime = null;
        this.remainingTime = 0;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    
    start() {
        super.start();
        
        this.targetTime = new Date();
        this.targetTime.setHours(this.targetTime.getHours() + this.hours);
        this.targetTime.setMinutes(this.targetTime.getMinutes() + this.minutes);
        this.targetTime.setSeconds(this.targetTime.getSeconds() + this.seconds);
        
        this.interval = setInterval(() => {
            const currentTime = new Date().getTime();
            this.remainingTime = this.targetTime.getTime() - currentTime;
    
            if (this.remainingTime <= 0) {
                this.reset();
                return;
            }

            this.displayTime(this.remainingTime);
        }, 1000)
    }

    reset() {
        super.reset();

        this.hours = 0;
        this.minutes = 1;
        this.seconds = 30;
        this.printTime(this.hourSpan, this.hours);
        this.printTime(this.minuteSpan, this.minutes);
        this.printTime(this.secondSpan, this.seconds);
        this.targetTime = null;
    }

    addOne() {
        if (!this.targetTime) {
            this.targetTime = new Date();
            this.targetTime.setHours(this.targetTime.getHours() + this.hours);
            this.targetTime.setMinutes(this.targetTime.getMinutes() + this.minutes);
            this.targetTime.setSeconds(this.targetTime.getSeconds() + this.seconds);
        }

        const currentTime = new Date();
        const remainingTime = this.targetTime.getTime() - currentTime.getTime();
        const additionalTime = 60000;
        const newRemainingTime = remainingTime + additionalTime;

        this.targetTime = new Date(currentTime.getTime() + newRemainingTime);
        this.displayTime(newRemainingTime);
    }


}

class Stopwatch extends Clock {
    constructor(elem, startBtn, hourSpan, minuteSpan, secondSpan) {
        super(elem, startBtn, hourSpan, minuteSpan, secondSpan);
    }

    start() {
        super.start();
        
        this.startTime = new Date();
        
        this.interval = setInterval(() => {
            const currentTime = Date.now() - this.startTime + this.remainTime;

            this.displayTime(currentTime);
        }, 1000)
    }
}

const stopwatch = new Stopwatch(stopwatch_controlBtns, startBtn, hourSpan, minuteSpan, secondSpan);
const timer = new Timer(timer_controlBtns, timerStartBtn, timerHourSpan, timerMinuteSpan, timerSecondSpan, 0, 1, 30);