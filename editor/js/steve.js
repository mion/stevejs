/* SemanticUI modules */
$(document).ready(function() {

  $('.ui.dropdown')
    .dropdown({
      on: 'hover'
    })
  ;

  // Sidebars
  $('.overlay.sidebar')
    .sidebar({
      overlay: true
    })
  ;

  $('#top-menu .item')
    .on('click', function() {
      $(this)
        .toggleClass('active')
        .siblings()
        .removeClass('active')
        ;
      $('.sidebar')
        .filter($(this).data('variation') ).first()
        .sidebar('toggle')
      ;
    })
  ;

  $('.styled.sidebar').first()
    .sidebar('attach events', '.styled.example .button')
  ;

  $('.floating.sidebar').first()
    .sidebar('attach events', '.floating.example .button')
  ;

}); 

// Setup Ace editors
var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow");
editor.getSession().setMode("ace/mode/javascript");
editor.setFontSize(17);
editor.getSession().setTabSize(4);
editor.getSession().setUseSoftTabs(true);

var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/ambiance");
terminal.getSession().setMode("ace/mode/javascript");
terminal.setFontSize(17);
terminal.renderer.setShowGutter(false);
terminal.setHighlightActiveLine(false);
terminal.setReadOnly(true);

// var docs = ace.edit("docs");
// docs.setTheme("ace/theme/ambiance");
// docs.getSession().setMode("ace/mode/javascript");
// docs.setFontSize(17);
// docs.renderer.setShowGutter(false);
// docs.setHighlightActiveLine(false);
// docs.setReadOnly(true);

function printInput (s) { terminal.insert("\n" + s + "\n"); };
function printOutput (s) { terminal.insert("\n  => " + s + "\n"); };

// popup = function (msg) {  
//   printOutput(msg);
// };


// Restore code
editor.session.setValue(localStorage.sourceCode);

editor.session.on("tokenizerUpdate", function (e) {
  console.log(e);
});

editor.commands.addCommand({
    name: 'send-to-REPL',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
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

//popup(rawJSDocs[25]["title"]);

// Prepare docs
var docs = {};
for (var i = 0; i < rawJSDocs.length; i++) {
  var title = rawJSDocs[i]["title"];
  docs[title] = rawJSDocs[i];
};

var docScreen = document.getElementById("doc-screen");
var docInput = document.getElementById("doc-input");
var docResult = document.getElementById("doc-result");
// docInput.onkeyup = function (e) {
//   var query = docInput.value;
//   //popup(query);
//   searchDocs(query);
// };
  
var searchDocs = function (query) {
  docResult.innerHTML = "";
  if (docs[query]) {
    popup(docs[query]["_id"]);
    sectionHTMLs = docs[query]["sectionHTMLs"];
    for (var i = 0; i < sectionHTMLs.length; i++) {
      var li = document.createElement("li");
      //notf.classList.add('bubble');//, 'animated', 'fadeInLeft');
      li.innerHTML = sectionHTMLs[i];
      docResult.insertAdjacentElement('beforeend', li);
    };
    //docResult.innerHTML = docs[query]["sectionHTMLs"][0];
  }
};

