'use babel';

import CursorSkipLinesView from './cursor-skip-lines-view';
import { CompositeDisposable } from 'atom';

export default {

  // cursorSkipLinesView: null,
  // modalPanel: null,
  // subscriptions: null,

  subscriptions: null,
  editor: null,
  firstActivation: true,
  firstBuffer: null,
  currentPosition: null,
  skipCount: 0,

  activate(state) {
    //this.cursorSkipLinesView = new CursorSkipLinesView(state.cursorSkipLinesViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.cursorSkipLinesView.getElement(),
    //   visible: false
    // });

    //this.subscriptions = new CompositeDisposable;
    // this.subscriptions.add(atom.commands.add('atom-text-editor', {
    //     'multi-cursor:expand-down': (function(_this) {
    //         return function() {
    //             return _this.expandDown();
    //         };
    //     })(this)
    // }));


    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cursor-skip-lines:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    //this.cursorSkipLinesView.destroy();
  },

  serialize() {
     return  this.currentPosition = null;

    //cursorSkipLinesViewState: this.cursorSkipLinesView.serialize()
  },

  toggle() {
    console.log('CursorSkipLines was toggled!');
    // console.log(atom.workspace.getActiveTextEditor().getCursors());
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
    dir = -1
    var coords, cursors, editor, lastCursor, newCoords, newCursor;
    if (!(editor = atom.workspace.getActiveTextEditor())) {
        return;
    }
    if (!(lastCursor = editor.getLastCursor())) {
        return;
    }
    cursors = editor.getCursors();
    coords = lastCursor.getBufferPosition();
    newCoords = {
        column: lastCursor.goalColumn || coords.column,
        row: coords.row + dir + this.skipCount
    };
    if (newCoords.row < 0 || newCoords.row > editor.getLastBufferRow()) {
        return;
    }
    newCursor = editor.getLastCursor();
    //newCursor = editor.addCursorAtBufferPosition(newCoords) //新しいカーソルを追加
    newCursor.moveUp(10)
    newCursor.goalColumn = lastCursor.goalColumn || coords.column;
    if (cursors.length === editor.getCursors().length) {
        if (editor.hasMultipleCursors()) {
            lastCursor.destroy();
        }
    }
    return this.skipCount = 0;

    }

};
