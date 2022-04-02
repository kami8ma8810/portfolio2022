'use strict';
export default () => {
  console.log('RUN__switch-dark-mode');
  // スイッチのinput要素（checkbox）
  const modeSwitch = document.getElementById('myonoffswitch');

  // スイッチの操作に応じて切り替え処理
  modeSwitch.addEventListener('change', () => {
    if (modeSwitch.checked) {
      darkModeOn();
      sessionStorage.setItem('darkMode', 'on');
    } else {
      darkModeOff();
      sessionStorage.setItem('darkMode', 'off');
    }
  });

  // ロード時の状況に応じて切り替え
  if (sessionStorage.getItem('darkMode') === 'on') {
    darkModeOn();
  } else if (sessionStorage.getItem('darkMode') === 'off') {
    darkModeOff();
  }

  // ダークモードがオンの時に実行する処理
  function darkModeOn() {
    document.documentElement.classList.add('is-darkmode'); // ルート要素<html>にクラスを追加
    modeSwitch.checked = true; //切り替えスイッチと連動させる
  }
  // ダークモードがオフの時に実行する処理
  function darkModeOff() {
    document.documentElement.classList.remove('is-darkmode'); // クラスの削除
    modeSwitch.checked = false; //切り替えスイッチと連動させる
  }

  // イベントリスナー
  const listener = (event) => {
    if (event.matches) {
      darkModeOn();
    } else {
      darkModeOff();
    }
  };

  // OSの設定がダークモードかどうか判定
  const osDark = window.matchMedia('(prefers-color-scheme: dark)');

  // リスナー登録
  osDark.addEventListener('change', listener);

  // 初期化処理
  listener(osDark);
};