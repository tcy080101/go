class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }
}

async function loadData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

async function findTreasure() {
  const storyDiv = document.getElementById("story");
  const resultImage = document.getElementById("resultImage");
  const clueImage = document.getElementById("clueImage");

  // 加载图书馆数据
  const libraryData = await loadData('data/library.txt');
  if (libraryData) {
    storyDiv.innerText = libraryData;
    // 显示藏宝图图片
    clueImage.src = "treasure/藏宝图.jpg";
    clueImage.style.display = "block";
  }

  try {
    // 解码古代文字
    const location = await TreasureMap.decodeAncientScript(storyDiv.innerText);
    storyDiv.innerText += "\n" + location;
    clueImage.style.display = "none";

    // 搜索神庙
    const box = await TreasureMap.searchTemple(location);
    storyDiv.innerText += "\n" + box;

    // 打开宝藏箱
    const treasure = await TreasureMap.openTreasureBox();
    storyDiv.innerText += "\n" + treasure;

    resultImage.src = "胜利.jpg";
    resultImage.style.display = "block";
    // 更新游戏历史
    updateGameHistory('success');
  } catch (error) {
    storyDiv.innerText += "\n任务失败: " + error;
    resultImage.src = "失败.jpg";
    resultImage.style.display = "block";
    // 更新游戏历史
    updateGameHistory('failure');
  }
}

function startGame() {
  let playerId = localStorage.getItem('playerId');
  if (!playerId) {
    playerId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('playerId', playerId);
  }
  let playerNickname = localStorage.getItem('playerNickname');
  if (!playerNickname) {
    playerNickname = prompt('请输入你的昵称');
    localStorage.setItem('playerNickname', playerNickname);
  }
  // 加载游戏历史
  loadGameHistory();
}

function loadGameHistory() {
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
  const storyDiv = document.getElementById("story");
  gameHistory.forEach(entry => {
    storyDiv.innerText += `\n${new Date(entry.date).toLocaleString()} - ${entry.result}`;
  });
}

function updateGameHistory(result) {
  let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
  gameHistory.push({
    date: new Date().toISOString(),
    result: result
  });
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

window.onload = function () {
  startGame();
}

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("story").innerText = "游戏开始...";
  document.getElementById("resultImage").style.display = "none";
  document.getElementById("clueImage").style.display = "none";
  findTreasure();
});

function playBGM() {
  const bgm = document.getElementById('bgm');
  bgm.play();
}

// 新增函数：显示玩家信息
function showPlayerInfo() {
  let playerId = localStorage.getItem('playerId');
  let playerNickname = localStorage.getItem('playerNickname');
  alert(`玩家ID: ${playerId}\n玩家昵称: ${playerNickname}`);
}

// 新增函数：显示图书馆资料
async function showLibraryInfo() {
  const libraryData = "在古老图书馆的角落，有一本布满灰尘的古籍，里面记载着神秘的符号。";
  if (libraryData) {
    alert(libraryData);
  } else {
    alert('未找到图书馆资料');
  }
}


// 新增函数：显示神庙资料
async function showTempleInfo() {
  const templeData = "古老的神庙中弥漫着神秘的气息，墙壁上刻满了古老的符文。";
  if (templeData) {
    alert(templeData);
    // 显示神庙图片
    const templeImage = document.getElementById("templeImage");
    templeImage.src = "神庙.jpg";
    templeImage.style.display = "block";
    // 进一步设置图片宽度为200px
    guardImage.style.width = "200px";
    guardImage.style.display = "block";
  } else {
    alert('未找到神庙资料');
  }
}

// 新增函数：显示守卫资料
async function showGuardInfo() {
  const guardData = "神庙守卫手持长矛，眼神犀利，警惕地守护着神庙。";
  if (guardData) {
    alert(guardData);
    // 显示守卫图片
    const guardImage = document.getElementById("guardImage");
    guardImage.src = "守卫.jpg";
    guardImage.style.display = "block";
    // 进一步设置图片宽度为200px
    guardImage.style.width = "200px";
    guardImage.style.display = "block";
  } else {
    alert('未找到守卫资料');
  }
}
