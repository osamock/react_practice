// tutorial1.js
// TODO You have to modify the code style from ES5 to ES6 style after the completion of this tutorial.
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
  	console.log("loadCommentsFromServer is calling...");
  	$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
      	this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
      	console.error("line14..." + this.props.url, status, err.toString());
        xhr.abort();
      }.bind(this)
  	});
  },
  handleCommentSubmit: function(comment) {
    // var comments = this.state.data;
    // var newComments = comments.concat(comment);
    // this.setState({data: newComments})
    $.ajax({
      url: this.props.url,
      dataType: 'POST',
      data: comment,
      success: function(data) {
        console.log("line28: data posted to server.....")
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
  	console.log("getInitialState is called...");
  	return {data: []}
  },

  componentDidMount: function() {
  	console.log("componentDidMount is called...");
  	this.loadCommentsFromServer();
  	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
  	return(
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
	render: function() {
        var commentNodes = this.props.data.map(function(comment){
          return(
            <Comment author={comment.author}>
              {comment.text}
            </Comment>
          	);
        })

		return(
		  <div className="commentList">
            {commentNodes}
		  </div>
	    );
	}
});

var CommentForm = React.createClass({
  
  handleSubmit: function(e) {
    // handleSubmitは呼ばれているか？
    console.log("line79: handleSubmit is called...")
    e.preventDefault();
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },

	render: function() {
		return (
    <form className="commentForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Your name" ref="author"/>
      <input type="text" placeholder="Say something..." ref="text"/>
      <input type="submit" value="Post" />
    </form>
    );
  }
});

var Comment = React.createClass({
  render: function() {  	
  	var rawMarkup = marked(this.props.children.toString(), {sanitize: false});
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}); 


ReactDOM.render(<CommentBox url="/api/comments" pollInterval={2000} />,document.getElementById('content'));