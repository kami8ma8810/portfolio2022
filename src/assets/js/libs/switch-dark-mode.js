'use strict';
export default () => {
  console.log('RUN__switch-dark-mode');
  // スイッチのinput要素（checkbox）
  const modeSwitch = document.getElementById('myonoffswitch');

  // スイッチの操作に応じて切り替え処理
  modeSwitch.addEventListener('change', () => {
    if (modeSwitch.checked) {
      darkModeOn();
    } else {
      darkModeOff();
    }
  });

  // ダークモードがオンの時に実行する処理
  function darkModeOn() {
    document.documentElement.classList.add('is-darkmode'); // ルート要素<html>にクラスを追加
    modeSwitch.checked = true; //切り替えスイッチと連動させる
    sessionStorage.setItem('darkMode', 'on');
  }
  // ダークモードがオフの時に実行する処理
  function darkModeOff() {
    document.documentElement.classList.remove('is-darkmode'); // クラスの削除
    modeSwitch.checked = false; //切り替えスイッチと連動させる
    sessionStorage.setItem('darkMode', 'off');
  }

  // イベントリスナー
  const listener = () => {
    // ロード時の処理（２回目以降、ページ遷移時はsessionStrageをチェックして維持する）
    if (sessionStorage.getItem('darkMode') === 'on') {
      darkModeOn();
    } else if (sessionStorage.getItem('darkMode') === 'off') {
      darkModeOff();
    }
  };
  listener();
};
