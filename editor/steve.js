//$( document ).ready(function() {

// Setup Ace editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setFontSize(18);
editor.getSession().setTabSize(4);
editor.getSession().setUseSoftTabs(true);

var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/ambiance");
terminal.getSession().setMode("ace/mode/javascript");
terminal.setFontSize(18);
terminal.renderer.setShowGutter(false);
terminal.setHighlightActiveLine(false);
terminal.setReadOnly(true);

var docs = ace.edit("docs");
docs.setTheme("ace/theme/ambiance");
docs.getSession().setMode("ace/mode/javascript");
docs.setFontSize(18);
docs.renderer.setShowGutter(false);
docs.setHighlightActiveLine(false);
docs.setReadOnly(true);

var docScreen = document.getElementById("doc-screen");
docScreen.hidden = true;

var docInput = document.getElementById("doc-input");
docInput.onkeypress = function (e) {
  var query = docInput.value;
  popup(query);
  search(query);
};

function printInput (s) { terminal.insert("\n" + s + "\n"); };
function printOutput (s) { terminal.insert("\n\t=> " + s + "\n"); };

popup = function (msg) {  
  printOutput(msg);
};

// Augmenting JS
if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


// Restore code
editor.session.setValue(localStorage.sourceCode);

editor.session.on("tokenizerUpdate", function (e) {
  console.log(e);
});

editor.commands.addCommand({
    name: 'send-to-REPL',
    bindKey: {win: 'Ctrl-E',  mac: 'Command-E'},
    exec: function execute () {
      "use strict";
      var text = editor.session.getTextRange(editor.getSelectionRange());
      if (text == "") {
        var pos = editor.getCursorPosition();
        text = editor.session.getLine(pos.row);
      }
      printInput(text.trim());
      try {
        var result = window.eval(text);
        printOutput(result ? result.toString() : result);
      } catch(err) {
        if (err instanceof SyntaxError) {
          printOutput("[!] The syntax is incorrect.");
        } else {
          printOutput("[!] Error: " + err.message);
        }
      }
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

editor.commands.addCommand({
    name: 'save',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function () {
      localStorage.sourceCode = editor.session.getValue();
      popup("[*] Saved");
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

keypress.combo("ctrl space", function() {
    docScreen.hidden = !docScreen.hidden;
    docInput.focus();
});

/* Documentation search */
var searchAPI = "localhost:5000/search?=?";

var search = function (query) {
  $.getJSON( searchAPI, {
    query: "Boolean",
    format: "json"
  })
    .done(function( data ) {
      output(data);
    });
};

//});