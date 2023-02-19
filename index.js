const arraySaveTime = [];

const executeTimeStopwatch = () => {

  const contentTimer = document.getElementById('valueTimer');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const saveBtn = document.getElementById('saveBtn');
  const listTime = document.getElementById('saveTimeList');
  

  let startTime, timer = 0, interval;

  const startTimer = () => {
    startTime = Date.now() - timer;
    interval = setInterval(() => {
      timer = Date.now() - startTime;
      contentTimer.textContent = formatTime(timer);
    }, 1);
    startBtn.disabled = true;
  };

  const resetTime = () => {
    clearInterval(interval);
    timer = 0;
    contentTimer.textContent = formatTime(timer);
    startBtn.disabled = false;
  };

  const stopTime = () => {
    clearInterval(interval);
    startBtn.disabled = false;
  };

  const formatTime = (time) => {
    const miliSeconds = Math.floor(time % 1000);    
    const seconds = Math.floor((time / 1000) % 60);  
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor((time / 3600000) % 24);  
    const formattedMiliSeconds = onlyDoubleNumbers(miliSeconds, 3).substring(0, 2);
    return `${onlyDoubleNumbers(hours)}:${onlyDoubleNumbers(minutes)}:${onlyDoubleNumbers(seconds)}:${formattedMiliSeconds}`;
  };

  const onlyDoubleNumbers = (time, length = 2) => {
    const timeString = time.toString();
    return timeString.padStart(length, '0');
  };

  const saveTime = () => {
    arraySaveTime.push(timer);
    const savedTime = document.createElement('p');
    savedTime.className = 'listItemParagraphy';
    savedTime.textContent = formatTime(timer);
    const div = document.createElement('div');
    div.className = 'singleTimer';
    div.appendChild(savedTime);
    listTime.appendChild(div);
  };

  const displaySavedTimes = () => {
    arraySaveTime.forEach((time) => {
      const savedTime = document.createElement('p');
      savedTime.className = 'listItemParagraphy';
      savedTime.textContent = formatTime(time);
      const div = document.createElement('div');
      div.className = 'singleTimer';
      div.appendChild(savedTime);
      listTime.appendChild(div);
    });
  };

  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTime); 
  resetBtn.addEventListener('click', resetTime);
  saveBtn.addEventListener('click', saveTime);

  displaySavedTimes();
};executeTimeStopwatch();

const executeShowHideDeleteListTimer = () => {

  const showTimerSavesBtn = document.getElementById('listBtn')
  const closeTimerSavesBtn = document.getElementById('closeBtn')
  const containerList  = document.querySelector('.containerListTimer')
  const deleteList = document.querySelector('#deleteBtn')

  const openSaveList = () => {

    showTimerSavesBtn.addEventListener('click' , () => {

      containerList.style.display = 'block'


    })


  };openSaveList()


  const closeList = () => {
    closeTimerSavesBtn.addEventListener('click', () => {

      containerList.style.display = 'none'


    })
  };closeList()


  const deleteItemList = () => {
    deleteList.addEventListener('click', () => {
      const divs = document.querySelectorAll('.singleTimer');
      if (divs.length > 0) {
        const lastDiv = divs[divs.length - 1];
        lastDiv.remove();
        arraySaveTime.pop();
      }
    });
  };
  deleteItemList()
};executeShowHideDeleteListTimer()