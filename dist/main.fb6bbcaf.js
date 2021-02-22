// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
window.onload = function () {
  var DATA = {};

  Date.prototype.format = function () {
    // 현재 날짜 보기좋게 출력 / 사용방법: newDate().format() 으로 사용가능
    var yyyy = this.getFullYear();
    var month = this.getMonth() + 1;
    var dd = this.getDate();
    var format = [yyyy, month, dd].join("-");
    return format;
  };

  Date.prototype.format2 = function () {
    // 현재 날짜 보기좋게 출력 / 사용방법: newDate().format() 으로 사용가능
    var yyyy = this.getFullYear();
    var month = this.getMonth() + 1;
    var format = [yyyy, month].join("-");
    return format;
  };

  var today = new Date();
  var calendarBody = document.querySelector(".calendar-body");
  var prevEl = document.querySelector(".prev");
  var nextEl = document.querySelector(".next");
  var inputBox = document.querySelector(".question");
  var inputBtn = document.querySelector(".input-btn");
  var inputList = document.querySelector(".todoList");
  var showList = document.querySelector(".showList");
  var listText = document.querySelector(".listText");
  var createDate = document.querySelector(".createDate");
  var bgblack = document.querySelector(".bgblack");
  var closedBtn = document.querySelector(".closed");
  var currentDate;
  buildCalendar();

  function buildCalendar() {
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var monthList = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    var leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var headerYear = document.querySelector(".current-year-month"); // 윤년 체크하기

    if (firstDate.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notLeapYear;
    }

    headerYear.innerHTML = "\uC624\uB298";
    makeElement(firstDate);
    showMain();
    currentDateget();
    resetInsert();
  }

  function makeElement(firstDate) {
    var dateSet = 1;

    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        // i === 0이여야 하는 이유는 첫 날짜를 찍고 그 다음 날짜가 0번째 칸부터 다시 그려져야 하기 때문
        // firstDate.getMonth() => 현재 달의 일수가 몇일인지 반환해주고, 이 조건은 반환 된 값에 따라 출력해 준 후, 달력 출력 종료조건이다.
        if (i === 0 && j < firstDate.getDay() || dateSet > pageYear[firstDate.getMonth()]) {
          // 만약 해당 칸에 날짜가 없으면 div엘리먼트만 생성한다.
          var dateEl = document.createElement("div");
          calendarBody.appendChild(dateEl);
        } else {
          // 해당 칸에 날짜가 있으면 div엘리먼트 생성 후 해당 날짜 넣어주기
          var _dateEl = document.createElement("div");

          var dataUl = document.createElement("ul");
          _dateEl.textContent = dateSet;

          _dateEl.setAttribute("class", dateSet);

          _dateEl.setAttribute("id", "".concat(today.format2(), "-").concat(dateSet));

          calendarBody.appendChild(_dateEl);
          dateSet++;
        }
      }
    } // 현재 내가 선택한 날짜가 있으면 이전 달, 다음 달로 넘어가도 화면에 보여주기 위해 써줌


    var clickedDate = document.getElementsByClassName(today.getDate());
    clickedDate[0].classList.add("active");
  }

  function removeCalendar() {
    var divEls = document.querySelectorAll(".calendar-body > div");

    for (var i = 0; i < divEls.length; i++) {
      divEls[i].remove();
    }
  } // 왼쪽에 현재 날짜 업데이트 해주기.


  function showMain() {
    var mainDay = document.querySelector(".main-day");
    var mainDate = document.querySelector(".main-date");
    var dayList = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
    mainDate.innerHTML = "".concat(today.getFullYear(), ".").concat(today.getMonth() + 1, ".").concat(today.getDate(), ".");
    mainDay.innerHTML = dayList[today.getDay()];
  }

  prevEl.addEventListener("click", function () {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    removeCalendar();
    buildCalendar();
    resetInsert();
    redrawLi();
  });
  nextEl.addEventListener("click", function () {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    removeCalendar();
    buildCalendar();
    resetInsert();
    redrawLi();
  });

  function currentDateget() {
    // format()을 이용해서 현재 날짜를 보기좋게 출력해주기 위해 사용.
    currentDate = today.format();
  }

  calendarBody.addEventListener("click", function (e) {
    var target = e.target;
    var eachDate = document.querySelectorAll(".calendar-body  > div");
    if (e.target.innerHTML === "") return;

    for (var i = 0; i < eachDate.length; i++) {
      eachDate[i].classList.remove("active");
    }

    target.classList.add("active");
    today = new Date(today.getFullYear(), today.getMonth(), target.innerHTML);
    showMain();
    currentDateget();
    redrawLi();
    resetInsert();
  });
  inputBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var inputValue = inputBox.value;
    insertTodo(inputValue);
  });

  function insertTodo(text) {
    var todoObj = {
      todo: text
    };

    if (!DATA[currentDate]) {
      DATA[currentDate] = [];
      DATA[currentDate].push(todoObj);
      console.log(DATA[currentDate]);
    } else {
      DATA[currentDate].push(todoObj);
      console.log(DATA[currentDate]);
    }

    var liEl = document.createElement("li");
    var spanEl = document.createElement("span");
    var delBtn = document.createElement("button");
    delBtn.innerText = "삭제";
    delBtn.setAttribute("class", "del-data");
    spanEl.innerHTML = text;
    liEl.appendChild(spanEl);
    liEl.appendChild(delBtn);
    inputList.appendChild(liEl);
    liEl.setAttribute("id", DATA[currentDate].length);
    delBtn.addEventListener("click", delWork);
    liEl.addEventListener("dblclick", showTodo); // todoObj에 id값을 114번 줄에서 넣어주면 DATA[currentDate].length 값을 찾아올 수 없기 때문에 push해준 후 에 추가하여 local에 저장한다.

    todoObj.id = DATA[currentDate].length;
    save();
    inputBox.value = "";
  }

  function redrawLi() {
    // 다른 날짜를 클릭했을때 그 전에 작성한 totolist목록을 먼저 다 지우기 위해 li와 span을 찾아와 for문으로 지워주고 다시 그려준다.
    var liEl = document.querySelectorAll("LI");

    for (var i = 0; i < liEl.length; i++) {
      inputList.removeChild(liEl[i]);
    }

    for (var todoList in DATA) {
      if (todoList === currentDate) {
        for (var _i = 0; _i < DATA[todoList].length; _i++) {
          var liEl2 = document.createElement("li");
          var spanEl2 = document.createElement("span");
          var delBtn2 = document.createElement("button");
          delBtn2.innerText = "삭제";
          delBtn2.setAttribute("class", "del-data");
          spanEl2.innerHTML = DATA[todoList][_i].todo;
          liEl2.appendChild(spanEl2);
          liEl2.appendChild(delBtn2);
          inputList.appendChild(liEl2);
          liEl2.setAttribute("id", DATA[todoList][_i].id);
          delBtn2.addEventListener("click", delWork);
          liEl2.addEventListener("dblclick", showTodo);
        }
      }
    }
  } // 다음달,이전달 다른날, 첫 로드 될 때 마다 todo 목록이 있으면(if로 조건문 처리) 다 지우고 다시 그려주는 함수


  function resetInsert() {
    var storeObj = localStorage.getItem(currentDate);

    if (storeObj !== null) {
      var liEl = document.querySelectorAll("LI");

      for (var i = 0; i < liEl.length; i++) {
        inputList.removeChild(liEl[i]);
      } // parse 해주기 전에는 localStorage는 string만 가져오니까 parse해준다.


      var parsed = JSON.parse(localStorage.getItem(currentDate)); // forEach로 작성되있는 모든 todolist의 항목들을 돌면서 로컬에 저장되어 있는 목록을 화면에 만들어준다.

      parsed.forEach(function (todo) {
        if (todo) {
          var lili = document.createElement("li");
          var spanspan = document.createElement("span");
          var deldel = document.createElement("button");
          deldel.setAttribute("class", "del-data");
          deldel.innerText = "삭제";
          lili.setAttribute("id", todo.id);
          spanspan.innerHTML = todo.todo;
          lili.appendChild(spanspan);
          lili.appendChild(deldel);
          inputList.appendChild(lili);
          deldel.addEventListener("click", delWork);
          lili.addEventListener("dblclick", showTodo);
        }
      });
    }
  }

  resetInsert();

  function delWork(e) {
    e.preventDefault();
    var delParentLi = e.target.parentNode;
    inputList.removeChild(delParentLi); // DATA[currentDate]를 filter함수를 이용해 todo로 돌면서 todo의 아이디값과 현재 내가 누른 아이디값이 같지 않은 것을 배열에 담아 리턴해주어서
    // 내가 지우고자 하는 요소를 뺀 나머지 요소를 배열에 담아 리턴해준다.
    // 그 배열을 다시 DATA[currentDate]에 할당하여 save();를 통해 localStorage에 넣어준다.

    var cleanToDos = DATA[currentDate].filter(function (todo) {
      return todo.id !== parseInt(delParentLi.id);
    });
    DATA[currentDate] = cleanToDos;
    save();
  }

  function showTodo(e) {
    showList.style.display = "block";
    bgblack.style.display = "block";
    listText.textContent = e.target.textContent;
    createDate.textContent = currentDate;
  }

  closedBtn.addEventListener("click", function (e) {
    showList.style.display = "none";
    bgblack.style.display = "none";
  });

  function save() {
    localStorage.setItem(currentDate, JSON.stringify(DATA[currentDate]));
  }
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61273" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map