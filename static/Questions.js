//gets the questions in xmhl format
function getQuestions() {
  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayQuestions;
  xReq.open("GET", "/questions", true);
  xReq.send();
}
// a function to sort the questions and using options from the json file
function displayQuestions() {
  if (this.readyState == 4 && this.status == 200) {
    let quesDiv = document.getElementById("questions");
    let questionList = JSON.parse(this.responseText);
    let content = "";
    let count = 1;
    content +=
      '<form action="/check-answers" method="post" id="check-answers">';
    for (q of questionList) {
      content += `<div>`;
      content += "<h3>Question " + count + "</h3>";
      count++;
      content += "<p>" + q.stem + "</p>";
      for (let i = 0; i < q.options.length; i++) {
        // using radio buttons for answering
        content += `<input onclick="check('${q.stem}')" type="radio" q="${
          q.stem
        }" id="${q.options[i]}" name="q${count - 1}" value="${i}" required>`;
        content += `<label for="${q.options[i]}">${q.options[i]}</label><br>`;
      }
      content += `<p id="q${count - 1}"></p>`;
      content += "</div>";
    }
    content += `</form>
                    <button type="submit" form="check-answers" value="Submit">Submit For Grading</button>
        `;
    quesDiv.innerHTML = content;
  }
}
//this function will check the answers from the json file answerIndex
function check(stem) {
  let xReq2 = new XMLHttpRequest();
  xReq2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let answerList = JSON.parse(this.responseText);
      let select = document.querySelector(`input[q="${stem}"]:checked`).value;

      for (let i = 0; i < answerList.length; i++) {
        if (answerList[i].stem == stem) {
          if (answerList[i].answerIndex == select) {
            document.getElementById(`q${i + 1}`).innerHTML = "Correct";
          } else {
            document.getElementById(`q${i + 1}`).innerHTML = "Incorrect";
          }
        }
      }
    }
  };

  xReq2.open("GET", "/questions", true);
  xReq2.send();
}
