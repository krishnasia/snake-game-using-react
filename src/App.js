import React, { Component } from 'react';
import "./App.css";
import Snake from './Snake';
import Food from './Food';
const getRandomFoods =()=>{
  let min=1;
  let max=98;
  let x= Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y= Math.floor((Math.random()*(max-min+1)+min)/2)*2;

  return [x,y];
}
const initialValue = {
  food:getRandomFoods(),
  direction:'RIGHT',
  snakeSpeed:100,
  snakeDots:[[0,0]]
}
export class App extends Component {
      state = initialValue;

      componentDidMount(){
        setInterval(() => {
          this.onMoveSnake();
        }, this.state.snakeSpeed);
        document.onkeydown = this.onKeyDown;
      }
      componentDidUpdate(){
        this.checkIfOutofBorder();
        this.checkIfSnakeEatItself();
        this.checkIfEat();

      }

      onKeyDown = (e) =>{
        e = e || window.event;
        switch (e.keyCode) {
          case 37:
              this.setState({direction: 'LEFT'})
            break;
          case 38:
              this.setState({direction: 'UP'})
            break;
          case 39:
              this.setState({direction: 'RIGHT'})
            break;
          case 40:
              this.setState({direction: 'DOWN'})
            break;
        }
      }
      onMoveSnake(){
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];
        
          switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]]
              break;
            case 'LEFT':
                head = [head[0] - 2, head[1]]
              break;
            case 'DOWN':
                head = [head[0], head[1] + 2]
              break;
            case 'UP':
                head = [head[0], head[1] - 2]
              break;
          }
          dots.push(head);
          dots.shift();
          this.setState({
            snakeDots: dots
          })
      }
      checkIfOutofBorder(){
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
          this.gameOver();
        }
      }
      checkIfSnakeEatItself(){
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
          if(head[0] == dot[0] && head[1] == dot[1]){
            this.gameOver();
          }
        });
      }
      checkIfEat(){
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;

        if(head[0] == food[0] && head[1] == food[1]){
            this.setState({
              food: getRandomFoods()
            })
            this.enlargeSnake();
        }
      }

      enlargeSnake(){
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
          snakeDots:newSnake
        })
      }
      gameOver(){
        alert(`game Over !!!!!! Snake length is ${this.state.snakeDots.length - 1}`);
        this.setState(initialValue);
      }
  render() {
    return (
      <div>
          <div className='gameArea'>
              <Snake snakeDots={this.state.snakeDots}/>
              <Food dot={this.state.food}/>
          </div>
      </div>
    )
  }
}

export default App