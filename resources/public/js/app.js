/** @jsx React.DOM */

		    var GameLog = React.createClass({
		    	render: function() {
		    		return 	<div className={"row text-center"}>
		    				<form className={"form-horizontal"}>
		    					<fieldset>
		    					<legend>Game log</legend>
		    					<textarea className={"form-control"} rows="10" id="textArea"></textarea>
		    					</fieldset>
		    				</form>
		    				</div>
		    	},
		    });

		    var Dice = React.createClass({
		    	render: function() {
		    		console.log(this.props);
		    		var icon = ["fi-die-one","fi-die-two","fi-die-three","fi-die-four","fi-die-five","fi-die-six"];
		    		var color = this.props.isSuccess ? "btn-success" : "btn-default";
		    		return  <div className={"col-lg-1"}>
		    				<button type="button" className={"btn "+color+" btn-lg"}>
		    				<i className={icon[this.props.score-1]} ></i>
		    				</button>
		    				</div>
		    	},
		    });

		    var DiceList = React.createClass({
		    	render: function() {
		    		var that = this;
		    		var dices = this.props.dices.map(function(dice){
		    			return <Dice score={dice} isSuccess={that.props.isSuccess}/>
		    		});
		    		
		    		var colBufferSize = (12 - this.props.dices.length)/2;

		    		return <div className={"row text-center"}>
		    			   <div className={"col-lg-"+colBufferSize}></div>
		    		       {dices}
		    		       <div className={"col-lg-"+colBufferSize}></div>
		    		       </div> 	
		    	},
		    });

		    var Score = React.createClass({

		    	render: function() {
		    		var scoreStr = "";
		    		if (this.props.bonus > 0) {
		    			return 	<div className={"panel panel-default"}>
	  								<div className={"panel-heading"}>Score</div>
	  								<div className={"panel-body"}>
	    								{this.props.score} <span className={"text-success"}>{'(+'+this.props.bonus+')'}</span>
	  								</div>
								</div>	
		    		}

		    		return 	<div className={"panel panel-default"}>
  								<div className={"panel-heading"}>Score</div>
  								<div className={"panel-body"}>
    								{this.props.score} 
  								</div>
							</div>
		    	},
		    });

		    var Game = React.createClass({

		    	getInitialState: function() {
		    		return {
		    			dices: [1,1],
		    			score:0,
		    			success: false,
		    			bonus: 0,
		    		}
		    	},


		    	render: function() {
		    		return <div className={"row"}>
			    				<div className={"col-lg-12"}>
				    				<DiceList dices={this.state.dices} isSuccess={this.state.success}/>
				    				<br/>
				    				<div className={"row text-center"}>
				    					<div className={"col-lg-5"}></div>
				    					<div className={"col-lg-2"}>
				    			   		 	<Score score={this.state.score} bonus={this.state.bonus}/>
				    			   		</div>
				    			   		<div className={"col-lg-5"}></div>
				    			   </div>
				    			   <div className={"row text-center"}>
				    			   		<button className={"btn btn-default"} onClick={this.roll} >Roll!</button>
				    			   </div>
			    			   </div>
		    			   </div>

		    			   
		    	},

		    	roll: function(e) {
		    		var success = false;
		    		var bonus = 0;
		    		var newDices = [];
		    		for(var i = 0; i < this.state.dices.length; i++) {
		    			var d = Math.floor(Math.random() * 6) + 1;
		    			newDices.push(d);
		    		}

		    		var score = this.state.score;

		    		function isSameAsPrev(element, index, array) {
  						if(index < 1) return true;
  						return element === array[index-1];
					}

					if(newDices.every(isSameAsPrev)) {
						bonus = newDices.reduce(function(a,b) {return a + b;});
						success = true;
					}

		    		this.setState({
		    			score: score + bonus,
		    			dices: newDices,
		    			success: success,
		    			bonus: bonus
		    		});
		    	},
		    });

			React.renderComponent(<Game/>, document.getElementById('content'));