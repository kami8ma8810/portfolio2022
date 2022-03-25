import ua from './ua-parser';
export default () => {
  console.log('RUN__drawer.js');
  const drawer = document.getElementById('js-drawer');
  const drawerNav = document.getElementById('js-drawerNav');
  const openButton = document.getElementById('js-openDrawer');
  const closeButton = document.getElementById('js-closeDrawer');
  const body = document.body;
  const header = document.querySelector('.l-header');
  // スクロールバーの幅を取得
  const scrollbarWidth = window.innerWidth - body.clientWidth;

  // 現在の状態（開いていたらtrue）
  let drawerOpen = false;

  // stateは真偽値
  function changeAriaExpanded(state) {
    const value = state ? 'true' : 'false';
    drawer.setAttribute('aria-expanded', value);
    openButton.setAttribute('aria-expanded', value);
    closeButton.setAttribute('aria-expanded', value);
  }

  // stateは真偽値
  function changeState(state) {
    if (state === drawerOpen) {
      console.log('2回以上連続で同じ状態に変更しようとしました');
      return;
    }
    changeAriaExpanded(state);
    drawerOpen = state;
  }

  function openDrawer() {
    changeState(true);
    drawerNav.setAttribute('aria-hidden', false);
    body.style.overflowY = 'hidden'; //ドロワーを開いている間はメインコンテンツをスクロール不可にする

    //PCのみスクロールバーのガタつきをなくすためにヘッダーにpadding-right設定
    if (ua.getDevice() == 'pc') {
      header.style.paddingRight = `${scrollbarWidth}px`;
      header.style.backgroundColor = '#fff';
    }
  }

  function closeDrawer() {
    changeState(false);
    drawerNav.setAttribute('aria-hidden', true);
    body.style.overflowY = ''; //メインコンテンツをスクロール不可を解除する
    if (ua.getDevice() == 'pc') {
      header.style.paddingRight = ''; //PCのみヘッダーのpadding-right削除
      header.style.backgroundColor = '';
    }
  }

  function onClickOpenButton() {
    openDrawer();
  }

  function onClickCloseButton() {
    closeDrawer();
  }

  openButton.addEventListener('click', onClickOpenButton, false);
  closeButton.addEventListener('click', onClickCloseButton, false);
};
