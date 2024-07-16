let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false, lapCounter = 0;

        const display = document.getElementById('display');
        const startStopBtn = document.getElementById('startStopBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const laps = document.getElementById('laps');

        function startStop() {
            if (!running) {
                startTime = new Date().getTime() - savedTime;
                tInterval = setInterval(getShowTime, 1000);
                running = true;
                startStopBtn.innerHTML = "Stop";
                lapBtn.disabled = false;
                resetBtn.disabled = false;
            } else {
                clearInterval(tInterval);
                savedTime = new Date().getTime() - startTime;
                running = false;
                startStopBtn.innerHTML = "Start";
            }
        }

        function reset() {
            clearInterval(tInterval);
            savedTime = 0;
            running = false;
            display.innerHTML = "00:00:00";
            startStopBtn.innerHTML = "Start";
            resetBtn.disabled = true;
            lapBtn.disabled = true;
            laps.innerHTML = "";
            lapCounter = 0;
        }

        function lap() {
            lapCounter++;
            const lapTime = display.innerHTML;
            const lapDiv = document.createElement('div');
            lapDiv.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
            laps.appendChild(lapDiv);
        }

        function getShowTime() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            
            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            
            display.innerHTML = hours + ":" + minutes + ":" + seconds;
        }

        startStopBtn.addEventListener('click', startStop);
        resetBtn.addEventListener('click', reset);
        lapBtn.addEventListener('click', lap);