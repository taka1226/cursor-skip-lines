'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  editor: null,
  firstActivation: true,
  firstBuffer: null,
  currentPosition: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that moveUp this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cursor-skip-lines:moveUp': () => this.moveUp(),
      'cursor-skip-lines:moveDown': () => this.moveDown()
    }));
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'cursor-skip-lines:moveDown': () => this.moveDown()
    // }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
     return  this.currentPosition = null;

    //cursorSkipLinesViewState: this.cursorSkipLinesView.serialize()
  },

  moveUp() {
    var coords, cursors, editor, lastCursor, newCoords, newCursor;
    if (!(editor = atom.workspace.getActiveTextEditor())) {
        return;
    }
    if (!(lastCursor = editor.getLastCursor())) {
        return;
    }
    cursors = editor.getCursors();
    newCursor = editor.getLastCursor();
    newCursor.moveUp(10);
    if (cursors.length === editor.getCursors().length) {
        if (editor.hasMultipleCursors()) {
            lastCursor.destroy();
        }
    }

  },

  moveDown() {
    var coords, cursors, editor, lastCursor, newCoords, newCursor;
    if (!(editor = atom.workspace.getActiveTextEditor())) {
        return;
    }
    if (!(lastCursor = editor.getLastCursor())) {
        return;
    }
    cursors = editor.getCursors();
    newCursor = editor.getLastCursor();
    newCursor.moveDown(10);
    if (cursors.length === editor.getCursors().length) {
        if (editor.hasMultipleCursors()) {
            lastCursor.destroy();
        }
    }

  }

};
