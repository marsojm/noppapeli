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
		    		return  <div className={"col-xs-2 col-lg-1"}>
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
		    			   <div className={"col-xs-4 col-lg-"+colBufferSize}></div>
		    		       {dices}
		    		       <div className={"col-xs-4 col-lg-"+colBufferSize}></div>
		    		       </div>
		    	},
		    });

        var Lives = React.createClass({
          render: function() {
            return <div className={"panel panel-default"}>
                <div className={"panel-heading"}><i className={"fi-heart"}></i><span className={"score"}>Lives</span></div>
                <div className={"panel-body"}>
                  <span>{this.props.lives}</span>
                </div>
              </div>

          },
        });

		    var Score = React.createClass({

		    	render: function() {
		    		var scoreStr = "";
		    		if (this.props.bonus > 0) {
		    			return <div className={"panel panel-default"}>
                <div className={"panel-heading"}><i className={"fi-star"}></i><span className={"score"}>Score</span></div>
	  								<div className={"panel-body"}>
	    								{this.props.score} <span className={"text-success"}>{'(+'+this.props.bonus+')'}</span>
	  								</div>
								</div>

		    		}

		    		return <div className={"panel panel-default"}>
  								<div className={"panel-heading"}><i className={"fi-star"}></i><span className={"score"}>Score</span></div>
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
              lives: 10,
		    		}
		    	},


		    	render: function() {
		    		return <div className={"row"}>
			    				<div className={"col-lg-12"}>
                    <div id="gameOver" className={"modal fade"}>
                      <div className={"modal-dialog"}>
                        <div className={"modal-content"}>
                          <div className={"modal-header"}>
                            <button type="button" className={"close"} data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h2 className={"modal-title"}>Game Over!</h2>
                                </div>
                            <div className={"modal-body"}>
                                    <p>Congratulation! You got {this.state.score} points!</p>
                                    <p>Press 'Play' to play again.</p>
                                </div>
                                    <div className={"modal-footer"}>
                                      <button type="button" className={"btn btn-primary"} onClick={this.reset}>Play</button>
                                </div>
                            </div>
                        </div>
                    </div>
				    				<DiceList dices={this.state.dices} isSuccess={this.state.success}/>
				    				<br/>
				    				<div className={"row text-center"}>
                      <div className={"col-xs-4 col-lg-5"}></div>
				    					<div className={"col-xs-2 col-lg-1"}>
                        <Lives lives={this.state.lives}/>
                      </div>
				    					<div className={"col-xs-2 col-lg-1"}>
				    			   		 	<Score score={this.state.score} bonus={this.state.bonus}/>
				    			   	</div>
				    			   	<div className={"col-xs-4 col-lg-5"}></div>
				    			   </div>
				    			   <div className={"row text-center"}>
				    			   		<button className={"btn btn-default"} onClick={this.roll} >Roll!</button>
				    			   </div>
			    			   </div>
		    			   </div>


		    	},

          reset: function(e) {
            this.setState({
		    			score: 0,
		    			dices: [1,1],
		    			success: false,
		    			bonus: 0,
              lives: 10,
		    		});
            $("#gameOver").modal('hide');
          },

		    	roll: function(e) {
		    		var success = false;
		    		var bonus = 0;
		    		var newDices = [];
            var lives = this.state.lives;
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
          } else {
            lives = lives - 1;
          }

		    		this.setState({
		    			score: score + bonus,
		    			dices: newDices,
		    			success: success,
		    			bonus: bonus,
              lives: lives,
		    		});

            if(lives < 1) {
               $("#gameOver").modal('show');
            }
		    	},
		    });

			React.renderComponent(<Game/>, document.getElementById('content'));
