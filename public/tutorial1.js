// tutorial1.js
// TODO You have to modify the code style from ES5 to ES6 style after the completion of this tutorial.
var CommentBox = React.createClass({
  render: function() {
  	return(
      <div className="commentBox">
      	Hello, world! I am a CommentBox.
      </div>
    );
  }
});

ReactDOM.render(<CommentBox />,document.getElementById('content'));